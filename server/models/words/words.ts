import { Schema, Model, model, Document } from "mongoose";
import { IWordDocument, IWordModel } from "./types";

export const WordSchema: Schema<IWordDocument> = new Schema({
  verse: {
    type: String,
    maxlength: 50,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});

export const WordModel = model<IWordDocument, IWordModel>("word", WordSchema);
