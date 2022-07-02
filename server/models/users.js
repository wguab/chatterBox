var db = require('../db');
var promise = require('bluebird');

module.exports = {
  getAll: function () {
    const promiseA = new Promise((resolve, reject) => {
      db.connection.query(
        'SELECT * FROM users',
        function(err, result, fields) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
    return promiseA;
  },

  create: function ({ username }) {
    // console.log(username.username);
    // var storeUser = (data.username);
    var sqlUser = 'INSERT INTO users (userName) VALUES (?);';
    db.connection.query(sqlUser, [username], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  }
};
