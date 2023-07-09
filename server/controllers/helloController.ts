import { Request, Response } from 'express'

const sayHello = (_req: Request, res: Response) => {
  res.send('Hello Sanya!')
}

export default { sayHello }
