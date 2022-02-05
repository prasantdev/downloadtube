const ytdl = require('ytdl-core');

let videoID = "HRW9W7ZtOEI"

const getInfo = async (videoID) => {
        let info = await ytdl.getInfo(videoID);
        let format = ytdl.chooseFormat(info.formats, { quality: '134' });
        console.log('Format found!', format);
}
getInfo(videoID);