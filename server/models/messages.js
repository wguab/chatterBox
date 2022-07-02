var db = require('../db');
var promise = require('bluebird');
// db.connection

module.exports = {
  // a function which produces all the messages
  getAll: function () {
    const promiseA = new Promise ((resolve, reject) => {
      db.connection.query(
        'SELECT messages.content as content, createTime as createTime, messages.roomName as roomName, users.userName as userName FROM messages JOIN users on users.id = messages.userId;',
        function(err, result, fields) {
          if (err) {
            console.log('error');
          }
          resolve(result);
        }
      );
    });
    return promiseA;
  },



  create: function (data) {
    return new Promise ((resolve, reject) => {
      const {username, text, roomname} = data;
      var createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var storeMsg = [text, createTime, username, roomname];
      resolve(storeMsg);
    })
      .then((storeMsg) => {
        sqlTakeId = `select id from users where users.userName = '${storeMsg[2]}'`;
        return new Promise((resolve, reject) => {
          db.connection.execute(sqlTakeId, [], function(err, result) {
            if (err) {
              console.log(err);
            } else {
              storeMsg[2] = result[0].id;
              resolve(storeMsg);
            }
          });
        });
      })
      .then(storeMsg => {
        var sqlMsg = 'INSERT INTO messages (content, createTime, userId, roomName) VALUES (?,?,?,?);';
        db.connection.execute(sqlMsg, storeMsg, function(err, data) {
          if (err) {
            console.log('err!!!', err);
          } else {
            console.log('checking message!', data);
          }
        });
      });
  }
};




//   create: function (data, cb) {
//     console.log('whhy empty?',data);

//     const {username, text, roomname} = data;
//     var createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

// create: function (data) {
//   console.log('get here! 1', data);
//   const promiseA = new Promise ((resolve, reject) => {
//     const {username, text, roomname} = data;
//     var createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     var storeMsg = [text, createTime, username, roomname];
//     resolve(storeMsg);
//   });

//   promiseA.then((storeMsg) => {
//     console.log('get here! 2');
//     sqlTakeId = `select id from users where users.userName = '${storeMsg[2]}'`;
//       db.connection.execute(sqlTakeId, [], function(err, result) {
//         if (err) {
//           console.log('!!!!!!');
//           console.log(err);
//         } else {
//           storeMsg[2] = result[0].id;
//           console.log(storeMsg);
//           return storeMsg;
//         }
//       });
//     })
//       .then(storeMsg => {
//         console.log('get here! 3', storeMsg);
//         var sqlMsg = 'INSERT INTO messages (content, createTime, userId, roomName, ) VALUES (?,?,?,?);';

//         db.connection.execute(sqlMsg, storeMsg, function(err, data) {
//           if (err) {
//             console.log('err!!!', err);
//           } else {
//             console.log('checking message!', data);
//           }
//         });
//       });
//   }
// };




//   create: function (data, cb) {
//     console.log('whhy empty?',data);

//     const {username, text, roomname} = data;
//     var createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     // console.log('checking data, ', data);
//     var storeMsg = [text, createTime, username, roomname];
//     console.log(storeMsg);
//     cb(storeMsg);
//   } // a function which can be used to insert a message into the database
// };
 // a function which can be used to insert a message into the database




// console.log('debug: ', storeMsg);

// var sqlMsg = 'INSERT INTO messages (content, createTime, userName, roomName) VALUES (?,?,?,?);';
// console.log(sqlMsg);
// db.connection.execute(sqlMsg, storeMsg, function(err, data) {
//   if (err) {
//     console.log('err!!!', err);
//   } else {
//     console.log('checking message!', data);
//   }
// });


// ////////////////
// sqlGet = 'select userName from users where id = 1';
// const abc = db.connection.execute(sqlGet, function(err, data) {
//   if (err) {
//     console.log('err!!!', err);
//   } else {
//     console.log('checking!', data);
//   }
// });

// // console.log('get name!', abc);
// var storeMsg = (text, createTime, userId, roomId);

// var sqlMsg = `INSERT INTO messages (content, createTime, id_User, id_Room) VALUES ${storeMsg};`;


// // sqlRoom = 'insert into rooms (roomName) values ("abc");';
// // db.connection.query(sqlRoom, function(err, data) {
// //   if (err) {
// //     console.log('err!!!', err);
// //   } else {
// //     console.log('checking!', data);
// //   }
// // });

// // sqlUser = 'insert into users (userName) values ("May");';
// // db.connection.query(sqlUser, function(err, data) {
// //   if (err) {
// //     console.log('err!!!', err);
// //   } else {
// //     console.log(data);
// //   }
// // });


// // sqlTry = 'INSERT INTO messages (content, createTime, id_User, id_Room) VALUES ("ss", "2022-06-24 16:40:02", 1, 1);';
// // console.log('db ', db);
// // console.log('db.connection ', db.connection);
// // db.connection.query(sqlTry, function(err, data) {
// //   if (err) {
// //     console.log('err!!!', err);
// //   } else {
// //     console.log(data);
// //   }
// // });
// // console.log('get here');
// ////////////////




// // var sqlId = `select id from users where userName = ${username}}`;
// // db.connection.query(sqlId, function(err, userId) {
// //   console.log('enter? error', err, 'success?', userId);
// //   if (err) {
// //     console.log(err, 'error!');
// //   }
// //   console.log('get 1, get userid? ', userId);
// //   var sqlRoom = `select id from rooms where roomName = ${roomname}}`;
// //   db.connection.query(sqlRoom, function (err, roomId) {
// //     if (err) {
// //       console.log(err, 'error');
// //     }
// //     console.log('get 2, get roomid? ', roomId);
// //     if (!roomId) {
// //       sqlInsertId = `insert into rooms (roomName) values ${roomname}`;
// //       db.connection.execute(sqlInsertId);
// //     }

// //     var storeMsg = (text, createTime, userId, roomId);

// //     var sqlMsg = `INSERT INTO messages (content, createTime, id_User, id_Room) VALUES ${storeMsg};`;
// //     db.connection.execute(sqlMsg, reply);
// //     // var storeRoom = (data.room);
//     // var sqlRoom = `INSERT INTO rooms (roomName) VALUES ${storeRoom};`;
//     // db.connection.execute(sqlRoom, reply);
//   });


// })