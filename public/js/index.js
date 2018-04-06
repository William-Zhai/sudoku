window.onload = function(ev) {
	var cellArr = document.getElementsByClassName("cell");

	for (var i = 0, len = cellArr.length - 9; i < len; i++) {
		let cellClassList = cellArr[i].classList;
		if ( cellClassList.length > 1 && cellClassList.value.indexOf('solved') < 0 ) {
			cellArr[i].innerHTML = "<input type='text' />";
		}
	}
};

var sudoku = document.getElementById("sudoku");

sudoku.onclick = function(ev) {
	var target = ev.target;
	var value, cellArr, tmpElement = null;

	if (target.nodeName.toLowerCase() == 'a' && target.getAttribute("class") == "menu-trigger") {

		tmpElement = document.getElementsByClassName("menu");
		tmpElement[0].className = tmpElement[0].className.split(" ")[0];

		tmpElement = document.getElementsByClassName("menu-trigger");
		tmpElement[0].className += " hide";

	} else if (target.nodeName.toLowerCase() == 'a') {

		this._difficulty = target.getAttribute("data-value");

		var params = {
			"difficulty":this._difficulty
		};

		$(function(){
			$.ajax({
				data: params,
				url:"/generate_sudoku",
				type:"post",
				success: function(data){

					tmpElement = document.getElementsByClassName("menu");
					tmpElement[0].className += " hide";

					tmpElement = document.getElementsByClassName("menu-trigger");
					tmpElement[0].className = tmpElement[0].className.split(" ")[0];

					var cellArr = document.getElementsByClassName("cell");

					var vData = JSON.parse(data);

					for(var i=0, len=cellArr.length-9; i<len;i++){
						cellArr[i].innerHTML = vData[i];
						console.log(typeof vData[i]);
						if(typeof vData[i] === "number"){
							cellArr[i].className = "cell solved";
						} else {
							cellArr[i].className = "cell empty";
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert("error" + textStatus + " " + errorThrown);
				}

			})
		})

	} else {

		value = target.innerHTML;
		cellArr = document.getElementsByClassName("cell");

		for (var i = 0, len = cellArr.length - 9; i < len; i++){
			if ( value && cellArr[i].innerHTML === value) {
				cellArr[i].className = 'cell solved highlighted';
			} else if ( cellArr[i].className == "cell solved highlighted") {
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