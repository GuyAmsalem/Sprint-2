'use stricts';
var gKeywords;
var gImgs = createImgs();
var gMeme;

function getMemeForDisplay(){
    return gMeme;
}
function getImgsForDisplay(){
    return gImgs;
}

function creareMeme(imgId){
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [ { txt: 'Guy Amsalem', size: 20, align: 'left', color: 'red'}]
    }
}

function createImgs(){
    let images = [];
    images.push(createImg(1, ['tramp']));
    images.push(createImg(2, ['dogs'])); 
    images.push(createImg(3, ['dog', 'child'])); 

    return images;
}

function createImg(id, keywords){
    var image = {
        id,
        src: `../img/meme/${''+id}.jpg`,
        keywords
    }
    return image;
}