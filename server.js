'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const port = process.env.PORT || 7300;
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

app.get('/ads',(req, res) => {
  console.log('Get All');
    let sql = "SELECT * FROM ads";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  
  //show single product
  app.get('/ads/:id',(req, res) => {
    let sql = "SELECT * FROM ads WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //add new product
  app.post('/ads',(req, res) => {
    let data = {title: req.body.title, price: req.body.price, description: req.body.description, category:req.body.category};
    let sql = "INSERT INTO ads SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //update product
  app.put('/ads/:id',(req, res) => {
    let sql = "UPDATE ads SET title='"+req.body.title+"', price='"+req.body.price+"', description='"+req.body.description+"', category='"+req.body.category+"' WHERE id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //Delete product
  app.delete('/ads/:id',(req, res) => {
    let sql = "DELETE FROM ads WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

var server = app.listen(port, function() {
    console.log("Server started " + port);
});