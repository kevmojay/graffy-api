(() => {
  const _ = require('underscore');
  const app = require('../../server');
  const UserController = {};

  UserController.allUsers = (req, res) => {
    app.knex.select('*').from('person')
    .then((rows) => {
       res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  UserController.addUser = (req, res) => {
    const reqFields = _.pick(
      req.body,
      'user_id',
      'user_name',
      'first_name',
      'last_name',
      'email'
    );
    
    app.knex.insert(reqFields).into('person')
    .then(() => {
      res.json({status: 'success'});
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  module.exports = UserController;
})();
