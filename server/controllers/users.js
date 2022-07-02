var models = require('../models');
var promise = require('bluebird');

module.exports = {
  get: function (req, res) {
    // models.users.getAll((data) => {
    //   res.status(200).send(data);
    // });
    return models.users.getAll()
      .then((data) => {
        console.log('userdata from database' + JSON.stringify(data));
        res.status(200).send(JSON.stringify(data));
      });
  },

  post: function (req, res) {
    console.log('!!!!!!!!!!!!!!!!' + req.body);
    const promiseA = new Promise((resolve, reject) => {
      resolve(req.body);
    });
    promiseA.then((body) => {
      console.log('body is !!!!!' + body);
      models.users.create(body);
      res.sendStatus(201);
    });
  }
};