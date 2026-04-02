const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(() => next(err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (String(card.owner) !== String(userId)) {
        return res.status(403).json({
          message: "Você não tem permissão para excluir este cartão",
        });
      }

      return Card.findByIdAndDelete(cardId).then(() =>
        res.send({ message: "Cartão deletado com sucesso" }),
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID inválido" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      next(err);
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      next(err);
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      next(err);
    });
