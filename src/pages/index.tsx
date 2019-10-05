import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 3rem;
`;

const Home: React.FC = () => (
  <>
    <H1>Mumbai TV</H1>
    <p>Pick a nice video and then go to town subtitling it</p>
    <Link href="/view">Go edit</Link>
  </>
);

export default Home;
