import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { CLIPS_URL } from 'src/helpers';

import { MainContainer } from 'src/components/MainContainer';

const H1 = styled.h1`
  font-size: 3rem;
`;

const LinkGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 1rem;
  padding: 0;
`;

const GridItem = styled.li`
  list-style: none;
  overflow: hidden;
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
      <p>Pick a nice video and then go to town subtitling it</p>
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
