import client from '../database/index.js';

export const getUsers = async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM users ORDER BY id ASC');

    if (response) {
      return res.status(200).json({ status: 'success', data: response.rows });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if(error) throw error;
      res.status(200).json(results.rows);
  });
}

export const createUsers = (req, res) => {
  const { name, email } = req.body;

  client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if(error) throw error;
      res.status(201).send('User created successfully!');
  });
}

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  client.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, id], (error, results) => {
      if(error) throw error;
      res.status(200).send(`User modified with ID: ${id}`);
  });
}

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  client.query('DELETE FROM users WHERE id=$1', [id], (error, results) => {
      if(error) throw error;
      res.status(200).send(`User deleted with ID: ${id}`);
  });
}

