import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';

import { CLIPS_URL, SUBS_URL } from 'src/helpers';

import { MainContainer } from 'src/components/MainContainer';
import { H1 } from 'src/components/Simple';
import { RadioInput, RadioGroup, RadioLabel, RadioWrapper } from 'src/components/RadioGroup';

const LinkGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 1rem;
  padding: 0;
`;

const SmallGrid = styled(LinkGrid)`
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
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
  const [showNew, setShowNew] = useState(true);
  const updateShowNew = (event: React.FormEvent<HTMLInputElement>) => {
    setShowNew(event.currentTarget.id === 'fresh');
  };
  const [clips, setClips] = useState<string[]>([]);
  const [vintage, setVintage] = useState<string[]>([]);
  const [subStubs, setSubStubs] = useState<{ [key: string]: string }>({});

  const getClips = async () => {
    const response = await fetch(CLIPS_URL);
    const data = await response.json();
    setClips(data);
  };

  const getVintage = async () => {
    const response = await fetch(`${CLIPS_URL}vintage/`);
    const data = await response.json();
    setVintage(data);
  };

  const getInitialSubs = async () => {
    const response = await fetch(SUBS_URL);
    const data = await response.json();
    setSubStubs(data);
  };

  useEffect(() => {
    getClips();
    getVintage();
    getInitialSubs();
  }, []);

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mumbaitv.online" />
        <meta
          property="og:image"
          content="https://mumbaitv.online/static/android-chrome-192x192.png"
        />
      </Head>

      <MainContainer>
        <H1>Mumbai TV</H1>
        <IntroText>
          Mumbai TV is a humorous video subtitling platform where you can show all your friends how
          funny you think you are. A curated collection of crème de la crème movie clips are
          available as your expression vessel of choice. Pick one below to get started:
        </IntroText>
        <RadioWrapper>
          <legend>Show videos:</legend>
          <RadioGroup>
            <RadioInput id="fresh" name="show" onChange={updateShowNew} defaultChecked />
            <RadioLabel htmlFor="fresh">Fresh films</RadioLabel>
            <RadioInput id="vintage" name="show" onChange={updateShowNew} />
            <RadioLabel htmlFor="vintage">Vintage videos</RadioLabel>
          </RadioGroup>
        </RadioWrapper>
        {showNew ? (
          <LinkGrid>
            {clips.map(clip => {
              let subExtension = '';
              const key = `${clip}.txt`;
              if (Object.keys(subStubs).includes(key)) {
                subExtension = `&sub=${subStubs[key]}`;
              }
              const videoLink = `/view?clip=${clip}${subExtension}`;
              return (
                <GridItem key={clip}>
                  <Link href={videoLink}>
                    <StretchContainer href={videoLink}>
                      <ImageLink src={`${CLIPS_URL}thumbnails/${clip}.jpg`} alt={clip} />
                    </StretchContainer>
                  </Link>
                </GridItem>
              );
            })}
          </LinkGrid>
        ) : (
          <SmallGrid>
            {vintage.map(clip => {
              let subExtension = '';
              const key = `${clip}.txt`;
              if (Object.keys(subStubs).includes(key)) {
                subExtension = `&sub=${subStubs[key]}`;
              }
              const videoLink = `/view?clip=vintage/${clip}${subExtension}`;
              return (
                <GridItem key={clip}>
                  <Link href={videoLink}>
                    <StretchContainer href={videoLink}>
                      <ImageLink src={`${CLIPS_URL}vintage/thumbnails/${clip}.jpg`} alt={clip} />
                    </StretchContainer>
                  </Link>
                </GridItem>
              );
            })}
          </SmallGrid>
        )}
      </MainContainer>
    </>
  );
};

export default Home;
