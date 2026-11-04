(function (root) {
  function endingFor(score) {
    if (score >= 25 && score <= 30) return 'best';
    if (score >= 15 && score <= 20) return 'ok';
    if (score >= 0 && score <= 10) return 'poor';
    throw new Error('score outside bands');
  }

  function percent(score) {
    return Math.round(score / 30 * 100);
  }

  function keepBest(previous, next) {
    if (previous === null || previous === undefined) return next;
    return previous > next ? previous : next;
  }

  function shuffle(choices, random) {
    var copy = choices.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function applyChoice(attempt, node, choiceId) {
    var found = false;
    for (var i = 0; i < node.choices.length; i += 1) {
      if (node.choices[i].id === choiceId) found = true;
    }
    if (!found) throw new Error('unknown choice');
    return {
      screen: 'feedback',
      nodeId: node.id,
      pendingChoiceId: choiceId,
      path: attempt.path.slice(),
      score: attempt.score,
      bestPercent: attempt.bestPercent,
      startedAt: attempt.startedAt
    };
  }

  function confirmChoice(attempt, content) {
    var node = content.nodes[attempt.nodeId];
    var choice = null;
    for (var i = 0; i < node.choices.length; i += 1) {
      if (node.choices[i].id === attempt.pendingChoiceId) choice = node.choices[i];
    }
    var path = attempt.path.concat([{ node: node.id, choice: choice.id, points: choice.points }]);
    var score = attempt.score + choice.points;
    var next = {
      screen: choice.next === 'END' ? 'ending' : 'decision',
      nodeId: choice.next === 'END' ? null : choice.next,
      pendingChoiceId: null,
      path: path,
      score: score,
      bestPercent: attempt.bestPercent,
      startedAt: attempt.startedAt
    };
    return next;
  }

  root.FeedbackEngine = {
    endingFor: endingFor,
    percent: percent,
    keepBest: keepBest,
    shuffle: shuffle,
    applyChoice: applyChoice,
    confirmChoice: confirmChoice
  };
})(typeof window !== 'undefined' ? window : globalThis);
