/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chat'

  });

  beforeAll((done) => {
    dbConnection.connect();

    const tablename1 = 'messages'; // TODO: fill this out
    // const tablename2 = 'users';

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename1}`, done);
    // dbConnection.query(`truncate ${tablename2}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const text = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, text, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          console.log(queryString);
          console.log('!!!!!!!!!!!result!', results);
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].content).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
    // dbConnection.query('truncate messages', done);
  });

  // it('Should output all messages from the DB', (done) => {
  //   // Let's insert a message into the db

  //   const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  //   const queryString = 'INSERT INTO messages (content, createTime, userName, roomName) VALUES (?,?,?,?);';
  //   const queryArgs = ['I hope we can pass it!', createTime, 'Valjean', 'May and Candace'];
  //   /* TODO: The exact query string and query args to use here
  //    * depend on the schema you design, so I'll leave them up to you. */
  //   dbConnection.query(queryString, queryArgs, (err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     // Now query the Node chat server and see if it returns the message we just inserted:
  //     axios.get(`${API_URL}/messages`)
  //       .then((response) => {
  //         const messageLog = response.data;
  //         console.log('checking! ', messageLog);
  //         expect(messageLog[0].content).toEqual('I hope we can pass it!');
  //         expect(messageLog[0].roomName).toEqual('May and Candace');
  //         done();
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //   });
    // dbConnection.query('truncate messages', done);

  // });
});
