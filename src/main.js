//Fetch the items from the JSON file (fetch: 동적으로 받아온다)
function loadItems() {
    return fetch('data/data.json')  //경로를 지정하면 간단하게 데이터 받아온다
    .then(response => response.json())  //성공하면, response 객체 전달해준다 //resopnse의 API인 .json() 이용해서 response 바디를 json의 object로 변환한다
    .then(json => json.items);  //json의 items 데이터들만 전달된다
}

//Update the list with given items
function displayItems(items) {  //받아온 items 데이터를 html 요소로 변환해서 페이지에 표시
    const container = document.querySelector('.items');  //items의 변수 설정
    container.innerHTML = items.map(item => createHTMLString(item)).join('');  //각각 데이터를 html의 li태그로 변환 //map(): 한가지 배열을 다른 배열로 변환
}  //.map()만 하면 단순한 배열이다 -> .join()을 하면 한가지의 큰 문자열로 만들 수 있다 = li들이 계속 반복해서 들어가 있는 문자열

//Create HTML list item from the given data item
function createHTMLString(item) {  //``: 문자열 반환할때 사용
    return `  
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>        
    `;  //문자열의 부분은 json파일의 데이터에서 가져와서 다르게 표기한다
}

//Handle button click (화면에서 버튼 클릭하면 data-key, data-value값 출력된다)
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key; //event 안에 target 안에 dataset 안에 key
    const value =dataset.value;

    if(key == null || value == null) {  //필터링할 정보가 들어있지 않다면
        return;  //빨리 함수를 끝낸다
    }

    displayItems(items.filter(item => item[key] === value))  //key와 value 둘다 들어있다면, displayItems()이용해서 해당 데이터의 key와 value만 보여지게 한다
            //filter(): 배열에서 특정한 데이터만 다시 추출해서 새로운 작은 배열 만든다
            //item에 있는 key에 해당하는 값 === value 같을 때만! 골라서 displayItems로 전달
    
    //const filtered = items.filter(item => item[key] === value);
    //console.log(filtered);  //이렇게 콘솔에 확인하면서 하면 어려운 코드 짤때 좋다!!
    //displayItems(filtered);  //버튼 클릭하면 화면에 필터링된 아이템만 보여진다
    
            //이 코드의 문제점: 클릭할때마다 요소들 만들어서 container.innerHTML에 업데이트한다
            //개선 방법: 전체적인 리스트 유지하면서, 클릭했을때 해당하는 요소를 class를 visible추가해서 display한다, 비해당 요소는 display:none 한다
            //main-filtering.js에서 개선 코드를 만든다
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');  //이벤트의 위임: 이벤트들이 들어있는 container에 이벤트를 등록, 한곳에서만 핸들링 할 수 있게 한다
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));  //로고 선택되면 모든 아이템이 보여진다, 전에 만든 함수 사용
    buttons.addEventListener('click', event => onButtonClick(event, items));  //버튼 클릭하면 이벤트 처리한다, 이벤트가 발생한 event 인자로 전달, items도 인자로 전달
}



//main (함수 호출 먼저 만들기)
loadItems() //JSON에 있는 데이터를 동적으로 받아와서 items 전달해 준다, 시간이 걸리기 때문에 Promise를 리턴한다
.then(items => { //Promise 성공적으로 되면, items 받아온다
  console.log(items);  //items 배열 자체만 출력
    displayItems(items); //아이템들을 HTML에 보여준다
    setEventListeners(items); //버튼 누르면 필터링하는 함수
})
  .catch(console.log); //실패하면, 에러 메서지 보여준다


















