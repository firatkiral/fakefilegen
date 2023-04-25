document.getElementById('mb-input').value = Math.ceil(Math.random() * 20);
function generateFakeFile() {
    const sizeInMb = +document.getElementById('mb-input').value;
    const chunks = [];

    for (let i = 0; i < sizeInMb; i++) {
        chunks.push(new Uint8Array(1000000));
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