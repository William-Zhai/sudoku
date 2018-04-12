var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({ extended: true });

var sudoku = require("./public/js/sudoku");

/*
  for application/json
*/
app.use(bodyParser.json());
/*
  for application/x-www-form-urlencoded
*/
app.use(bodyParser.urlencoded({ extended: true }))

/*
  use the express.static to set the static folder
*/
app.use(express.static('public'));


/*
  handle the index.html 
*/
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/" + index.html);
});

/*
  handle the post request for new sudoku
*/
app.post("/generate_sudoku", function(req, res) {
    var response = {
        "difficulty": req.body.difficulty
    };
    // var newPuzzle = sudoku.generatePuzzle(req.body.difficulty);
    var newPuzzle = new sudoku(req.body.difficulty);
    newPuzzle.generatePuzzle();
    res.send(JSON.stringify(newPuzzle.getSudokuInfo()));
    res.end();
});

var server = app.listen(8080, function(req, res) {
    var host = server.address().address;
    var port = server.address().port;

    console.log("The url is http://%s:%s", host, port);
})