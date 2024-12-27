import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger_output.json';
import bodyParser from 'body-parser';
import { userRoute } from './application/routers/user-route';
import { version } from '../package.json'; 

const app = express();

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api", userRoute);

app.get('/', (_req: Request, res: Response) => {
  res.send(`Version v${version}`)
})

export default app 