const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).json({ message: "Email ou senha incorretos" });
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" },
        );

        return res.send({ token });
      });
    })
    .catch(() => {
      res.status(401).send({ message: "Email ou senha incorretos" });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  User.create({ name, about, avatar, email, password: hashPassword })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .select("-password")
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
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
      next(err);
    });
};
