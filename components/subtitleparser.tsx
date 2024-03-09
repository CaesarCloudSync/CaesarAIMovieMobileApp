import axios from 'axios';
import vttToJson from 'vtt-to-json';
import srtParser2 from "srt-parser-2";
import RNFS from "react-native-fs"
const timeToSeconds = (seconds:any) => {
    const time = seconds.split(':');
    return time[0] && time[1] && time[2]
        ? +time[0] * 60 * 60 + +time[1] * 60 + +time[2]
        : 0;
};


const subtitleParser = async (subitleUrl:any) => {
    const subtitleData = await RNFS.readFile(subitleUrl);
    const subtitleType = "srt"//subitleUrl.split('.')[subitleUrl.split('.').length - 1];
    const result:any = [];
    if (subtitleType === 'srt') {
        const parser = new srtParser2();
        const parsedSubtitle = parser.fromSrt(subtitleData);
        parsedSubtitle.forEach(({ startTime, endTime, text }) => {
            result.push({
                start: timeToSeconds(startTime.split(',')[0]),
                end: timeToSeconds(endTime.split(',')[0]),
                part: text,
            });
        });
    }
    /*
    if (subtitleType === 'vtt') {
        const parsedSubtitle = await vttToJson(subtitleData);
        parsedSubtitle.forEach(({ start, end, part }:any) => {
            // For some reason this library adds the index of the subtitle at the end of the part, so we cut it
            result.push({
                start: start / 1000,
                end: end / 1000,
                part: part.slice(0, part.length - part.split(' ')[part.split(' ').length - 1].length),
            });
        });
    }*/
    return result;
};
export default subtitleParser;
