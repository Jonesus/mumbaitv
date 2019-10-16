import styled from 'styled-components';

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  visibility: hidden;
  display: none;
`;

export const RadioLabel = styled.label`
  color: var(--secondary-600);
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5em 2em;
  transition: all 200ms ease-in-out;

  ${RadioInput}:checked + & {
    color: var(--main-100);
    background-color: var(--secondary-600);
  }
  & + ${RadioInput} + & {
    border-left: solid 2px var(--secondary-600);
  }
`;

export const RadioGroup = styled.div`
  border: solid 2px var(--secondary-600);
  display: inline-block;
  border-radius: var(--decoration-radius-base);
  overflow: hidden;
  margin-top: 0.5em;
`;

export const RadioWrapper = styled.fieldset`
  border: none;
  padding: 0;
  margin: inherit;
  margin-top: calc(var(--decoration-pad) * 1.5);
`;
