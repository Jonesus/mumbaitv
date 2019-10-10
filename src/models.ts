import mongoose from 'mongoose';

export interface IShortUrl extends mongoose.Document {
  short: string;
  long: string;
}

const ShortUrlSchema = new mongoose.Schema({
  short: { type: String, require: true },
  long: { type: String, require: true },
});

export const ShortUrl =
  mongoose.models.ShortUrl || mongoose.model<IShortUrl>('ShortUrl', ShortUrlSchema);
