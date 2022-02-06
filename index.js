const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
// app.use('/static', express.static('./static'));
app.use(express.static(__dirname + '/static/'));

const PORT = process.env.PORT || 3000;
// TODO: Add a way to get the video ID from the URL
//! this is Warning

/*
? this is info comment
! Again warning comment
TODO Hmm
*/

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/download', async (req, res) => {
    var url = req.query.url;
    let id;
    try {
        id = ytdl.getVideoID(url);
    } catch (e) {

    }
    // let format = ytdl.chooseFormat(await ytdl.getInfo(id).formats, { quality: '134' });
    let info = await ytdl.getInfo(videoID);
    let format = ytdl.chooseFormat(info.formats, { quality: '134' });

    // let formatDownload = req.query.format || 'mp4';
    if (formatDownload.toLowerCase() === 'mp3') {
        // cons
        res.setHeader('Content-disposition', 'attachment; filename=prasant_music.mp3');
        // res.setHeader('Content-Type', 'audio/mp3');
        ytdl(url, {
            filter: 'audioonly',
            format: 'mp3'
        })
            .pipe(res);
    } else {
        res.setHeader("Content-Disposition", 'attachment;  filename="prasant_video.mp4');
        // res.setHeader('Content-Type', 'video/mp4');
        ytdl(url, { format: 'mp4' }).pipe(res);
    }

});

app.get('/get', (req, res) => {
    var url = req.query.url;
    let id;
    try {
        id = ytdl.getVideoID(url);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL/id' });
    }
    let format = ytdl.chooseFormat(ytdl.getInfo(id).formats, { quality: '134' });
    let formatDownload = req.query.format || 'mp4';
    let qualityDownload = req.query.quality || '18';
    let finalurl = `https://youtu.be/${id}`;
    if (formatDownload.toLowerCase() === 'mp3') {
        // cons
        // res.setHeader('Content-disposition', 'attachment; filename=prasant_music.mp3');
        res.setHeader('Content-Type', 'audio/mp3');
        ytdl(finalurl, {
            filter: 'audioonly',
            format: 'mp3'
        })
            .pipe(res);
    } else {
        // res.header("Content-Disposition", 'attachment;  filename="prasant_video.mp4');
        res.setHeader('Content-Type', 'video/mp4');
        ytdl(finalurl, { format: 'mp4' }).pipe(res);
    }

});

app.get("/formats", async (req, res) => {
    var url = req.query.url;
    let id;
    try {
        id = ytdl.getVideoID(url);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL/id' });
    }
    let info = await ytdl.getInfo(id);
    res.json(info.formats);

})

app.get("/info", async (req, res) => {
    var url = req.query.url;
    let id;
    try {
        id = ytdl.getVideoID(url);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL/id' });
    }
    let info = await ytdl.getInfo(id);
    res.json(info);

})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});