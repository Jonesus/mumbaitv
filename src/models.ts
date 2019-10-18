import mongoose from 'mongoose';

export interface IShortUrl {
  short: string;
  long: string;
  title?: string;
}

const ShortUrlSchema = new mongoose.Schema({
  short: { type: String, require: true },
  long: { type: String, require: true },
  title: { type: String },
});

export const ShortUrl =
  mongoose.models.ShortUrl ||
  mongoose.model<IShortUrl & mongoose.Document>('ShortUrl', ShortUrlSchema);
