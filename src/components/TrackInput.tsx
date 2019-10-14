import React from 'react';
import styled from 'styled-components';
import { FiXCircle, FiChevronsRight, FiDownload, FiUpload } from 'react-icons/fi';
import { ITrackRow } from 'src/helpers';
import { BaseButton, TextInput } from 'src/components/Simple';

export const TrackRows = styled.ol`
  padding: 0;

  @media only screen and (max-width: 36em) {
    font-size: 0.8em;
  }
`;

const Row = styled.li`
  list-style: none;
  padding: 0 1em;
  border-radius: var(--decoration-radius-base);
  border: 1px solid var(--secondary-300);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  background-color: var(--secondary-100);
  & + & {
    margin-top: 1em;
  }
`;

const IconButton = styled(BaseButton)`
  font-size: 1.5em;
  vertical-align: middle;

  color: var(--secondary-800);
`;

interface ITimeInput {
  start?: boolean;
  end?: boolean;
}

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2em;
  padding: 0 0.2em;
  background-color: var(--white);
  border: 1px solid var(--grey-100);
`;

const TimeInput = styled.input<ITimeInput>`
  border: none;
  font: inherit;
  font-family: monospace;
  max-width: 4.5em;
  padding: 0;
  background-color: inherit;
  &[name='startTime'] {
    text-align: right;
    padding-right: 0.3em;
  }
  &[name='endTime'] {
    padding-left: 0.3em;
  }
`;

const IconWrapper = styled.span`
  font-size: 1.5em;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  padding: 0.5em 0;
`;

const LabelText = styled.span`
  font-weight: bold;
  padding: 0 0.5em;
  padding-bottom: 0.1em;
`;

const TimeControls = styled.div`
  display: flex;
  flex-direction: column;
  margin: -0.5em 0.5em;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0.5em 0;
`;

interface ITrackInput {
  row: ITrackRow;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  reorderCallback: () => void;
  deleteCallback: () => void;
  startAsCurrent: () => void;
  endAsCurrent: () => void;
  currentAsStart: () => void;
  currentAsEnd: () => void;
}

export const TrackInput: React.FC<ITrackInput> = ({
  row,
  onChange,
  onBlur,
  reorderCallback,
  deleteCallback,
  startAsCurrent,
  endAsCurrent,
  currentAsStart,
  currentAsEnd,
}) => (
  <Row>
    <TimeWrapper>
      <LabelText>Time</LabelText>

      <TimeControls>
        <BaseButton title="Set start time as current time on video" onClick={startAsCurrent}>
          <FiUpload />
        </BaseButton>
        <BaseButton title="Get current time as start time" onClick={currentAsStart}>
          <FiDownload />
        </BaseButton>
      </TimeControls>

      <TimeInputWrapper>
        <TimeInput
          name="startTime"
          type="number"
          onChange={onChange}
          onBlur={reorderCallback}
          step="any"
          size={6}
          value={row.startTime}
          start
        />
        <IconWrapper>
          <FiChevronsRight />
        </IconWrapper>
        <TimeInput
          name="endTime"
          type="number"
          onChange={onChange}
          onBlur={onBlur}
          step="any"
          size={6}
          value={row.endTime}
        />
      </TimeInputWrapper>

      <TimeControls>
        <BaseButton title="Set end time as current time on video" onClick={endAsCurrent}>
          <FiUpload />
        </BaseButton>
        <BaseButton title="Get current time as end time" onClick={currentAsEnd}>
          <FiDownload />
        </BaseButton>
      </TimeControls>
    </TimeWrapper>

    <TextWrapper>
      <LabelText>Text</LabelText>
      <TextInput name="text" type="text" onChange={onChange} onBlur={onBlur} value={row.text} />
      <IconButton onClick={deleteCallback} title="Delete this row">
        <FiXCircle />
      </IconButton>
    </TextWrapper>
  </Row>
);
