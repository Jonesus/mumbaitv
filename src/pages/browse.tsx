import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import { SITE_URL } from 'src/helpers';

import { MainContainer } from 'src/components/MainContainer';
import { IShortUrl } from 'src/models';

import { H1 } from 'src/components/Simple';
import { Meta } from 'src/components/Meta';
import { Back } from 'src/components/BackButton';

const View: NextPage = () => {
  const [linkList, setLinkList] = useState<IShortUrl[]>([]);

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
        <ul>
          {linkList.map(link => (
            <li key={link.short}>
              <a href={`${SITE_URL}/s/${link.short}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </MainContainer>
    </>
  );
};

export default View;
