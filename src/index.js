import express from 'express';
import cors from 'cors';
import client from './database/index.js';
import { getUsers, getUsersById, createUsers, updateUser, deleteUser } from './queries/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

client.connect();

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'hello world',
  });
});

//read
app.get('/users', getUsers);

//read
app.get('/users/:id', getUsersById);

//create
app.post('/users', createUsers);


//update
app.put('/users/:id', updateUser);

//delete
app.delete('/users/:id', deleteUser);

app.listen(port, () => {
  console.log(`Server connected at http://localhost:${port}`);
});
