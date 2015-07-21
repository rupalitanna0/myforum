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
        if(err){
          console.log("this is an err")
        }
        console.log(result)
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
      client.query(query, [string], function (err, result) {
        cb(result.rows[0])
      })
    })
    this.end();
  },
  findUserName: function (columns, table, table2, column1, cb){
      pg.connect(dbUrl, function (err, client, done){
        var query = 'SELECT '+columns+' FROM ' + table + ' FULL OUTER JOIN ' + table2 + ' ON ' + table+'.'+column1 + '=' + table2+'.id'
        console.log("iam  ################################################### qqqqqqqqqqqqqqqqq",query)
        client.query(query, function (err, result){
          console.log("THIS IS RESULT", result);
          cb(result.rows)
        })

      })
      this.end();
  },
  updateview: function(table, columns, id, cb){
    pg.connect(dbUrl, function (err, client, done){
      var query = 'UPDATE '+ table +' SET '+ columns+' = '+ columns+'+1' +' WHERE ' + table+'.id'+'='+id
      console.log(query)
      client.query(query, function (err, result){
        cb(result.rows);
      })
    })
    this.end();
  },
  des: function(table, column, cb) {
    pg.connect(dbUrl, function (err, client, done) {
      var query = 'SELECT * FROM ' + table + ' ORDER BY '+ column + ' DESC'
      console.log('i am view mxxxxxxxxxxxxxxxxxxxxxxxx',query);
      client.query(query, function(err, result) {
        done();
        cb(result.rows);
      });
    });
    this.end(); 
  }
  
};