function generatePuzzle(nDifficultyValue) {

    var aPuzzle = Array.apply(null, {length:81}).map(function(val, index){
        return {
            id: index,
            number:[0],
            blockId:index
        };
    });

	aPuzzle = initBlockId(aPuzzle);
	aPuzzle = randomSetNum(aPuzzle);
	aPuzzle = solveSodu(aPuzzle);
    aPuzzle = removeSomeNumer(aPuzzle, nDifficultyValue);

	return aPuzzle.map(function(value, index){
        return value.number[0];
    });
}


function initBlockId(aPuzzle) {
    var nRow, nColumn, nIt;
    var cells = aPuzzle;
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		nRow = getRow( nIt );
    	nColumn = getColumn( nIt );

		if ( nRow < 3 ) {
			cells[ nIt ].blockId = checkColumnPosition( nColumn );
		} else if ( nRow < 6 ) {
			cells[ nIt ].blockId = checkColumnPosition( nColumn ) + 3;
		} else {
			cells[ nIt ].blockId = checkColumnPosition( nColumn ) + 6;
		} 
    }
    
    return cells;
}

function randomSetNum(aPuzzle) {
	var positionList = [];
    var nPosition, nTmpNumber, nIt;
    var cells = aPuzzle;

	for ( nIt = 0; nIt < 11; nIt++ ) {
		nPosition = getRandomNumber81();
		nTmpNumber = getRandomNumber();
		
		if ( positionList.indexOf( nPosition ) < 0 && !isContradict( cells, nPosition, nTmpNumber ) ) {
			positionList.push( nPosition );
			cells[nPosition].number[0] = nTmpNumber;
		} else {
			nIt--;
		}

	}

	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( cells[ nIt ].number[ 0 ] == 0 ) {
			cells[ nIt ].flag = true;
		}
    }
    
    return cells;
}

function solveSodu(aPuzzle) {
	var cells = aPuzzle;
    var nIt, nItTmp, nValueListStart, nValueListEnd, oValue;
    var valueList = [];
	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( cells[ nIt ].flag ) {
		    nValueListStart = valueList.length;

			for ( nItTmp = 1; nItTmp < 10; nItTmp++ ) {
				nTmpNumber = nItTmp;

				if (  !isContradict( aPuzzle, nIt, nTmpNumber ) ) {
					valueList.push({ position: nIt, number: nTmpNumber});
				}
			}

			nValueListEnd = valueList.length;

			if ( nValueListStart < nValueListEnd ) {

				oValue = valueList.pop();
				cells[ oValue.position ].number[ 0 ] = oValue.number;
				cells[ oValue.position ].flag = false;

			} else {

				oValue = valueList.pop();
				for( nItTmp = oValue.position + 1; nItTmp <= nIt; nItTmp++ ) {
					if ( cells[ nItTmp ].flag === false ) {
						cells[ nItTmp ].number[ 0 ] = 0;
						cells[ nItTmp ].flag = true;
					}
				}
				cells[ oValue.position ].number[ 0 ] = oValue.number;
				nIt = oValue.position;
			}
		}
	}
    return cells;
}

function removeSomeNumer( aPuzzle, nLevel ) {
	var cells = aPuzzle;
	var nValueTmpList= [];
	var nIt, nItTmp, nPosition;
	nValueTmpList.splice( 0, nValueTmpList.length );
	switch( nLevel ) {
		case "easy":
			for ( nIt = 0; nIt < 47; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
					nIt--;
					continue;
				}
				nValueTmpList.push( nPosition );
				cells[ nPosition ].number[ 0 ] = '';
			}
			break;
		case "medium":
			for ( nIt = 0; nIt < cells.length; nIt++ ) {
				if ( nIt % 2 == 0 ) {
					nValueTmpList.push( nPosition );
					cells[ nIt ].number[ 0 ] = '';
				} 
			}

			for ( nIt = 0; nIt < 4; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( cells[ nPosition ].number[ 0 ] != '' ) {
					cells[ nPosition ].number[ 0 ] = '';
				} else {
					nIt--;
				}
			}
			break;
		case "difficulty":
			for ( nIt = 0; nIt < 9; nIt++ ) {
				for ( nItTmp = 0; nItTmp < 6; nItTmp++ ){
					nPosition = nIt * 9 + getRandomNumber();
					if ( nValueTmpList.indexOf( nPosition ) > 0 ) {
						nItTmp--;
						continue;
					} else {
						cells[ nPosition ].number[ 0 ] = '';
						nValueTmpList.push( nPosition );
					}

				}
			}

			for ( nIt = 0; nIt < 8; nIt++ ) {
				nPosition = getRandomNumber81();
				if ( cells[ nPosition ].number[ 0 ] != '' ) {
					cells[ nPosition ].number[ 0 ] = '';
				} else {
					nIt--;
				}
			}	
    }
    return cells;
}

function checkColumnPosition( nColumn ) {
	if ( nColumn < 3 ) {
		return 1;
	} else if ( nColumn < 6 ) {
		return 2;
	} else {
		return 3;  
	}
}

function getRow( position ) {
	return Math.floor( position / 9 );
}

function getColumn( position ) {
	return position % 9;
}

function getRandomNumber() {
	return Math.floor( Math.random() * 9 );
}

function getRandomNumber81() {
	return Math.floor( Math.random() * 81 );
}

function isContradict( aPuzzle, position, tmpNumber ) {
	var nRow = getRow( position );
	var nColumn = getColumn( position );
	var nIt = 0;
    var cells = aPuzzle;

	for( nIt = nRow * 9 ; nIt < nRow * 9 + 9 && nIt < 81; nIt ++ ) {
		if( cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}

	for( nIt = nColumn ; nIt < 8 * 9 + nColumn && nIt < 81 ; nIt += 9 ) {
		if( cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}

	for ( nIt = 0; nIt < cells.length; nIt++ ) {
		if ( nIt != position && 
			cells[ nIt ].blockId == cells[ position ].blockId && 
			cells[ nIt ].number[ 0 ] == tmpNumber ) {
			return true;
		}
	}	

	return false;
}

module.exports = {
    generatePuzzle: generatePuzzle
}