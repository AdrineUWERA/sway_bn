import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail } from "../services/user.service";
import passport from "passport";
import userControllers from "../controllers/user.controller";
import express from "express";

const router = express.Router();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, cb) {
      try {
        user = getUserByEmail(email);

        if (!user) {
          return cb(
            { statusCode: 401, message: "Incorrect email or password." },
            false,
            { message: "Incorrect email or password." }
          );
        }

        console.log(user);
      } catch (error) {
        return cb(err);
      }
    }
  )
);

router.post("/login/password", userControllers.login);

router.post("/signup", userControllers.signUp);

router.get("/all", userControllers.getUsers);

export default router;
