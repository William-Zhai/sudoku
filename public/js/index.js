var sudoku = document.getElementById("sudoku");

var solutionArray = [];

/*
	body catches all the click events
*/
sudoku.onclick = function(ev) {

    /*
    	get the element where the click is triggered. 
    */
    var target = ev.target;
    var value, cellArr, tmpElement = null;


    if (target.nodeName.toLowerCase() == 'a' && target.getAttribute("class") == "menu-trigger") {
        /*
        	hide the sudoku cells when click the menu icon
        */

        tmpElement = document.getElementsByClassName("menu");
        tmpElement[0].className = tmpElement[0].className.split(" ")[0];

        tmpElement = document.getElementsByClassName("menu-trigger");
        tmpElement[0].className += " hide";

    } else if (target.nodeName.toLowerCase() == 'a') {
        /*
        	handle the case when selecting the difficulty of the sudoku.
        	Then send the post request via ajax using the native JavaScript.
        */

        this._difficulty = target.getAttribute("data-value");

        var params = {
            "difficulty": this._difficulty
        };

        /* 
        	create one ajax request
        */
        var XHR = createXHR();

        if (!XHR) {
            alert("unable to create XMLHttpRequest instance.");
            return false;
        }

        XHR.open("post", "/generate_sudoku", true);
        XHR.setRequestHeader('Content-Type', 'application/json');
        XHR.onreadystatechange = function() {
            if (XHR.readyState === XMLHttpRequest.DONE) {
                if (XHR.status === 200) {
                    handleSuccess(XHR.responseText);
                } else {
                    alert("error" + XHR.status + " " + XHR.responseText);
                }
            }
        };
        XHR.send(JSON.stringify(params));

    } else {
        /*
         handle the case select all the same number which has been selected.
        */
        value = target.innerHTML;
        cellArr = document.getElementsByClassName("cell");

        for (var i = 0, len = cellArr.length - 9; i < len; i++) {
            if (value && cellArr[i].innerHTML === value) {
                cellArr[i].className = 'cell solved highlighted';
            } else if (cellArr[i].className == "cell solved highlighted") {
                cellArr[i].className = "cell solved";
            }
        }
    }

};

sudoku.onkeyup = function(ev) {
    var target = ev.target;

    var parentNode = target.parentNode;

    if (target.value != parentNode["data-value"]) {
        target.value = null;
        return;
    }
    parentNode.innerHTML = target.value;
    parentNode.className = "cell solved";
};

function createXHR() {
    var XHR;
    if (window.XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XHR;
}

function handleSuccess(data) {
    tmpElement = document.getElementsByClassName("menu");
    tmpElement[0].className += " hide";

    tmpElement = document.getElementsByClassName("menu-trigger");
    tmpElement[0].className = tmpElement[0].className.split(" ")[0];

    var cellArr = document.getElementsByClassName("cell");

    var vData = JSON.parse(data);

    var puzzle = vData.puzzle;
    solutionArray = vData.solution;

    for (var i = 0; i < puzzle.length - 1; i++) {
        var val = i % 27;
        // 1~3
        if (val < 3) {
            cellArr[i].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i].className = "cell solved";
            } else {
                cellArr[i].className = "cell empty";
                cellArr[i]["data-value"] = solutionArray[i];
            }
        } else if (val < 6) {
            //4~6
            cellArr[i + 6].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i + 6].className = "cell solved";
            } else {
                cellArr[i + 6].className = "cell empty";
                cellArr[i + 6]["data-value"] = solutionArray[i];
            }
        } else if (val < 9) {
            //7~9
            cellArr[i + 12].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i + 12].className = "cell solved";
            } else {
                cellArr[i + 12].className = "cell empty";
                cellArr[i + 12]["data-value"] = solutionArray[i];
            }
        } else if (val < 12) {
            //10~12
            cellArr[i - 6].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i - 6].className = "cell solved";
            } else {
                cellArr[i - 6].className = "cell empty";
                cellArr[i - 6]["data-value"] = solutionArray[i];
            }
        } else if (val < 15) {
            //13~15
            cellArr[i].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i].className = "cell solved";
            } else {
                cellArr[i].className = "cell empty";
                cellArr[i]["data-value"] = solutionArray[i];
            }
        } else if (val < 18) {
            // 16~18
            cellArr[i + 6].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i + 6].className = "cell solved";
            } else {
                cellArr[i + 6].className = "cell empty";
                cellArr[i + 6]["data-value"] = solutionArray[i];
            }
        } else if (val < 21) {
            //19~21
            cellArr[i - 12].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i - 12].className = "cell solved";
            } else {
                cellArr[i - 12].className = "cell empty";
                cellArr[i - 12]["data-value"] = solutionArray[i];
            }
        } else if (val < 24) {
            //22~24
            cellArr[i - 6].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i - 6].className = "cell solved";
            } else {
                cellArr[i - 6].className = "cell empty";
                cellArr[i - 6]["data-value"] = solutionArray[i];
            }
        } else if (val < 27) {
            //25~27
            cellArr[i].innerHTML = puzzle[i];
            if (typeof puzzle[i] === "number") {
                cellArr[i].className = "cell solved";
            } else {
                cellArr[i].className = "cell empty";
                cellArr[i]["data-value"] = solutionArray[i];
            }
        }
    }

    var cellArr = document.getElementsByClassName("cell");

    for (var i = 0, len = cellArr.length - 9; i < len; i++) {
        if (cellArr[i].className == 'cell empty') {
            cellArr[i].innerHTML = "<input type='text' />";
        }
    }
}