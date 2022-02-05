const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
// app.use('/static', express.static('./static'));
app.use(express.static('./static'));

const PORT = process.env.PORT || 3000;

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/download', (req, res) => {
    var url = req.query.url;
    let id = ytdl.getVideoID(url);
    let format = ytdl.chooseFormat(ytdl.getInfo(id).formats, { quality: '134' });
    let formatDownload = req.query.format || 'mp4';
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
    let formatDownload = req.query.format || 'mp4';
    let qualityDownload = req.query.quality || '18';
    if (formatDownload.toLowerCase() === 'mp3') {
        // cons
        // res.setHeader('Content-disposition', 'attachment; filename=prasant_music.mp3');
        res.setHeader('Content-Type', 'audio/mp3');
        ytdl(url, {
            filter: 'audioonly',
            format: 'mp3'
        })
            .pipe(res);
    } else {
        // res.header("Content-Disposition", 'attachment;  filename="prasant_video.mp4');
        res.setHeader('Content-Type', 'video/mp4');
        ytdl(url, { format: 'mp4' }).pipe(res);
    }

});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});