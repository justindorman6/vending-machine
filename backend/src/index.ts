// backend/src/index.ts
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { calculateChange, getDenominations } from './controllers/changeController';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const router = Router();

router.get('/denominations', getDenominations);
router.post('/calculate-change', calculateChange);

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
