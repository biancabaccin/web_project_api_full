const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(() =>
      res.status(500).json({ message: "Ocorreu um erro no servidor" })
    );
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    });
};
