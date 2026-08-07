import type { NextApiRequest, NextApiResponse } from 'next';

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export function createContext(req: NextApiRequest, res: NextApiResponse): GraphQLContext {
  return { req, res };
}
