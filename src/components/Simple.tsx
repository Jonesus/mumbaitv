import React from 'react';
import styled from 'styled-components';
import { FiClipboard } from 'react-icons/fi';

export const H1 = styled.h1`
  margin: 0;
  padding: 0.2em 0;
  border-radius: var(--decoration-radius-base);

  font-family: 'Mansalva', cursive;
  font-size: 3rem;
  text-align: center;
  line-height: 1em;
  word-break: break-word;

  background-color: var(--white);
  text-shadow: 0.04em 0.04em 0.04em var(--grey-300);

  @media only screen and (min-width: 68em) {
    font-size: 4rem;
  }
  @media only screen and (max-width: 36em) {
    font-size: 2.3rem;
  }
  @media only screen and (max-width: 24em) {
    font-size: 1.8rem;
  }
`;

export const IntroText = styled.p`
  font-size: 1.2em;
  border-radius: var(--decoration-radius-base);
  background-color: var(--white);
  padding: 1em 1.5em;
  margin-bottom: 0;
  @media only screen and (max-width: 36em) {
    font-size: 1em;
  }
  @media only screen and (max-width: 24em) {
    font-size: 0.8em;
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: var(--decoration-radius-base);
`;

export const EditButtonContainer = styled.div`
  display: flex;
  place-content: center;
  margin-bottom: var(--decoration-pad);
`;

export const BaseButton = styled.button.attrs({ type: 'button' })`
  /* Reset button styles */
  border: none;
  padding: 0;
  border-radius: 2rem;
  width: auto;
  overflow: visible;
  cursor: pointer;

  font: inherit;
  font-size: inherit;

  line-height: normal;
  -webkit-appearance: none;

  color: inherit;
  background: transparent;

  transition: all 150ms ease-in-out;
  &:hover {
    opacity: 0.6;
  }

  @media only screen and (max-width: 36em) {
    font-size: 0.8em;
  }
`;

export const Button = styled(BaseButton)`
  padding: 0.2em 2em 0.4em;
  font-size: 1.2em;
  background: var(--secondary-800);
  color: var(--white);
  &:hover {
    background-color: var(--secondary-700);
  }
`;

export const OutlineButton = styled(BaseButton)`
  padding: 0.2em 2em 0.4em;
  font-size: 1.2em;
  color: var(--secondary-800);
  border: 1px solid currentColor;
  &:hover {
    color: var(--secondary-600);
    background-color: var(--white);
  }
`;

export const BackWrapper = styled.div`
  height: 0;
`;

export const BackButton = styled(BaseButton)`
  position: relative;
  top: -1em;
  left: -1em;
  border-radius: calc(var(--decoration-radius-base) * 2);
  width: 2em;
  height: 2em;
  background-color: var(--white);
  color: var(--secondary-900);
  transition: all 300ms ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    opacity: 1;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  @media only screen and (min-width: 54em) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 24em) {
    top: -0.5em;
    left: -0.5em;
  }
`;

export const OrangeButton = styled(BaseButton)`
  padding: 0.2em 2em 0.4em;
  font-size: 1.2em;
  background: var(--main-500);
  color: var(--white);
`;

export const EditorContainer = styled.section`
  background-color: var(--white);
  border-radius: var(--decoration-radius-base);
  padding: var(--decoration-pad);
`;

export const TextInput = styled.textarea.attrs({ rows: 1 })`
  border: none;
  font: inherit;
  background-color: inherit;
  resize: none;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 2em;
  padding: 0.3em 1em 0.4em;
  background-color: var(--white);
  border: 1px solid var(--grey-100);
  margin-right: 1em;
`;

const PublishedContainer = styled.div`
  display: flex;
  background-color: var(--white);
  border-radius: 2em;
  border: 1px solid var(--grey-200);
  @media only screen and (max-width: 36em) {
    font-size: 0.7em;
  }
`;

const LinkInput = styled(TextInput).attrs({ readOnly: true })`
  margin-right: 0;
  border-radius: 2em 0 0 2em;
  border: none;
  border-right: 1px solid var(--grey-200);
  padding: 0.5em 1em 0.6em;
  border-color: var(--grey-200);
  text-align: center;
`;

export const TitleInput = styled.input`
  border: none;
  font: inherit;
  background-color: inherit;
  resize: none;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 2em;
  padding: 0.4em 1em 0.5em;
  background-color: var(--white);
  border: 1px solid var(--grey-200);
  margin-top: 1em;
  @media only screen and (max-width: 36em) {
    font-size: 0.7em;
  }
`;

export const LastRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const CopyButton = styled(BaseButton)`
  background-color: var(--white);
  border-radius: 0 2em 2em 0;
  padding: 0 0.5em 0 0.4em;
  font-size: 1.5em;
`;

const copyToClipboard = () => {
  const copyText = document.getElementById('publishedUrl') as HTMLInputElement;
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
};

interface IPublishedLink {
  value: string;
}

export const PublishedLink: React.FC<IPublishedLink> = ({ value }) =>
  value ? (
    <PublishedContainer>
      <LinkInput value={value} id="publishedUrl" />
      <CopyButton onClick={copyToClipboard} title="Copy to clipboard">
        <FiClipboard />
      </CopyButton>
    </PublishedContainer>
  ) : null;
