import { NextApiResponse, NextApiRequest } from "next";
import { withSentry } from "@sentry/nextjs";

import { data } from "../../../picks";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(data);
}

export default withSentry(handler);
