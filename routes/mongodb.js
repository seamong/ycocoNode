// getting-started.js
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
// Connection URL
var url = 'mongodb://127.0.0.1:27017/ycoco';
// Database Name
var dbName = 'ycoco';

var name = 'hello';
module.exports = {
  name: name,
  // 查询
  find:function (collectionName,condition,callback) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      // console.log("Connected successfully to server");
      var db = client.db(dbName);
      db.collection(collectionName).find(condition).toArray(function (err, result){
        if(err) {
          throw err;
        }
        callback(result);
      })
    });
  },
  // 添加数据
  insert:function (collectionName,document,callback) {
    this.find(collectionName,document.name,function(result){
      if(result.length !== 0){
        callback('您已提交过信息！');
      } else {
        // Connect using MongoClient
        MongoClient.connect(url, function(err, client) {
          var db = client.db(dbName);
          // Create a collection we want to drop later
          var col = db.collection(collectionName);
          // Insert a bunch of documents
          col.insert(document,function(err, result) {
            callback(result.ok);
            assert.equal(null, err);
            // Show that duplicate records got dropped
            col.find(document.name).toArray(function(err, items) {
              if(items.length !== 1){
                callback('提交失败');
              } else {
                callback(result);
              }
              client.close();
            });
          });
        });
      }
    })
  }
}