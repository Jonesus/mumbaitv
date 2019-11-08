import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { MainContainer } from 'src/components/MainContainer';
import { IShortUrl } from 'src/models';

import { H1, IntroText } from 'src/components/Simple';
import { Meta } from 'src/components/Meta';
import { Back } from 'src/components/BackButton';
import { useGlobalState } from 'src/pages/_app';

const List = styled.ul`
  padding: 0 4em;
  margin-bottom: 2em;

  @media only screen and (max-width: 36em) {
    font-size: 0.8em;
  }
`;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  font-size: 1.3em;
  word-break: break-word;

  &:before {
    content: '⚫';
    position: absolute;
    left: -1.5em;
    top: 50%;
    transform: translateY(-40%);

    color: var(--secondary-600);
  }

  & + & {
    margin-top: 0.8em;
  }
`;

const Browse: NextPage = () => {
  const [linkList, setLinkList] = useGlobalState('linkList');

  const getLinks = async () => {
    const response = await fetch('/api/list');
    const shortUrls: IShortUrl[] = await response.json();
    setLinkList(shortUrls);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Meta />
      <Back />
      <MainContainer>
        <H1>Mumbai TV directory</H1>
        <IntroText>
          Here you can find all publicly available videos. There is no guarantee of humour quality,
          so viewer discretion is advised. If you want your contribution available here, be sure to
          set the title for the video before submitting it!
        </IntroText>
        <List>
          {linkList.map(link => (
            <ListItem key={link.short}>
              <Link href={`/s/${link.short}`}>{link.title}</Link>
            </ListItem>
          ))}
        </List>
      </MainContainer>
    </>
  );
};

export default Browse;
