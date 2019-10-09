import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { CLIPS_URL } from 'src/helpers';

const H1 = styled.h1`
  font-size: 3rem;
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
    <>
      <H1>Mumbai TV</H1>
      <p>Pick a nice video and then go to town subtitling it</p>
      {clips.map(clip => {
        const videoLink = `/view?clip=${clip}`;
        return (
          <div>
            <Link href={videoLink} key={clip}>
              <a href={videoLink}>Go edit {clip}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Home;
