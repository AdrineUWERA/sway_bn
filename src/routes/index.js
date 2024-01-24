import express from 'express'; 

const router = express.Router();
router.use('/',  (req, res) => {
    res.status(200).json({
      code: 200,
      message: 'Home route',
    });
  }); 

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
