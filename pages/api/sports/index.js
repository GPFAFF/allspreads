import { NextApiResponse, NextApiRequest } from 'next'
import { data } from '../../../data'

export default function handler(
  _req,
  res
) {
  debugger;
  return res.status(200).json(data)
}
