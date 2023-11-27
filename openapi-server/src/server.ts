import * as yaml from 'yaml';
import * as fs from 'fs';

const swaggerDocument = yaml.parse(fs.readFileSync('./src/api/openapi.yaml', 'utf8'));

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as routes from './api/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', routes.healthHandler);
app.get('/protected', routes.protectedHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
