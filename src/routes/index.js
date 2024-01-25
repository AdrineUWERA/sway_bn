import express from 'express';
import userRouter from "./user.route"

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'Home route',
  });
});

router.use("/users", userRouter);

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
