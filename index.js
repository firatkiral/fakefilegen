const input = document.getElementById('mb-input');
const suffix = document.getElementById('suffix');

input.addEventListener('input', updateSuffix);

function updateSuffix() {
    if (input.value !== "") {
        suffix.style.display = 'block';
        const width = getTextWidth(input.value || "0", '1rem arial');
        suffix.style.left = width + 16 + 'px';   
    }else{
        suffix.style.display = 'none';
    }
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

function setRandomInput(){
    input.value = Math.ceil(Math.random() * 50);
    updateSuffix();
}

const randomArray = new Uint8Array(1000000);
for (let j = 0; j < randomArray.length; j++) {
    randomArray[j] = Math.floor(Math.random() * 256);
}

function generateFakeFile() {
    const sizeInMb = +input.value;
    const chunks = [];

    for (let i = 0; i < sizeInMb; i++) {
        const arr = new Uint8Array(i % 4 == 0 ? new Uint8Array(1000000) : randomArray); // .75 compression ratio
        chunks.push(arr);
    }
    const blob = new Blob(chunks, { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${sizeInMb}mb.dat`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}