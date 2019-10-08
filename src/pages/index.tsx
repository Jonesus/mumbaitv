import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 3rem;
`;

const Home: NextPage<{ clips: string[] }> = ({ clips }) => (
  <>
    <H1>Mumbai TV</H1>
    <p>Pick a nice video and then go to town subtitling it</p>
    {clips.map(clip => {
      const videoLink = `/view?clip=${clip}`;
      return (
        <Link href={videoLink} key={clip}>
          <a href={videoLink}>Go edit {clip}</a>
        </Link>
      );
    })}
  </>
);

Home.getInitialProps = async () => {
  const glob = require('glob'); // eslint-disable-line
  const allEntries: string[] = glob.sync('static/clips/*.mp4');
  const filenames = allEntries.map(item => {
    const parts = item.split('/');
    const filename = parts[2].split('.');
    return filename[0];
  });
  return { clips: filenames };
};

export default Home;
