(function (root) {
  function same(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
    return true;
  }

  function shuffleArray(items, random) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function scoreChoice(optionCorrect) {
    if (optionCorrect) return { base: 100, correct: true, lifeLost: false };
    return { base: 0, correct: false, lifeLost: true };
  }

  function scoreOrder(submitted, correct) {
    var matches = 0;
    for (var i = 0; i < correct.length; i += 1) {
      if (submitted[i] === correct[i]) matches += 1;
    }
    if (same(submitted, correct)) return { base: 100, correct: true, lifeLost: false };
    return { base: 25 * matches, correct: false, lifeLost: true };
  }

  function scoreHotspot(input) {
    if (input.allFound) {
      var full = Math.max(0, 100 - 10 * input.wrongTaps);
      return { base: full, correct: full === 100, lifeLost: false };
    }
    if (input.timedOut) {
      return {
        base: Math.max(0, 33 * input.foundCount - 10 * input.wrongTaps),
        correct: false,
        lifeLost: true
      };
    }
    throw new Error('hotspot not ended');
  }

  function timeBonus(input) {
    if (input.correct && input.timerOn && input.remainingRatio >= 0.5) return 50;
    return 0;
  }

  function badge(base, finishedAll) {
    if (!finishedAll) return null;
    if (base >= 900) return 'gold';
    if (base >= 700) return 'silver';
    return 'bronze';
  }

  function scormPercent(base) {
    return Math.round(base / 1000 * 100);
  }

  function lessonStatus(percent) {
    return percent >= 70 ? 'passed' : 'failed';
  }

  function keepBest(previous, next) {
    if (previous === null || previous === undefined) return next;
    return previous > next ? previous : next;
  }

  function shuffleOptions(options, random) {
    return shuffleArray(options, random);
  }

  function shuffleSteps(steps, random) {
    var copy = steps.slice();
    var guard = 0;
    do {
      copy = shuffleArray(steps, random);
      guard += 1;
    } while (same(copy, steps) && guard < 8);
    if (same(copy, steps)) {
      var tmp = copy[0];
      copy[0] = copy[1];
      copy[1] = tmp;
    }
    return copy;
  }

  root.SafetyEngine = {
    scoreChoice: scoreChoice,
    scoreOrder: scoreOrder,
    scoreHotspot: scoreHotspot,
    timeBonus: timeBonus,
    badge: badge,
    scormPercent: scormPercent,
    lessonStatus: lessonStatus,
    keepBest: keepBest,
    shuffleOptions: shuffleOptions,
    shuffleSteps: shuffleSteps
  };
})(typeof window !== 'undefined' ? window : globalThis);
