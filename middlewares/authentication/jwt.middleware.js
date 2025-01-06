const jwt = require("jsonwebtoken");
const { handleDecodeErrors } = require("../../helpers/jwt.helper");
const User = require("../../models/User");

const jwtVerify =
  (...roles) =>
  (req, res, next) => {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        if (err) return handleDecodeErrors({ err, res });

        const { sub, name } = decoded;

        // Check if User Exists
        const user = await User.findOne({
          _id: sub,
          status: "Approved",
        })
          .populate({
            path: "role",
            select: "name permissions",
            populate: {
              path: "permissions",
              select: "name actions",
              populate: [
                {
                  path: "permission",
                  select: "name url",
                },
                {
                  path: "actions",
                  select: "name ",
                },
              ],
            },
          })
          .select("-password");

        if (!user) return res.auth("Unauthorized");

        req.user = user;
        req.sub = sub;
        req.name = name;

        next();
      }
    );
  };

//exports
module.exports = {
  jwtVerify,
};
