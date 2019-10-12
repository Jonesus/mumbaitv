import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ITrackRow, subStringToTrackData, trackDataToSubString, CLIPS_URL } from 'src/helpers';

import { TrackInput } from 'src/components/TrackInput';
import { MainContainer } from 'src/components/MainContainer';
import { IShortUrl } from 'src/models';

import { H1, Video, Button } from 'src/components/Simple';

const View: NextPage = () => {
  const { query, route, asPath, replace } = useRouter();
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!editing);

  const [time, setTime] = useState(0);
  const [subTrackState, setSubTrackState] = useState<ITrackRow[]>([]);
  const [subText, setSubText] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);

  const { clip, sub } = query;
  const subSource = subText ? `data:text/vtt;charset=utf-8;base64,${subText}` : '';
  const videoSource = clip ? `${CLIPS_URL}${clip}` : '';
  const videoElement = useRef<HTMLVideoElement>(null);

  const [publishedUrl, setPublishedUrl] = useState('');

  // Refresh the video as SSR version gets undefined clip name
  useEffect(() => {
    const video = videoElement.current as HTMLVideoElement;
    video.load();
    setTimeout(() => {
      video.textTracks[0].mode = 'hidden';
      video.textTracks[0].mode = 'showing';
    }, 50);
  }, [videoElement, clip]);

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

  const publish = async () => {
    const resp = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ long: asPath }),
    });
    const data: IShortUrl = await resp.json();
    setPublishedUrl(`${window.location.origin}/s/${data.short}`);
  };

  const copyToClipboard = () => {
    const copyText = document.getElementById('publishedUrl') as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
  };

  return (
    <MainContainer>
      {editing ? <H1>Edit a video</H1> : <H1>Mumbai TV Theater</H1>}
      <Video controls ref={videoElement}>
        <source src={videoSource} type="video/mp4" />
        <track label="English" kind="subtitles" src={subSource} default />
      </Video>
      <Button filled onClick={toggleEditing}>
        Edit this video!
      </Button>
      {editing && (
        <>
          <button type="button" onClick={publish}>
            Publish!
          </button>
          {publishedUrl !== '' && (
            <>
              <input type="text" value={publishedUrl} readOnly id="publishedUrl" />
              <button type="button" onClick={copyToClipboard}>
                copy to clipboard
              </button>
            </>
          )}
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
      )}
    </MainContainer>
  );
};

export default View;
