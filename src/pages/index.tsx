import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { CLIPS_URL } from 'src/helpers';

import { MainContainer } from 'src/components/MainContainer';
import { H1 } from 'src/components/Simple';

const LinkGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 1rem;
  padding: 0;
`;

const GridItem = styled.li`
  list-style: none;
  overflow: hidden;
  border-radius: var(--decoration-radius-base);
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const StretchContainer = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ImageLink = styled.img`
  object-fit: cover;
  height: auto;
  width: 100%;
`;

const IntroText = styled.p`
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

const Home: NextPage = () => {
  const [clips, setClips] = useState<string[]>([]);

  const getClips = async () => {
    const response = await fetch(CLIPS_URL);
    const data = await response.json();
    setClips(data);
  };

  useEffect(() => {
    getClips();
  }, []);

  return (
    <MainContainer>
      <H1>Mumbai TV</H1>
      <IntroText>
        Mumbai TV is a humorous video subtitling platform where you can show all your friends how
        funny you think you are. A curated collection of crème de la crème Bollywood clips are
        available as your expression vessel of choice. Pick one below to get started:
      </IntroText>
      <LinkGrid>
        {clips.map(clip => {
          const videoLink = `/view?clip=${clip}`;
          return (
            <GridItem>
              <Link href={videoLink} key={clip}>
                <StretchContainer href={videoLink}>
                  <ImageLink src={`${CLIPS_URL}thumbnails/${clip}.jpg`} alt={clip} />
                </StretchContainer>
              </Link>
            </GridItem>
          );
        })}
      </LinkGrid>
    </MainContainer>
  );
};

export default Home;
