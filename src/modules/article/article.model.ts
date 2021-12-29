import { Schema, Document } from "mongoose";

export const ARTICLE_MODEL_NAME: string = "Article";

export type ArticleDocument = Document & {
    title: string,
}

export const ArticleSchema = new Schema<ArticleDocument>({
    title: String
});