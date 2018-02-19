var express = require('express');
var cors = require('cors');
var app = express();
const path = require('path');
const fs = require('fs');

var lightning = {};
  // setup clightning client
  var dir = path.join('/root/.lightning');

  const clightning = require("./clightning")(dir);
  lightning = clightning;

var getInvoice = function(req, res) {
      // Disable cache
      res.cacheControl = {
          noCache: true
      };

      var value = parseInt(req.query.value);

      if (!value || isNaN(value) || value < 1)
          return res.status(500).send('Malformed tip value');

      if (value > 4294967)
          return res.status(500).send('Whoah, thanks for generosity but tips under uint32 limit will do! (4,294,967,295 msat to be precise)');

      lightning.AddInvoice({
          memo: "Sentiment Analysis Tips",
          value: value
      }, function(err, resp) {
          if (!err)
              res.send(resp);
          else
          {
              console.log(err);
              res.status(500).send('Error generating invoice');
          }
      });
  }

  function isHexString(str)
  {
      var re = /[0-9A-Fa-f]{6}/g;
      return re.test(str);
  }

  // Reply with invoice status
  var getInvoiceStatus = function(req, res) {
      // Disable cache
      res.cacheControl = {
          noCache: true
      };

      var rhash = req.query.rhash;

      if (!isHexString(rhash) || rhash.length != 64)
          return res.status(500).send('Malformed rhash');

      lightning.LookupInvoice({
          r_hash_str: rhash
      }, function(err, resp) {
          if (!err)
              res.send(resp.settled);
          else
              res.status(500).send('Error checking invoice status');
      });
  }

app.use(cors({
  origin: 'http://distributed.love',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.get('/getinvoice', function(req, res) {
	console.log('hit getinvoice');
	res.send( getInvoice(req, res) );
});

app.get('/invoicestatus', function(req, res) {
	res.send( getInvoiceStatus(req, res) );
});

app.listen('9001');
