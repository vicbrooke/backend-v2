const { Article, Comment, User } = require("../db/models/");
const { Router } = require("express");
const articleRouter = Router();

// add article routes here

articleRouter.get("/", async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const articles = await Article.findAll({
      limit,
      offset: limit * (page - 1),
      include: [Comment, User],
    });
    res.status(200).send({ articles });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { id: req.params.id },

      include: [Comment, User],
    });
    res.status(200).send({ article });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const [user, created] = await User.findOrCreate({
      where: { username: data.username },
      defaults: {
        name: data.username,
        email: data.email,
        avatar_URL: data.avatar_URL,
      },
    });
    const userId = user.id;
    const { title, body } = data;
    const newArticle = await Article.create({
      title,
      body,
      userId,
    });
    res.status(201).send({ newArticle });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id/:username", async (req, res, next) => {
  try {
    const { id, username } = req.params;
    const articleToDelete = await Article.findOne({
      where: { id },
      include: User,
    });
    console.log(articleToDelete.user.username, username);
    if (articleToDelete.user.username === username) {
      await Article.destroy({ where: { id } });
      res.status(202).send(`Article with id ${id} deleted`);
    } else {
      res.status(401).send("You do not have permission to delete this article");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.put("/:id/:username", async (req, res, next) => {
  try {
    const data = req.body;
    const { id, username } = req.params;
    const articleToUpdate = await Article.findOne({
      where: { id },
      include: User,
    });
    if (!articleToUpdate) {
      return res.status(404).send("Article not found");
    }
    if (articleToUpdate.user.username === username) {
      await articleToUpdate.update(data);
      const updatedArticle = await Article.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send({ updatedArticle });
    } else {
      res.status(401).send("You do not have permission to update this article");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articleRouter;
