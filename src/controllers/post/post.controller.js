const fs = require('fs');

const create = (request, response) => {
    const { title, description } = JSON.parse(request.body.info);
    return response.json({ url: `http://localhost:3333/post/${request.file.filename}`, title, description})
};

const read = (request, response) => {
    const filePath = uploads + "/" + request.params.audio_id;
    var stat = fs.statSync(filePath);
    var total = stat.size;

    if (request.headers.range) {
        var range = request.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];
        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        var readStream = fs.createReadStream(filePath, { start: start, end: end });
        response.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'audio/mp3'
        });
        readStream.pipe(response);
    } else {
        response.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mp3' });
        fs.createReadStream(filePath).pipe(response);
    }
};

module.exports = { create, read }