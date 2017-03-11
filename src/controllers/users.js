(() => {
  const _ = require('underscore');
  const pool = require('../../server');
  const UserController = {};

  UserController.allUsers = (req, res) => {
    pool.query('SELECT * from person', (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      res.json(result.rows);
    });
  }

  UserController.addUser = (req, res) => {
    const reqFields = _.values(_.pick(
      req.body,
      'user_id',
      'user_name',
      'first_name',
      'last_name',
      'email'
    ));
    const queryStr = 'INSERT INTO PERSON (user_id, user_name, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)';
    pool.query(queryStr, reqFields)
      .then(() => {
        res.json({status: 'success'});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  module.exports = UserController;
})();
