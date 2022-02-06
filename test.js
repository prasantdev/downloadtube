const ytdl = require('ytdl-core');

let videoID = "https://youtu.be/HRW9W7ZtOEI"

const getInfo = async (videoID) => {
        let info = await ytdl.getInfo(ytdl.getVideoID(videoID));
        let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        console.log('Format found!', info.formats);
}
const getVideoID = async (videoID) => {
        let id = ytdl.getVideoID(videoID);
        // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        console.log('Format found!', id);
}
getInfo(videoID);

// ytdl.getVideoID(videoID).then(console.log);
// getVideoID(videoID);