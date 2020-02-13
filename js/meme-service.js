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

function getLinesForDisplay() {
    return gMeme.lines;
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function setMemeText(txt) {
    if (gMeme.lines.length === 0){
        let imgId = gMeme.selectedImgId;
        createMeme(imgId);
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

function setAlign(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction;
}

function setLinePos(offsetX, offsetY, lineIdx){
    gMeme.lines[lineIdx].x = offsetX;
    gMeme.lines[lineIdx].y = offsetY;
}

function setFontFamily(fontName) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontName;
}

function moveLine(val){
    gMeme.lines[gMeme.selectedLineIdx].y += val ;
}

function deleteLine() {
    if (gMeme.lines.length === 0) return;
    let lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx > gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
}

function switchLine(){
    if (gMeme.lines.length <= 1) return;

    if (gMeme.selectedLineIdx === gMeme.lines.length-1){
        gMeme.selectedLineIdx = 0;        
    } else{
        gMeme.selectedLineIdx++
    }
}

function addLine(txt) {
    if (gMeme.lines.length >  0) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 0;

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

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'On Building..',
            size: 60,
            font: 'impact',
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            x: null,
            y: null
        }]
    }
}

function createImgs() {
    let images = [];
    images.push(createImg(1, ['tramp']));
    images.push(createImg(2, ['dogs']));
    images.push(createImg(3, ['dog', 'child']));
    images.push(createImg(4, []));
    images.push(createImg(5, []));
    images.push(createImg(6, []));
    images.push(createImg(7, []));
    images.push(createImg(8, []));
    images.push(createImg(9, []));
    images.push(createImg(10, []));
    images.push(createImg(11, []));
    images.push(createImg(12, []));
    images.push(createImg(13, []));
    images.push(createImg(14, []));
    images.push(createImg(15, []));

    return images;
}

function createImg(id, keywords) {
    var image = {
        id,
        src: `img/meme/${'' + id}.jpg`,
        keywords
    }
    return image;
}