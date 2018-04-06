var express = require("express");
var app = express();

var sudoku = require("./public/js/sudoku");

var bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({ extended:false });

app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/" + index.html);
});

app.post("/generate_sudoku", urlEncodeParser, function(req, res){
    var response = {
        "difficulty": req.body.difficulty
    }

    var newPuzzle = sudoku.generatePuzzle(req.body.difficulty);
    console.log(newPuzzle);
    res.send(JSON.stringify(newPuzzle));
    res.end();
});

var server = app.listen(8080, function(req, res){
  var host = server.address().address;
  var port = server.address().port;

  console.log("The url is http://%s:%s", host, port);
})
