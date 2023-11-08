const canvas = document.getElementById("canvas");
const lineWidth = document.getElementById("line-width");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const btnMode = document.getElementById("btnMode");
const btnInit = document.getElementById("btnInit");
const btnEraser = document.getElementById("btnEraser");
let canvasBgColor = "";
const inputFile = document.getElementById("file");
const inputText = document.getElementById("text");

const btnSave = document.getElementById("save");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

//flag 변수
let isPainting = false;
let isFilling = false;


/**
 * 캔버스에 선을 그리는 함수
 */
function onMouseMove(event){

    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

/**
 * mouse버튼이 내려갈 때
 */
function onMouseDown(event){
    isPainting = true;
}

/**
 * 그리기를 취소한다.
 * 선을 그릴 때마다 선 색깔을 바꾼다.
 */
function cancelPainting(event){
    isPainting = false;
    ctx.beginPath();

}

/**
 * 선의 두께를 변경한다.
 */
function onChangeLineWidth(event){
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

/**
 * 색을 변경한다.
 */
function onClickColor(event){
    //console.dir(event);
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    if (isFilling){
        canvasBgColor = colorValue;
    }
    // console.log(colorValue);
    // console.log(canvasBgColor);
}

/**
 * 모드를 변경한다.
 * 채우기면 그리기로
 * 그리기면 채우기로
 */
function onMode(){
    //isFilling true
    if (isFilling){
        isFilling = false;
        btnMode.innerText = "채우기";
    }else {    //isFilling false
        isFilling = true;
        btnMode.innerText = "그리기";
    }
}

/**
 * 캔버스를 선택한 색깔로 채운다
 */
function onClickCanvas(event){
    //console.log("onClickCanvas", event);
    //isFilling true
    if (isFilling) {
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
    
}

/** 
 * 캔버스를 초기화한다. 
*/
function onClickInit(){
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * 그린 그림을 지운다.
 */
function onClickEraser(event){
    //console.dir(event);
    //ctx.strokeStyle = "white";
    ctx.strokeStyle = canvasBgColor;
    isFilling = false;
    btnMode.innerText = "채우기"

}

/**
 * 선택한 이미지 파일을 그림판에 추가한다.
 */
function onChangeFile(event){
    console.log(event);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url ;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        //drawImage(image, dx, dy, dWidth, dHeight)
        // inputFile.value = null;
    };

}

/**
 * 캔버스를 더블클릭했을 때 실행하는 함수
 * 사용자가 입력한 텍스트를 캔버스에 표시한다.
 */
function onDoubleClick(event){
    // console.dir(event);
    const text = inputText.value;
    if (text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "60px 'consolas'";
        ctx.strokeText(text, event.offsetX, event.offsetY);
        // ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function saveImage(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

btnSave.addEventListener("click", saveImage);

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onClickCanvas);
lineWidth.addEventListener("change", onChangeLineWidth);

colorOptions.forEach((color) =>
    color.addEventListener("click", onClickColor));

btnMode.addEventListener("click", onMode);

btnInit.addEventListener("click", onClickInit);

btnEraser.addEventListener("click", onClickEraser);

inputFile.addEventListener("change", onChangeFile);
canvas.addEventListener("dblclick", onDoubleClick);

