const GameController = require('../controller/controller');

module.exports = app => {
  app.get('/api/board', GameController.getGame);

  // send post with { rows, cols, mines } difficulty
  app.post('/api/createGame', GameController.createGame);

  // reveal coordinates
  app.post('/api/reveal', GameController.reveal);
};
