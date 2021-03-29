import { Document, Model } from "mongoose";

export interface IWord {
  verse: string;
  content: string;
}

export interface IWordDocument extends IWord, Document {}

export interface IWordModel extends Model<IWordDocument> {}
