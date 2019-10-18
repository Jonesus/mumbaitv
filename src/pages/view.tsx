import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  ITrackRow,
  subStringToTrackData,
  trackDataToSubString,
  CLIPS_URL,
  SITE_URL,
} from 'src/helpers';
import { IShortUrl } from 'src/models';

import { TrackInput, TrackRows } from 'src/components/TrackInput';
import { MainContainer } from 'src/components/MainContainer';
import {
  H1,
  Video,
  Button,
  OrangeButton,
  OutlineButton,
  EditButtonContainer,
  EditorContainer,
  PublishedLink,
  TitleInput,
  LastRow,
} from 'src/components/Simple';
import { Meta } from 'src/components/Meta';
import { Back } from 'src/components/BackButton';

const View: NextPage = () => {
  const { query, route, asPath, replace } = useRouter();
  const { clip, sub, short } = query;
  const urlParams = new URLSearchParams(asPath);
  const title = urlParams.get('title');

  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!editing);

  const initialTrackState =
    typeof sub === 'string' ? subStringToTrackData(sub.replace(/ /g, '+')) : [];
  const [subTrackState, setSubTrackState] = useState<ITrackRow[]>(initialTrackState);

  const initialSubText = typeof sub === 'string' ? sub.replace(/ /g, '+') : '';
  const [subText, setSubText] = useState(initialSubText);

  const initialPublished = short ? `${SITE_URL}/s/${short}` : '';
  const [publishedUrl, setPublishedUrl] = useState(initialPublished);

  const [titleState, setTitleState] = useState('');
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTitleState(e.currentTarget.value);

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

  /** Updates the internal data structure containing the rows of sub texts */
  const trackRowOnChange = (rowIndex: number) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (publishedUrl !== '') setPublishedUrl('');
    // Get updated value
    const currentTrack = subTrackState[rowIndex];
    const target = e.currentTarget.name;
    const value =
      e.currentTarget.type === 'number' ? parseFloat(e.currentTarget.value) : e.currentTarget.value;
    // Update track object
    const updatedTrack = { ...currentTrack, [target]: value };
    // Replace old one in state
    const updatedRows = subTrackState.map((row, i) => (i === rowIndex ? updatedTrack : row));
    const subString = trackDataToSubString(updatedRows);
    setSubText(subString);
    setSubTrackState(updatedRows);
  };

  /** Update url bar whenever an input loses focus */
  const onBlur = () => {
    const subString = trackDataToSubString(subTrackState);
    const newRoute = `${route}?clip=${clip}&sub=${subString}`;
    if (asPath !== newRoute) replace(newRoute);
  };

  /** Reorder track rows whenever startTime gets changed */
  const reorderIfNeeded = (rowIndex: number) => () => {
    const currentTrack = subTrackState[rowIndex];
    const updatedRows = [...subTrackState];
    if (
      (rowIndex > 0 && currentTrack.startTime < updatedRows[rowIndex - 1].startTime) ||
      (rowIndex < updatedRows.length - 1 &&
        currentTrack.startTime > updatedRows[rowIndex + 1].startTime)
    ) {
      updatedRows.sort((a, b) => a.startTime - b.startTime);
      setSubTrackState(updatedRows);
    }
    onBlur();
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
          return { ...row, [fieldName]: parseFloat(videoElement.current.currentTime.toFixed(3)) };
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
    window.scrollTo(0, 80);
  };

  /** Gets a short url from api */
  const publish = async () => {
    const body = { long: asPath, title: titleState !== '' ? titleState : undefined };
    const resp = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data: IShortUrl = await resp.json();
    setPublishedUrl(`${window.location.origin}/s/${data.short}`);
    setEditing(false);
  };

  return (
    <>
      <Meta
        title={title as string}
        description={subTrackState[0] && subTrackState[0].text}
        og_url={`${SITE_URL}/s/${short}`}
        og_image={`${CLIPS_URL}thumbnails/${clip}.jpg`}
        og_type="video.movie"
      >
        <meta property="og:video" content={videoSource} />
        <meta property="og:video:type" content="video/mp4" />
      </Meta>
      <Back />
      <MainContainer>
        <H1>{title || `Mumbai TV ${editing ? 'Editor' : 'Theater'}`}</H1>
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
                  onBlur={onBlur}
                  reorderCallback={reorderIfNeeded(i)}
                  deleteCallback={deleteRow(i)}
                  startAsCurrent={setRowTimeAsCurrent(i, 'startTime')}
                  endAsCurrent={setRowTimeAsCurrent(i, 'endTime')}
                  currentAsStart={setCurrentAsRowTime(i, 'startTime')}
                  currentAsEnd={setCurrentAsRowTime(i, 'endTime')}
                  key={row.id}
                />
              ))}
            </TrackRows>
            <LastRow>
              <Button onClick={addRow} style={{ marginRight: '1em', marginTop: '1em' }}>
                Add row
              </Button>
              <TitleInput
                onChange={onTitleChange}
                value={titleState}
                placeholder="Add a title for public list"
              />
              <OrangeButton onClick={publish} style={{ marginLeft: '1em', marginTop: '1em' }}>
                {titleState === '' ? 'Save' : 'Publish'}
              </OrangeButton>
            </LastRow>
          </EditorContainer>
        )}
        <EditButtonContainer>
          {editing ? (
            <OutlineButton onClick={toggleEditing}>Close editor</OutlineButton>
          ) : (
            <Button onClick={toggleEditing}>{sub ? 'Edit subtitles!' : 'Add subtitles!'}</Button>
          )}
        </EditButtonContainer>
      </MainContainer>
    </>
  );
};

/** Proper metadata needs SSR */
View.getInitialProps = async () => ({});

export default View;
