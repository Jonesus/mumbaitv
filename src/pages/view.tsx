import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { TrackInput } from 'src/components/TrackInput';
import {
  ITrackRow,
  subStringToTrackData,
  videoTimeToSubTime,
  trackDataToSubString,
} from 'src/helpers';

const H1 = styled.h1`
  font-size: 3rem;
`;

const View: NextPage = () => {
  const { query } = useRouter();
  const [time, setTime] = useState(0);
  const [subTrackState, setSubTrackState] = useState<ITrackRow[]>([]);
  const [subText, setSubText] = useState('');

  const { clip, sub } = query;
  const subSource = subText ? `data:text/vtt;charset=utf-8;base64,${subText}` : '';
  const videoSource = clip ? `/static/clips/${clip}.mp4` : '';
  const videoElement = useRef<HTMLVideoElement>(null);

  // Refresh the video as SSR version gets undefined clip name
  useEffect(() => (videoElement.current as HTMLVideoElement).load(), [videoElement]);

  // Refresh subTrack state after async load of query param
  useEffect(() => {
    if (typeof sub === 'string') setSubTrackState(subStringToTrackData(sub));
  }, [sub]);

  // Keep subString up to date with changes to subTrack
  useEffect(() => {
    const subString = trackDataToSubString(subTrackState);
    setSubText(subString);
  }, [subTrackState]);

  /** Updates the internal data structure containing the rows of sub texts */
  const trackRowOnChange = (rowIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get updated value
    const currentTrack = subTrackState[rowIndex];
    const target = e.currentTarget.name;
    const value =
      e.currentTarget.type === 'number' ? parseFloat(e.currentTarget.value) : e.currentTarget.value;
    // Update track object
    const updatedTrack = { ...currentTrack, [target]: value };
    // Replace old one in state
    const updatedRows = subTrackState.map((row, i) => (i === rowIndex ? updatedTrack : row));
    setSubTrackState(updatedRows);
  };

  const getTimestamp = () => {
    if (videoElement.current) setTime(videoElement.current.currentTime);
  };

  /** Adds a new row after the current last one */
  const addRow = () => {
    const lastRow = subTrackState[subTrackState.length - 1];
    const newRow: ITrackRow = {
      id: `${lastRow.endTime + 0.001}id`,
      startTime: lastRow.endTime + 0.001,
      endTime: lastRow.endTime + 1,
      text: '',
    };
    setSubTrackState([...subTrackState, newRow]);
  };

  /** Deletes a row */
  const deleteRow = (rowIndex: number) => () => {
    setSubTrackState(subTrackState.filter((_, i) => i !== rowIndex));
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
      <ol>
        {subTrackState.map((row, i) => (
          <TrackInput
            row={row}
            onChange={trackRowOnChange(i)}
            deleteCallback={deleteRow(i)}
            key={row.id}
          />
        ))}
      </ol>
      <button type="button" onClick={addRow}>
        Add row
      </button>
    </>
  );
};

export default View;
