import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from 'src/db';
import { ShortUrl } from 'src/models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await connectToDb();
  const items = await ShortUrl.find();
  const filteredItems = items.filter(i => i.title);
  const cleanItems = filteredItems.map(i => ({ short: i.short, long: i.long, title: i.title }));

  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(cleanItems);

      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
      break;
  }
};
