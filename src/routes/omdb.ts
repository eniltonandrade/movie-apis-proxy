import { Router, Request, Response } from 'express';
import needle from 'needle';
import apicache from 'apicache';

const router = Router();
const API_BASE_URL = process.env.OMDB_URL;
const API_KEY_NAME = process.env.OMDB_KEY_NAME;
const API_KEY_VALUE = process.env.OMDB_KEY_VALUE;


let cache = apicache.middleware;

router.get('/', cache('2 minutes'), async (req: Request, res: Response) => {
    const urlQueryParams = req.query as any;

    try {
        const params = new URLSearchParams({
            [API_KEY_NAME] : API_KEY_VALUE,
            ...urlQueryParams
            
        });
        process.env.NODE_ENV === 'production' ? null : console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
   } catch (error) {
       console.log(error);
       res.status(500).json(error.message);
   }

});


export { router }