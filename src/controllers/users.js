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

  UserController.checkIfUserExists = (req, res) => {
    const reqFields = _.values(_.pick(
      req.body,
      'user_id'
    ));

    const queryStr = 'SELECT CASE WHEN EXISTS (SELECT * from person WHERE user_id = $1) THEN CAST(1 AS BIT) ELSE CAST (0 AS BIT) END'
    pool.query(queryStr, reqFields)
    .then((result) => {
      if (result.rows[0].case === 1) res.json({ exists: true });
      else res.json({ exists: false });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  UserController.getUserById = (req, res) => {
    const reqFields = _.values(_.pick(
      req.body,
      'user_id'
    ));

    const queryStr = 'SELECT * from person where user_id = $1'
    pool.query(queryStr, reqFields)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  }

  module.exports = UserController;
})();
