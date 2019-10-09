import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { TrackInput } from 'src/components/TrackInput';
import { ITrackRow, subStringToTrackData, trackDataToSubString, CLIPS_URL } from 'src/helpers';

const H1 = styled.h1`
  font-size: 3rem;
`;

const View: NextPage = () => {
  const { query, route, asPath, replace } = useRouter();
  const [time, setTime] = useState(0);
  const [subTrackState, setSubTrackState] = useState<ITrackRow[]>([]);
  const [subText, setSubText] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);

  const { clip, sub } = query;
  const subSource = subText ? `data:text/vtt;charset=utf-8;base64,${subText}` : '';
  const videoSource = clip ? `${CLIPS_URL}${clip}` : '';
  const videoElement = useRef<HTMLVideoElement>(null);

  // Refresh the video as SSR version gets undefined clip name
  useEffect(() => (videoElement.current as HTMLVideoElement).load(), [videoElement, clip]);

  // Refresh subTrack state after async load of query param
  useEffect(() => {
    if (!initialLoad && typeof sub === 'string' && sub !== '') {
      setInitialLoad(true);
      setSubTrackState(subStringToTrackData(sub.replace(/ /g, '+')));
    }
  }, [sub]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep subString and URL up to date with changes to subTrack
  useEffect(() => {
    if (!initialLoad && typeof clip === 'string') {
      setInitialLoad(true);
    }
    if (initialLoad && clip !== '') {
      const subString = trackDataToSubString(subTrackState);
      setSubText(subString);
      const newRoute = `${route}?clip=${clip}&sub=${subString}`;
      if (asPath !== newRoute) replace(newRoute);
    }
  }, [subTrackState]); // eslint-disable-line

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
    if (target === 'startTime') {
      // Possible need to reorder tracks
      if (
        (rowIndex > 0 && updatedTrack.startTime < updatedRows[rowIndex - 1].startTime) ||
        (rowIndex < updatedRows.length - 1 &&
          updatedTrack.startTime > updatedRows[rowIndex + 1].startTime)
      ) {
        updatedRows.sort((a, b) => a.startTime - b.startTime);
      }
    }
    setSubTrackState(updatedRows);
  };

  const getTimestamp = () => {
    if (videoElement.current) setTime(videoElement.current.currentTime);
  };

  /** Adds a new row after the current last one */
  const addRow = () => {
    const lastRow = subTrackState[subTrackState.length - 1];
    const newRow: ITrackRow = {
      id: `${lastRow && lastRow.endTime + 0.001}id`,
      startTime: lastRow ? lastRow.endTime + 0.001 : 0,
      endTime: lastRow ? lastRow.endTime + 1 : 1,
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
      <video controls ref={videoElement}>
        <source src={videoSource} type="video/mp4" />
        <track label="English" kind="subtitles" src={subSource} default />
      </video>
      <p>{time}</p>
      <button type="button" onClick={getTimestamp}>
        Get timestamp
      </button>
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
