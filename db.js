var pg = require('pg');
var dbUrl = "pg://localhost/myforum_db";

module.exports = {
  end: function() {
    pg.end();
  },
  all: function(table, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      client.query('SELECT * FROM ' + table, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end();
  },
  find: function(table, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      client.query('SELECT * FROM ' + table + ' WHERE id=' + id, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end();
  },
  findRelations: function(table, column, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end();
  },
  delete: function(table, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      client.query('DELETE FROM ' + table + ' WHERE id=' + id, function(err, result) {
        done();
        cb(result);
      });
    });
    this.end();
  },
  create: function(table, obj, cb) {

    console.log(table, obj);

    pg.connect(dbUrl, function(err, client, done) {
      var columns = [];
      var values = [];
      var dollars = [];
      Object.keys(obj).forEach(function(key, i) {
        columns.push(key);
        values.push(obj[columns[i]]);
        dollars.push('$' + (i + 1));
      });
      var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES(' + dollars.join(', ') + ') RETURNING id AS id';
      console.log(query);
      console.log('values', values)
      client.query(query, values, function(err, result) {
        done();

        console.log(err);
        console.log(result);
        cb(result.rows[0]);
      });
    });
    this.end()
  },
  update: function(table, obj, id, cb) {
    pg.connect(dbUrl, function(err, client, done) {
      var columns = [];
      var set = [];
      var values = [];
      Object.keys(obj).forEach(function(key, i) {
        columns.push(key);
        set.push(key + '=($' + (i + 1) + ')');
        values.push(obj[columns[i]]);
      });
      client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id, values, function(err, result) {
        done();
        cb(result);
      })
    })
    this.end();
  },
  getUser: function(table, string, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      var query = 'SELECT * FROM ' + table + ' WHERE username=($1)'
      console.log(query)
      client.query(query, [string], function (err, result) {
        console.log(result)
        cb(result.rows[0])
      })
    })
    this.end();
  }
  //   Select 
  //     count(views.id)
  // from views

  // client.query('UPDATE views set views = views+1 WHERE topic_id=$1')
};