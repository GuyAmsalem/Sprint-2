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
    let lines = meme.lines;
    let line = lines[meme.selectedLineIdx]
    // renderMemeImg(meme.selectedImgId);
    console.log(line.txt, line.size, line.align, line.color);
    
    drawText(line.txt, line.size, line.align, line.color);


}
function drawText(text, size, align, color , x=50, y=50) {
    gCtx.font = `${size + 'px'} impact`
    gCtx.textAlign = align;
    gCtx.strokeStyle = color;
    gCtx.fillText(text, x, y);

}

function renderMemeImg(imgId){
    const img = new Image();
    img.src = `../img/meme/${imgId}.jpg`;
    img.onload = () => gCtx.drawImage(img, 0, 0);
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