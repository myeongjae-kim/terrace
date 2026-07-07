import getArticleController from "./articles/{articleId}/GetArticleController";
import getArticlesController from "./articles/GetArticlesController";
import getMusingController from "./musings/{musingId}/GetMusingController";
import getMusingsController from "./musings/GetMusingsController";

export const apiControllers = [
  getArticlesController,
  getArticleController,
  getMusingsController,
  getMusingController,
];
