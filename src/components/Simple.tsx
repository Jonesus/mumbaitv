import styled, { css } from 'styled-components';

export const H1 = styled.h1`
  margin: 0;
  padding: 0.2em 0;
  border-radius: var(--decoration-radius-base);

  font-family: 'Mansalva', cursive;
  font-size: 3rem;
  text-align: center;
  line-height: 1em;

  background-color: var(--white);
  text-shadow: 0.04em 0.04em 0.04em var(--grey-300);

  @media only screen and (max-width: 36em) {
    font-size: 1.9rem;
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: var(--decoration-radius-base);
`;

interface IButton {
  filled?: boolean;
}

export const EditButtonContainer = styled.div`
  display: flex;
  place-content: center;
  margin-bottom: var(--decoration-pad);
`;

export const Button = styled.button.attrs({ type: 'button' })<IButton>`
  /* Reset button styles */
  border: none;
  padding: 0.2em 2em 0.4em;
  border-radius: 2rem;
  width: auto;
  overflow: visible;

  font: inherit;
  font-size: 1.2em;
  line-height: normal;
  -webkit-appearance: none;

  color: inherit;

  ${p =>
    p.filled
      ? css`
          background: var(--secondary-800);
          color: var(--white);
        `
      : css`
          background: transparent;
          border: 1px solid currentColor;
        `}

  @media only screen and (max-width: 36em) {
    font-size: 0.8em;
  }
`;

export const EditorContainer = styled.section`
  background-color: var(--white);
  border-radius: var(--decoration-radius-base);
`;
