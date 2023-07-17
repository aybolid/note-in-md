import { Request } from 'express';

const getTokenFromReq = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export default getTokenFromReq;
