import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import rootRouter from './routes';
import errorHandler from './middlewares/error-handler';
import { PORT, DB_URL } from './config/config';
import { requestLogger, errorLogger } from './middlewares/logger';

const limitter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
mongoose.connect(DB_URL);

app.use(limitter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);
app.use('/', rootRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
