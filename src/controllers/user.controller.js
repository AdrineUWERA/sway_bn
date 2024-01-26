import { generateToken, decodeToken } from "../utils/token";
import userServices from "../services/user.service";
import crypto from "crypto";

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userServices.getUserByEmail(email);

  if (userExists) {
    const salt = Buffer.from(userExists.salt, "hex");

    console.log("salt:", salt);

    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return cb(err);
        }
        const saved_password = Buffer.from(userExists.password, "hex");

        if (
          !crypto.timingSafeEqual(saved_password, hashedPassword) ||
          saved_password.length !== hashedPassword.length
        ) {
          return res
            .status(401)
            .json({ statusCode: 401, message: "Incorrect email or password." });
        }

        const body = {
          id: userExists.id,
          email: userExists.email,
          fullName: userExists.fullName,
          role: userExists.role,
        };

        const token = generateToken(body);

        return res
          .status(200)
          .json({ code: 200, message: "Logged in successfully", token });
      }
    );
  } else {
    return res
      .status(401)
      .json({ statusCode: 401, message: "No user matches the given email" });
  }
};

const signUp = async (req, res) => {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      const details = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword.toString("hex"),
        role: req.body.role,
        salt: salt.toString("hex"),
      };

      const user = await userServices.createUser(details);

      if (!user) {
        {
          return next(err);
        }
      }

      const body = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        salt: user.salt,
      };

      const token = generateToken(body);
      return res
        .status(201)
        .json({ code: 201, message: "User created", token, user });
    }
  );
};

const getUsers = async (req, res) => {
  const users = await userServices.getAllUsers();

  // if(users) console.log(users)
  return res.status(200).json({ code: 200, message: "All users", users });
};

export default { login, signUp, getUsers };
