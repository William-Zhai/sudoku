var sudoku = document.getElementById("sudoku");

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
        // XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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

    if (!target.value) return;
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

    for (var i = 0, len = cellArr.length - 9; i < len; i++) {
        cellArr[i].innerHTML = vData[i];
        if (typeof vData[i] === "number") {
            cellArr[i].className = "cell solved";
        } else {
            cellArr[i].className = "cell empty";
        }
    }

    var cellArr = document.getElementsByClassName("cell");

    for (var i = 0, len = cellArr.length - 9; i < len; i++) {
        if (cellArr[i].className == 'cell empty') {
            cellArr[i].innerHTML = "<input type='text' />";
        }
    }
}