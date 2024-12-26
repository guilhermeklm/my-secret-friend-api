import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger_output.json';
import bodyParser from 'body-parser';
import { userRoute } from './application/routers/user-route';

const app = express();

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(userRoute)

export default app 