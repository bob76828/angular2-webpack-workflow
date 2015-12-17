import { Router } from 'express';

const router = Router();

router.use((err:any, req:any, res:any, next:any) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

export default router;
