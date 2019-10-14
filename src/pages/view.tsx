import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { ITrackRow, subStringToTrackData, trackDataToSubString, CLIPS_URL } from 'src/helpers';

import { TrackInput, TrackRows } from 'src/components/TrackInput';
import { MainContainer } from 'src/components/MainContainer';
import { IShortUrl } from 'src/models';

import {
  H1,
  Video,
  Button,
  OrangeButton,
  OutlineButton,
  EditButtonContainer,
  EditorContainer,
  PublishedLink,
} from 'src/components/Simple';

const View: NextPage = () => {
  const { query, route, asPath, replace } = useRouter();
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!editing);

  const [subTrackState, setSubTrackState] = useState<ITrackRow[]>([]);
  const [subText, setSubText] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  const { clip, sub, short } = query;
  const subSource = subText ? `data:text/vtt;charset=utf-8;base64,${subText}` : '';
  const videoSource = clip ? `${CLIPS_URL}${clip}` : '';
  const videoElement = useRef<HTMLVideoElement>(null);

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
      if (short) setPublishedUrl(`${window.location.origin}/s/${short}`);
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

  /** Callback to be fed into TrackRows */
  const setCurrentAsRowTime = (rowIndex: number, fieldName: 'startTime' | 'endTime') => () => {
    setSubTrackState(
      subTrackState.map((row, i) => {
        if (i === rowIndex && videoElement.current) {
          return { ...row, [fieldName]: videoElement.current.currentTime };
        }
        return row;
      }),
    );
  };

  /** Callback to be fed into TrackRows */
  const setRowTimeAsCurrent = (rowIndex: number, fieldName: 'startTime' | 'endTime') => () => {
    subTrackState.forEach((row, i) => {
      if (i === rowIndex && videoElement.current) {
        videoElement.current.currentTime = row[fieldName];
      }
    });
  };

  /** Gets a short url from api */
  const publish = async () => {
    const resp = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ long: asPath }),
    });
    const data: IShortUrl = await resp.json();
    setPublishedUrl(`${window.location.origin}/s/${data.short}`);
    setEditing(false);
  };

  return (
    <MainContainer>
      <H1>Mumbai TV {editing ? 'Editor' : 'Theater'}</H1>
      <Video controls ref={videoElement}>
        <source src={videoSource} type="video/mp4" />
        <track label="English" kind="subtitles" src={subSource} default />
      </Video>
      <PublishedLink value={publishedUrl} />
      {editing && (
        <EditorContainer>
          <TrackRows>
            {subTrackState.map((row, i) => (
              <TrackInput
                row={row}
                onChange={trackRowOnChange(i)}
                deleteCallback={deleteRow(i)}
                startAsCurrent={setRowTimeAsCurrent(i, 'startTime')}
                endAsCurrent={setRowTimeAsCurrent(i, 'endTime')}
                currentAsStart={setCurrentAsRowTime(i, 'startTime')}
                currentAsEnd={setCurrentAsRowTime(i, 'endTime')}
                key={row.id}
              />
            ))}
          </TrackRows>
          <Button onClick={addRow} style={{ float: 'left' }}>
            Add row
          </Button>
          <OrangeButton onClick={publish} style={{ float: 'right' }}>
            Publish!
          </OrangeButton>
        </EditorContainer>
      )}
      <EditButtonContainer>
        {editing ? (
          <OutlineButton onClick={toggleEditing}>Close editor</OutlineButton>
        ) : (
          <Button onClick={toggleEditing}>Edit this video!</Button>
        )}
      </EditButtonContainer>
    </MainContainer>
  );
};

export default View;
