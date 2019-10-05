import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import base64 from 'base-64';

interface ITrackRow {
  startTime: number;
  endTime: number;
  text: string;
}

type ITrackData = ITrackRow[];

const H1 = styled.h1`
  font-size: 3rem;
`;

const pad = (num: number, size: number) => `000${num}`.slice(size * -1);

const videoTimeToSubTime = (timeInSeconds: number) => {
  const time = parseFloat(timeInSeconds.toFixed(3));
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  const milliseconds = time.toFixed(3).slice(-3);
  const strTime = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${milliseconds}`;
  return strTime;
};

const subTimeToVideoTime = (subTime: string) => {
  const parts = subTime.split(':');
  const hoursAsSeconds = parseFloat(parts[0]) * 60 * 60;
  const minutesAsSeconds = parseFloat(parts[1]) * 60;
  const seconds = parseFloat(parts[2]);
  return hoursAsSeconds + minutesAsSeconds + seconds;
};

const subStringToTrackData = (sub: string): ITrackData => {
  const decodedSub = base64.decode(sub);
  const subArray = decodedSub.split('\n\n');
  if (subArray[0] !== 'WEBVTT') {
    throw new Error('wtf boi');
  }
  const subLines = subArray.slice(1);
  return subLines.map(line => {
    const subPartStrings = line.split('\n');
    const subParts = subPartStrings[0].includes(':') ? subPartStrings : subPartStrings.slice(1);
    const [startTime, endTime] = subParts[0].split(' --> ').map(subTimeToVideoTime);
    const text = subParts.slice(1).join('\n');
    return { startTime, endTime, text };
  });
};

const View: React.FC = () => {
  const { query } = useRouter();
  const [time, setTime] = useState(0);
  // const [subTrack, setSubTrack] = useState<ITrackData>([]);

  const { clip, sub } = query;
  const subSource = sub ? `data:text/vtt;charset=utf-8;base64,${sub}` : '';
  const videoSource = clip ? `/static/clips/${clip}.mp4` : '';
  const videoElement = useRef<HTMLVideoElement>(null);

  if (typeof sub === 'string') console.log(subStringToTrackData(sub));

  // Refresh the video as SSR version gets undefined clip name
  useEffect(() => {
    const timer = setTimeout(() => {
      (videoElement.current as HTMLVideoElement).load();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [videoSource]);

  const getTimestamp = () => {
    if (videoElement.current) setTime(videoElement.current.currentTime);
  };

  return (
    <>
      <H1>Edit a video</H1>
      <p>Go edit now pls</p>
      <p>Query params: {JSON.stringify(query)}</p>
      <button type="button" onClick={getTimestamp}>
        Get timestamp
      </button>
      <p>{videoTimeToSubTime(time)}</p>
      <video controls ref={videoElement}>
        <source src={videoSource} type="video/mp4" />
        <track label="English" kind="subtitles" src={subSource} default />
      </video>
    </>
  );
};

export default View;
