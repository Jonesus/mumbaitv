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

export const TextInput = styled.input`
  border: none;
  font: inherit;
  background-color: inherit;
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
