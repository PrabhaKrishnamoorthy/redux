import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb3',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Error retrieving users' });
      return;
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    // Return an error response if the name is missing or empty
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  connection.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'Error adding user' });
      }
      res.json(results);
    }
  );
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  connection.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
    (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
        return;
      }
      res.json(results);
    }
  );
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user' });
      return;
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
