import { NextApiResponse, NextApiRequest } from 'next'
import { data } from '../../../data'

export default function sportHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req
  const { sport } = query
  const filtered = data.filter((p) => p.slug === sport)

  // User with id exists
  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `${sport} not found.` })
}
