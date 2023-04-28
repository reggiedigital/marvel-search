// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as crypto from 'crypto';
import axios from 'axios';


type Data = {
  name: string
}

export const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    const {id} = req.query;
    const pub_key = "7620c866f7a8251c6aebeb639562c510"
    const pri_key = "6270c7a7851c6755007a0296770f05917455afb5"
    const ts = Date.now()
    const h = crypto.createHash('md5').update(ts + pri_key + pub_key).digest("hex");
    const charURL = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics`
    const url = `${charURL}?ts=${ts}&apikey=${pub_key}&hash=${h}`
    const response = await axios.get(url)
    
  res.status(200).json(response.data.data.results)
}
