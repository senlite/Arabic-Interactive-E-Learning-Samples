import { access, mkdir, readdir, writeFile, rm, rename } from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import archiver from 'archiver';
import { syncShared } from './sync-shared.mjs';

const SAMPLES = {
  'feedback-scenario': 'محادثة التغذية الراجعة: موقف قيادي',
  'safety-challenge': 'تحدّي السلامة في موقع العمل'
};

const REQUIRED = ['base.css', 'i18n.js', 'scorm12.js', 'xapi-stub.js'];

export function buildManifest(id, files) {
  const title = SAMPLES[id];
  const mastery = id === 'safety-challenge'
    ? '\n        <adlcp:masteryscore>70</adlcp:masteryscore>'
    : '';
  const fileTags = files
    .filter((file) => file !== 'imsmanifest.xml')
    .map((file) => `      <file href="${file}"/>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="tp.samples.${id}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-1">
    <organization identifier="ORG-1">
      <title>${title}</title>
      <item identifier="ITEM-1" identifierref="RES-1" isvisible="true">
        <title>${title}</title>${mastery}
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-1" type="webcontent" adlcp:scormtype="sco" href="index.html">
${fileTags}
    </resource>
  </resources>
</manifest>
`;
}

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, base));
    else files.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return files.sort();
}

function zipDirectory(dir, dest) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(dest);
    const archive = archiver('zip', { zlib: { level: 9 } });
    let failed = false;
    const fail = (error) => {
      if (failed) return;
      failed = true;
      reject(error);
    };
    output.on('close', () => {
      if (!failed) resolve();
    });
    output.on('error', fail);
    archive.on('error', fail);
    archive.pipe(output);
    archive.directory(dir, false);
    archive.finalize();
  });
}

export async function packageSamples(root = process.cwd()) {
  for (const id of Object.keys(SAMPLES)) {
    try {
      await access(path.join(root, id));
    } catch {
      throw new Error(`Missing sample folder: ${id}`);
    }
  }
  for (const name of REQUIRED) {
    try {
      await access(path.join(root, 'shared', name));
    } catch {
      throw new Error(`Missing shared file: ${name}`);
    }
  }
  await syncShared(root);
  const dist = path.join(root, 'dist');
  await mkdir(dist, { recursive: true });
  const pending = [];
  try {
    for (const id of Object.keys(SAMPLES)) {
      const dir = path.join(root, id);
      const files = (await walk(dir)).filter((file) => file !== 'imsmanifest.xml');
      await writeFile(path.join(dir, 'imsmanifest.xml'), buildManifest(id, files), 'utf8');
      const partial = path.join(dist, `${id}-scorm12.zip.partial`);
      await rm(partial, { force: true });
      await zipDirectory(dir, partial);
      pending.push({ partial, final: path.join(dist, `${id}-scorm12.zip`) });
    }
    for (const item of pending) {
      await rm(item.final, { force: true });
      await rename(item.partial, item.final);
    }
  } catch (error) {
    for (const id of Object.keys(SAMPLES)) {
      await rm(path.join(dist, `${id}-scorm12.zip.partial`), { force: true });
    }
    throw error;
  }
}

if (process.argv[1] && process.argv[1].endsWith('package.mjs')) {
  packageSamples().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
