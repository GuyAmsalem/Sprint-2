'use stricts';
var gCanvas;
var gCtx;


function onInit() {
    renderGallery();
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    if (window.innerWidth > 960) return;
    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerWidth / 2;
}

function onImgClicked(imgId) {
    createMeme(imgId);
    showEditor();
    renderMeme();
}

function showEditor() {
    let elGallery = document.querySelector('.main-container');
    let elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
    elEditor.style.display = 'grid';
}

function hideEditor() {
    let elGallery = document.querySelector('.main-container');
    let elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'grid';
    elEditor.style.display = 'none';
}

function renderMeme() {
    let meme = getMemeForDisplay();
    const memeImg = new Image();
    memeImg.src = `img/meme/${meme.selectedImgId}.jpg`;
    if (window.innerWidth < 650) {
        gCanvas.height = window.innerWidth - 50;
        gCanvas.width = window.innerWidth - 50;
        console.log('gCanvas.height', gCanvas.height);

    }
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        drawLines();
        drawFocusRect();
    }
}

// function drawFocusRect(){
//     let line = getSelectedLine();
//     let txtWidth = getTextWidth(line.txt, `${line.size}px ${line.font}` );
//     console.log(txtWidth);
//     let yStart = line.y - line.size +5;
//     let xStart;
//     if (line.align === 'right'){
//         xStart = line.x - 5;  
//     } else if (line.align === 'center'){
//         xStart = line.x - (txtWidth / 2) -5;
//     } else {
//         xStart = gCanvas.width - txtWidth -5
//     }
//     let width = txtWidth + 10;
//     let height = line.size + 5;
//     gCtx.rect(xStart, yStart, width, height);
//     gCtx.strokeStyle = 'black';
//     gCtx.stroke() ;
// }

function drawLines() {
    let lines = getLinesForDisplay();
    let selectedLineIdx = getSelectedLineIdx();
    lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.align, line.strokeColor,
            line.fillColor, line.font, idx, line.x, line.y);
    });
}

function drawText(text, size, align, strokeColor, fillColor, font, lineIdx, offsetX, offsetY) {
    if (!offsetX || !offsetY) {
        offsetY = (lineIdx === 0) ? 60 : (lineIdx === 1) ? gCanvas.height - 60 : gCanvas.height / 2;
    }
    let txtWidth = getTextWidth(font, size);
    offsetX = (align === 'center') ? gCanvas.width / 2 : (align === 'left') ? 20 : gCanvas.width - txtWidth + 10;
    setLinePos(offsetX, offsetY, lineIdx);

    gCtx.font = `${size}px ${font}`;
    gCtx.lineWidth = 1;
    gCtx.fillStyle = fillColor;
    gCtx.strokeStyle = strokeColor;
    gCtx.textAlign = align;
    gCtx.fillText(text, offsetX, offsetY);
    gCtx.strokeText(text, offsetX, offsetY);
    console.log('offsetX', offsetX, 'offsetY ',offsetY);
    
}

function resetInputLine() {
    let elInput = document.querySelector('.meme-txt');
    let lineTxt = getSelectedLineTxt();
    elInput.value = (lineTxt === 'New Line' || lineTxt === 'Enter some text' ) ? '' : lineTxt;
}

function onSwitchLine() {
    switchLine();
    resetInputLine();
    renderMeme();
}

function onMoveLine(val) {
    moveLine(val);
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function onAddLine() {
    let lineTxt = 'New Line';
    addLine(lineTxt);
    resetInputLine();
    renderMeme();
}

function clickOnDownload(){
    document.querySelector('.download-link').click();
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'My-Canvas';
}

function onSetFontFamily(fontName) {
    setFontFamily(fontName);
    renderMeme();
}

function onSetFontSize(val) {
    setFontSize(val);
    renderMeme();
}

function clickOnStroke(){
    document.querySelector('.stroke-color').click();
}

function onSetStrokeColor(color) {
    setStrokeColor(color);
    renderMeme();
}

function clickOnFill(){
    document.querySelector('.fill-color').click();
}

function onSetFillColor(color) {
    setFillColor(color);
    renderMeme();
}

function onSetText(txt) {
    setMemeText(txt);
    renderMeme();
}

function onSetAlign(direction) {
    setAlign(direction);
    renderMeme();
}

function renderGallery() {
    let images = getImgsForDisplay();
    let strHTMLS = images.map(image => {
        return `
        <img class="meme-img" onclick="onImgClicked(${image.id})" src="${image.src}">
        `
    });
    var elGallery = document.querySelector('.main-container');
    elGallery.innerHTML = strHTMLS.join('');
}

function getTextWidth(text, font) {
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    let context = canvas.getContext('2d');
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}