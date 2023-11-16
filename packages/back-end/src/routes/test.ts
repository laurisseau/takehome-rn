import { Router } from 'express';
import IRoute from '../types/IRoute';

const testRouter: IRoute = {
  route: '/',
  router() {
    const router = Router();

    // do something with req.services.sequelize! this only fires once
    // #authenticate completes, so we know it's ready for consumption.
    router.get('/test', async (req, res) => {
      try {
        res.send('db connected');
      } catch (error) {
        res.send(error);
      }
    });

    return router;
  },
};

export default testRouter;
