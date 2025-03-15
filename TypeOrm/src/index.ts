import express, { Router } from 'express';
import { AppDataSource, initialize } from "./data-source";
import { User } from "./entity/User";
import cors from 'cors';
import router from './controller/user.controller'
import { PORT as port } from './data-source';


const app = express();
app.use(cors());
app.use(express.json());



// Initialize the database
async function start() {
    await initialize();
    app.use('/api', router);
    app.listen(port, () =>
      console.log(`Server running on port http:/localhost:${port}`))
  }
  
  start();
  
  export default app;