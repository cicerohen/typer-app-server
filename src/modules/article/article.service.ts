import * as mongoose from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ArticleDocument, ARTICLE_MODEL_NAME } from "./article.model";



@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ARTICLE_MODEL_NAME)
    private readonly model: mongoose.Model<ArticleDocument>
  ) {}

  async add(article = {}) {
    const newArticle = new this.model(article);
    return newArticle.save();
  }

  async listAll() {
    return this.model.find().exec();
  }

  async update(article) {
    return this.model
      .findOneAndUpdate({ _id: article.id }, article, { new: true })
      .exec();
  }

  async delete(article) {
    return this.model.findOneAndDelete({ _id: article.id });
  }
}
