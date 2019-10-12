import styled, { css } from 'styled-components';

export const H1 = styled.h1`
  font-family: 'Mansalva', cursive;

  font-size: 3rem;
`;

export const Video = styled.video`
  width: 100%;
  border-radius: 2rem;
`;

interface IButton {
  filled?: boolean;
}

export const Button = styled.button.attrs({ type: 'button' })<IButton>`
  /* Reset button styles */
  border: none;
  margin: 0;
  padding: 0.2em 1em 0.4em;
  width: auto;
  overflow: visible;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  ${p =>
    p.filled
      ? css`
          background: var(--ORANGE);
          color: var(--NAVY);
          font-weight: bold;
        `
      : css`
          background: transparent;
          border: 1px solid currentColor;
        `}

  /* Apply custom */
  display: inline-block;
  border-radius: 2rem;
`;
