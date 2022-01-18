const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
app.use('/static', express.static('./static'));

const PORT = process.env.PORT || 3000;

app.use(cors());    
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' });
});

app.get('/download', (req, res) => {
    var url = req.query.url;
    let formatDownload = req.query.format;
    if (formatDownload.toLowerCase() === 'mp3') {
        // cons
        res.setHeader('Content-disposition', 'attachment; filename=prasant_music.mp3');
        ytdl(url, {
            filter: 'audioonly',
            format: 'mp3'
        })
            .pipe(res);
    } else {
        res.header("Content-Disposition", 'attachment;  filename="prasant_video.mp4');
        ytdl(url, { format: 'mp4' }).pipe(res);
    }

});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});