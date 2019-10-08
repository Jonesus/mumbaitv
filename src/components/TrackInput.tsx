import React from 'react';
import { ITrackRow } from 'src/helpers';

interface ITrackInput {
  row: ITrackRow;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCallback: () => void;
}

export const TrackInput: React.FC<ITrackInput> = ({ row, onChange, deleteCallback }) => (
  <li>
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
  </li>
);
