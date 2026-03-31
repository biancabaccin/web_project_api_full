const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Autorização necessária" });
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Autorização necessária" });
  }
};
