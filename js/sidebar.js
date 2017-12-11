window.onload = function init() {
	//sidebar default selected
	if(document.querySelector('.fs-sidebar-side .selected') == null){
		addClass(document.querySelector('.fs-sidebar-side li'), 'selected');
		//content 로딩
	}


	//event listener 설정
	addListenerAll(document.querySelectorAll('.fs-sidebar-side-article'), 'click', function(event){
		removeClassAll(document.querySelectorAll('.fs-sidebar-side-article'), 'selected');
		if(event.target.parentElement.nodeName == 'UL'){
			addClass(event.target, 'selected');			
		}else{
			addClass(event.target.parentElement, 'selected')
			//content 삭제
			//content 로딩
		};
	})

	addListenerAll(document.querySelectorAll('.fs-sidebar-content table tr'), 'click', function(event){
		removeClassAll(document.querySelectorAll('.fs-sidebar-content table tr'), 'selected');
		addClass(event.target.parentElement, 'selected');
	})
}

function addListenerAll(elemArr, ev, listener){
	for(var i=0; i<elemArr.length; i++){
		if(elemArr[i].addEventListener) {
			elemArr[i].addEventListener(ev, listener, false);		
		} else if(elemArr[i].attachEvent) {
			elemArr[i].attachEvent('on' + ev, listener);
		} else {
			throw new Error ('Event failed');
		}
	}
}

function removeClassAll(elemArr, className){
	for(var i=0; i<elemArr.length; i++){
		if(elemArr[i].classList.contains(className)){
			removeClass(elemArr[i], className);
		}
	}
}

function addClass(element, className){
	element.className += " " + className; 
};

function removeClass(element, className){ 
	var check = new RegExp("(\\s|^)" + className + "(\\s|$)"); 
	element.className = element.className.replace(check, " ").trim(); 
}


function emptyChildElement(element){
	while(element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function importTemplate(element, jsonParam, templateId){
	
	emplyChildElement(element);
	var t = document.querySelector('#fs-sidebar-content-template');
	
	var clone = document.importNode(t.content, true);
	document.querySelector('.fs-sidebar-content table').appendChild(clone);
}

function genTemplate(templateId){
	json parse
}

function makeTamplate(){
	if (return 'content' in document.createElement('template')) {
	  	
		var t = document.querySelector('#fs-sidebar-content-template');
		var clone = document.importNode(t.content, true);
		document.querySelector('.fs-sidebar-content table').appendChild(clone);

	} else {
	  // Use old templating techniques or libraries.
	}

}