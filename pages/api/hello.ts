// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path";
import { WeddingWeiserGeoJSON } from "../../types/types";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filepath = path.join(__dirname, '/mapping.geojson')
  console.log('filepath', filepath)
  let rawdata = fs.readFileSync(filepath, 'utf-8')
  let places: WeddingWeiserGeoJSON = JSON.parse(rawdata);
  res.statusCode = 200
  res.json(places)
}
