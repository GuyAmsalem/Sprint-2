'use stricts';
var gKeywords;
var gImgs = createImgs();
var gMeme;

function getMemeForDisplay() {
    return gMeme;
}
function getImgsForDisplay() {
    return gImgs;
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function setMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

function setAlign(direction) {
    console.log(direction);
    gMeme.lines[gMeme.selectedLineIdx].align = direction;
}

function setFontFamily(fontName) {
    console.log(fontName);

    gMeme.lines[gMeme.selectedLineIdx].font = fontName;
}

function addLine(txt) {
    gMeme.selectedLineIdx++;
    let line = {
        txt,
        size: 60,
        font: 'impact',
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white'
    }
    gMeme.lines.push(line);
}

function creareMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Guy Amsalem',
            size: 60,
            font: 'impact',
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            
        }]
    }
}

function createImgs() {
    let images = [];
    images.push(createImg(1, ['tramp']));
    images.push(createImg(2, ['dogs']));
    images.push(createImg(3, ['dog', 'child']));

    return images;
}

function createImg(id, keywords) {
    var image = {
        id,
        src: `../img/meme/${'' + id}.jpg`,
        keywords
    }
    return image;
}