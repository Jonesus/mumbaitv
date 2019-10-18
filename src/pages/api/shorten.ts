import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from 'src/db';
import { ShortUrl } from 'src/models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { long, title: newTitle } = req.body;
  const randShort = Math.random()
    .toString(36)
    .slice(2);

  await connectToDb();
  const { short, title } = (await ShortUrl.findOne({ long })) || { short: null, title: null };

  switch (method) {
    case 'POST':
      res.setHeader('Content-Type', 'application/json');
      if (short === null) {
        await ShortUrl.create({ short: randShort, long, title: newTitle });
        res.status(200).json({ short: randShort, long, title: newTitle });
      } else {
        res.status(200).json({ short, long, title });
      }

      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
      break;
  }
};
