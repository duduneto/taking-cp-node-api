const fs = require('fs');
const { Posts } = require('../../models')

const create = async (request, response) => {
    const json_info = JSON.parse(request.body.info);
    const createdPost = await Posts.create({
        title: json_info.title,
        description: json_info.description,
        uri: `http://localhost:3333/post/${request.file.filename}`
    })
    // ...
    return response.json(createdPost)
};

const read = (request, response) => {
    const filePath = post_uploads_dir + "/" + request.params.audio_id;
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

const list = async (request, response) => {
    try {
        
        const posts = await Posts.findAll();
    
        return response.json(posts)
    } catch (error) {
        console.log('Posts List => ', error)
        return response.status(500).json({error: true, errorMessage: error.message})        
    }

}

module.exports = { create, read, list }