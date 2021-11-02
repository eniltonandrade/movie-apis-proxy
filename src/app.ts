import express, {Request, Response} from 'express';
import cors from 'cors';
import ratelimit from 'express-rate-limit';

import { resolve } from 'path';
import { config } from 'dotenv';
const pathToConfig = '../.env';
config({ path: resolve(__dirname, pathToConfig) });

import { router as TMDB } from './routes/tmdb';
import { router as OMDB } from './routes/omdb';

const PORT = process.env.PORT || 5000

const app = express();

const limiter = ratelimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 5
})
//app.use(limiter);
//app.set('trust proxy', 1);

app.use(cors());
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Movie APIs Proxy' })
});
app.use('/tmdb', TMDB);
app.use('/omdb', OMDB);




app.listen(PORT, ()=> console.log(`🚀 Server is running on port ${PORT} `));