import React from 'react';
import styled from 'styled-components';
import { ITrackRow } from 'src/helpers';

interface ITrackInput {
  row: ITrackRow;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCallback: () => void;
}

export const TrackRows = styled.ol`
  padding: 0 var(--decoration-pad);
`;

const Row = styled.li`
  list-style: none;
  padding: 0.5em;
  border-radius: var(--decoration-radius-base);
  border: 1px solid var(--secondary-300);

  background-color: var(--secondary-100);
  & + & {
    margin-top: 1em;
  }
`;

export const TrackInput: React.FC<ITrackInput> = ({ row, onChange, deleteCallback }) => (
  <Row>
    start
    <input
      name="startTime"
      type="number"
      onChange={onChange}
      step="any"
      size={6}
      value={row.startTime}
    />
    end
    <input
      name="endTime"
      type="number"
      onChange={onChange}
      step="any"
      size={6}
      value={row.endTime}
    />
    text
    <input name="text" type="text" onChange={onChange} value={row.text} />
    <button type="button" onClick={deleteCallback}>
      delete
    </button>
  </Row>
);
