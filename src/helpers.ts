import base64 from 'base-64';

export const CLIPS_URL = 'https://inkubaattori.aalto.fi/mumbaitv/';

export interface ITrackRow {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

const pad = (num: number, size: number) => `000${num}`.slice(size * -1);

export const videoTimeToSubTime = (timeInSeconds: number) => {
  const time = parseFloat(timeInSeconds.toFixed(3));
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  const milliseconds = time.toFixed(3).slice(-3);
  const strTime = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${milliseconds}`;
  return strTime;
};

export const subTimeToVideoTime = (subTime: string) => {
  const parts = subTime.split(':');
  const hoursAsSeconds = parseFloat(parts[0]) * 60 * 60;
  const minutesAsSeconds = parseFloat(parts[1]) * 60;
  const seconds = parseFloat(parts[2]);
  return hoursAsSeconds + minutesAsSeconds + seconds;
};

export const subStringToTrackData = (sub: string): ITrackRow[] => {
  const decodedSub = base64.decode(sub);
  const subArray = decodedSub.split('\n\n');
  if (subArray[0] !== 'WEBVTT') {
    throw new Error('wtf boi');
  }
  if (subArray.length === 2 && subArray[1] === '') return [];
  const subLines = subArray.slice(1);
  return subLines.map(line => {
    const subPartStrings = line.split('\n');
    const subParts = subPartStrings[0].includes(':') ? subPartStrings : subPartStrings.slice(1);
    const [startTime, endTime] = subParts[0].split(' --> ').map(subTimeToVideoTime);
    const text = subParts.slice(1).join('\n');
    return { id: `${startTime}${text}`, startTime, endTime, text };
  });
};

export const trackDataToSubString = (track: ITrackRow[]): string => {
  const rowStrings = track.map(
    row =>
      `${videoTimeToSubTime(row.startTime)} --> ${videoTimeToSubTime(row.endTime)}\n${row.text}`,
  );
  return base64.encode(`WEBVTT\n\n${rowStrings.join('\n\n')}`);
};
