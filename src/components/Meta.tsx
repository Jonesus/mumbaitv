import React from 'react';
import Head from 'next/head';
import { SITE_URL } from 'src/helpers';

const SITE_NAME = 'Mumbai TV';
const DEFAULT_DESCRIPTION = 'Mumbai TV is a humorous video subtitling platform';

interface IMeta {
  title?: string;
  description?: string;
  og_url?: string;
  og_type?: string;
  og_image?: string;
}

export const Meta: React.FC<IMeta> = ({
  title,
  description,
  og_url,
  og_type,
  og_image,
  children,
}) => (
  <Head>
    <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
    <meta name="description" content={description || DEFAULT_DESCRIPTION} />

    <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
    <meta name="application-name" content={SITE_NAME} />

    <meta property="og:title" content={title || SITE_NAME} />
    <meta property="og:description" content={description || DEFAULT_DESCRIPTION} />
    <meta property="og:type" content={og_type || 'website'} />
    <meta property="og:url" content={og_url || SITE_URL} />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta
      property="og:image"
      content={og_image || `${SITE_URL}/static/android-chrome-192x192.png`}
    />

    {children}

    <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#ff9233" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <meta name="msapplication-TileColor" content="#ff9233" />
    <meta name="msapplication-config" content="/static/browserconfig.xml" />
    <meta name="theme-color" content="#ff9233" />
    <link
      href="https://fonts.googleapis.com/css?family=Be+Vietnam|Mansalva&display=swap"
      rel="stylesheet"
    />
  </Head>
);
