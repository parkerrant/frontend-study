window.onload = function init() {
	//사이드바 기본 선택
	if(document.querySelector('.fs-sidebar-side .selected') == null){
		addClass(document.querySelector('.fs-sidebar-side li'), 'selected');
		//content 로딩
	}

	//content 로딩	
	
	var jsonParam = JSON.parse('{"fileList":[{"fileName":"Letter 1.docx", "fileType":"word", "fileSize":"15,233", "fileDate":"14-03-2014 12:40"},{"fileName":"Letter 2.docx", "fileType":"word", "fileSize":"5,114", "fileDate":"21-08-2012 18:49"},{"fileName":"Letter 3.docx", "fileType":"word", "fileSize":"11,375", "fileDate":"23-07-2012 13:58"},{"fileName":"Salary.xlsx", "fileType":"excel", "fileSize":"62,120", "fileDate":"23-07-2012 11:57"},{"fileName":"My Calender.xlsx", "fileType":"excel", "fileSize":"64,520", "fileDate":"25-08-2012 11:57"}]}');

	importTemplate(document.querySelector('#fs-sidebar-content-template-area'), jsonParam.fileList, '#fs-sidebar-content-template');
	//importTemplate(document.querySelector('#fs-sidebar-content-template-area'), null, null);


	//사이드바 항목클릭의 event listener 설정
	addListenerAll(document.querySelectorAll('.fs-sidebar-side-article'), 'click', function(event){
		
		//selected 초기화
		removeClassAll(document.querySelectorAll('.fs-sidebar-side-article'), 'selected');
		
		//ul li 오클릭 보정처리
		if(event.target.parentElement.nodeName == 'UL'){
			//이벤트 대상 selected 추가
			addClass(event.target, 'selected');			
		}else{
			//이벤트 대상 selected 추가
			addClass(event.target.parentElement, 'selected')
			
			//content 삭제
			//content 로딩
		};
	})

	//콘텐츠리스트 항목클릭의 event listener 설정
	addListenerAll(document.querySelectorAll('.fs-sidebar-content table tr'), 'click', function(event){
		
		//selected 초기화
		removeClassAll(document.querySelectorAll('.fs-sidebar-content table tr'), 'selected');
		//selected 추가 (태그 구성으로 인한 오클릭 발생의 보정처리)
		addClass(event.target.parentElement, 'selected');
	})
}

//elemArr = 대상 객체 리스트
//ev = 이벤트 타입
//listener = 이벤트 발생시 처리 함수
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

//elemArr = 대상 객체 리스트
//classNAme = 제거 클래스 명
function removeClassAll(elemArr, className){
	for(var i=0; i<elemArr.length; i++){
		if(elemArr[i].classList.contains(className)){
			removeClass(elemArr[i], className);
		}
	}
}

//클래스 추가
function addClass(element, className){
	element.className += " " + className; 
};

//클래스 제거
function removeClass(element, className){ 
	var check = new RegExp("(\\s|^)" + className + "(\\s|$)"); 
	element.className = element.className.replace(check, " ").trim(); 
}

//해당 태그명의 모든 자식객체 제거
function emptyChildElement(element){
	
	var i = 0;

	while(element[1]) {
		element.removeChild(element[1]);
	}
}

//템플릿 추가
function importTemplate(element, jsonParam, templateId){

	var t = document.querySelector(templateId);

	for(var i=0; i<jsonParam.length; i++){
	
		if(jsonParam[i].fileType == 'excel'){
			addClass(t.content.querySelector('i'), 'fa');
			addClass(t.content.querySelector('i'), 'fa-file-excel-o');
		}else if(jsonParam[i].fileType == 'word'){
			addClass(t.content.querySelector('i'), 'fa');
			addClass(t.content.querySelector('i'), 'fa-file-word-o');
		}

		t.content.querySelector('.fileName').innerHTML = jsonParam[i].fileName;
		t.content.querySelector('.fileSize').innerHTML = jsonParam[i].fileSize;
		t.content.querySelector('.fileDate').innerHTML = jsonParam[i].fileDate;
		var clone = document.importNode(t.content, true);
		document.querySelector('#fs-sidebar-content-template-area').appendChild(clone);
	}
}
