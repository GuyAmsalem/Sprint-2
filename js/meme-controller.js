'use stricts';
var gCanvas;
var gCtx;


function onInit() {
    renderGallery();
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function onImgClicked(imgId) {
    creareMeme(imgId);
    showEditor();
    renderMeme();
}

function showEditor() {
    let elGallery = document.querySelector('.main-container');
    let elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
    elEditor.style.display = 'grid';
}

function renderMeme() {
    let meme = getMemeForDisplay();
    const img = new Image();
    img.src = `../img/meme/${meme.selectedImgId}.jpg`;
    let lines = meme.lines;
    img.onload = (lines) => {
        gCtx.drawImage(img, 0, 0);
        lines.forEach(line => {
            drawText(line.txt, line.size, line.align, line.strokeColor, line.fillColor, line.font, meme.selectedLineIdx)
        });
    }
}

function drawText(text, size, align, strokeColor, fillColor, font, selectedLineIdx ) {
    let x = gCanvas.width / 2;
    let y = (selectedLineIdx = 0)? 60 : (selectedLineIdx = 1)? gCanvas.heigth - 60 : gCanvas.heigth / 2;
    gCtx.font = `${size}px ${font}`
    gCtx.lineWidth = 1;
    gCtx.fillStyle = fillColor;
    gCtx.strokeStyle = strokeColor;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onAddLine(txt) {
    addLine(txt);
    renderMeme();
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'My-Canvas';
}

function onSetFontFamily(fontName) {
    console.log(fontName);

    setFontFamily(fontName);
    renderMeme();
}

function onSetFontSize(val) {
    setFontSize(val);
    renderMeme();
}

function onSetStrokeColor(color) {
    setStrokeColor(color);
    renderMeme();
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