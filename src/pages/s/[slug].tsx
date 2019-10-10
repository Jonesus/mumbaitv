import { NextPage } from 'next';
import Router from 'next/router';
import { connectToDb } from 'src/db';
import { ShortUrl } from 'src/models';

const ShortUrlPage: NextPage = () => null;

ShortUrlPage.getInitialProps = async ({ res, query }) => {
  const { slug } = query;
  await connectToDb();

  const { long } = (await ShortUrl.findOne({ short: slug })) || { long: 'notfound' };

  if (res) {
    res.writeHead(302, {
      Location: `${long}`,
    });
    res.end();
  } else {
    Router.push(`${long}`);
  }

  return {};
};

export default ShortUrlPage;
