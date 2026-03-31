const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(() =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
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
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.json({ message: "Cartão deletado com sucesso" });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Cartão não encontrado" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
