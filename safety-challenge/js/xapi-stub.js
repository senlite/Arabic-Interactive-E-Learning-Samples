window.XAPI = {
  endpoint: null,
  send: function (verb, extra) {
    var stmt = Object.assign({
      actor: { name: 'Demo Learner', mbox: 'mailto:demo@example.com' },
      verb: { id: 'http://adlnet.gov/expapi/verbs/' + verb, display: { 'en-US': verb } },
      object: { id: location.origin + location.pathname, definition: { name: { 'ar': document.title } } },
      timestamp: new Date().toISOString()
    }, extra || {});
    console.info('[xAPI]', JSON.stringify(stmt));
    return stmt;
  }
};
