var models = require('../models');
var db = require('../db');
var promise = require('bluebird');

module.exports = {
  get: function (req, res) {
    return models.messages.getAll()
      .then((data) => {
        res.status(200).send(JSON.stringify(data));
      });
  }, // a function which handles a get request for all messages

  post: function (req, res) {
    console.log('before: ', req.body);
    const promiseA = new Promise((resolve, reject) => {
      console.log('checking async: ', req.body);
      resolve(req.body);
    });
    promiseA.then((body) => {
      console.log('check async 2:', body);
      models.messages.create(JSON.parse(JSON.stringify(body)));
      res.sendStatus(201);
    });
  }
};



// models.messages.create(req.body, (storeMsg) => {
//   var sqlMsg = 'INSERT INTO messages (content, createTime, userName, roomName) VALUES (?,?,?,?);';
//   console.log('query', sqlMsg);
//   db.connection.execute(sqlMsg, storeMsg, function(err, data) {
//     if (err) {
//       console.log('err!!!', err);
//     } else {
//       console.log('checking message!', data);
//     }
//   });

// });
// res.sendStatus(201);

// } // a function which handles posting a message to the database

// };
