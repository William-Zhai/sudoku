var sudoku = require("./sudoku");

var newPuzzle = sudoku.generatePuzzle("Difficulty");

printNumber(newPuzzle);

function printNumber(newPuzzle) {
	var cells = newPuzzle;
	var nIt;
	for( nIt = 0; nIt < 9; nIt++ ) {
		console.log( ' ' + cells[ nIt * 9 ] + '_' 
					     + cells[ nIt * 9 + 1 ] + '_'
					     + cells[ nIt * 9 + 2 ] + '_'
					     + cells[ nIt * 9 + 3 ] + '_'
					     + cells[ nIt * 9 + 4 ] + '_'
					     + cells[ nIt * 9 + 5 ] + '_'
					     + cells[ nIt * 9 + 6 ] + '_'
					     + cells[ nIt * 9 + 7 ] + '_'
					     + cells[ nIt * 9 + 8 ] + '\n');
	}
}
