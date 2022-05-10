const canvas = document.querySelector('#jsCanvas');
const colors = document.getElementsByClassName('jsColor');
const size = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');

const CANVAS_SIZE = 700;

const ctx = canvas.getContext('2d');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;
ctx.fillStyle = '#2c2c2c';

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //그림을 시작하기 전에 현재 내 마우스의 위치를 시작 지점으로 설정함
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { // 그림을 시작하면 x,y 까지 라인을 그리기 시작함
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}


// 컬러 선택
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//paint 모드일 때 선의 굵기 선택
function handleSizeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

//paint모드와 fill 모드 전환
function handleModeClick() {
    if (filling === true) {
        filling = false
        mode.innerText = 'fill'
    } else {
        filling = true;
        mode.innerText = 'Paint'
    }
}

// fill 모드일때 캔버스를 클릭하면 전체 색칠
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

// 캔버스 우클릭 시 메뉴 팝업 숨기기
function handleCM (event) {
    event.preventDefault()
}

// 저장 버튼 눌렀을 때 저장되게 하기
function handleSaveBtn(){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href=image;
    link.download='myDrawing.jpeg';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove); // 캔버스에 마우스를 대고 움직였을 때 좌표값 가져오기
    canvas.addEventListener('mousedown', startPainting); // 마우스를 드래그할 때 페인팅 시작
    canvas.addEventListener('mouseup', stopPainting); // 마우스 드래그를 멈췄을 때 페인팅 멈춤
    canvas.addEventListener('mouseleave', stopPainting); // 캔버스 밖으로 빠져나갔을 때 페인팅 멈춤
    canvas.addEventListener('click', handleCanvasClick); // 캔버스 채우기
    canvas.addEventListener('contextmenu', handleCM) // 우클릭 팝업 메뉴 숨기기
}

// 선택할 수 있는 컬러값을 array로 가져와서 background-color 속성을 가져옴
Array.from(colors).map(color => {
    color.addEventListener('click', handleColorClick)
})

jsRange.addEventListener('input', handleSizeChange)
mode.addEventListener('click', handleModeClick)
saveBtn.addEventListener('click', handleSaveBtn)