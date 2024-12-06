import { Router, Request, Response } from 'express';
import { pool } from '../services/connection'; // Ensure this uses mysql2/promise
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { RowDataPacket } from 'mysql2';

const router = Router();

interface RegisterRequestBody {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  favorite_driver?: string;
  favorite_team?: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

type RegisterRequest = Request<{}, {}, RegisterRequestBody>;
type LoginRequest = Request<{}, {}, LoginRequestBody>;

router.post('/register', async (req: RegisterRequest, res: Response) => {
  const { first_name, last_name, username, password, favorite_driver, favorite_team } = req.body;

  console.log('Incoming register request body:', req.body);

  if (!first_name || !last_name || !username || !password) {
    console.error('Missing required fields in register request body:', req.body);
    res.status(400).json({ error: 'Missing required fields: first_name, last_name, username, password' });
    return;
  }

  try {
    console.log('Checking if username already exists:', username);
    const [existingRows] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    console.log('Result of existing username check:', existingRows);

    if (existingRows.length > 0) {
      console.warn('Username already in use:', username);
      res.status(400).json({ error: 'Username already in use' });
      return;
    }

    console.log('Hashing password for new user:', username);
    const hashed = await hashPassword(password);
    console.log('Hashed password:', hashed);

    console.log('Inserting new user into database...');
    await pool.query(
      `INSERT INTO users (first_name, last_name, username, password, favorite_driver, favorite_team)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, username, hashed, favorite_driver || null, favorite_team || null]
    );
    console.log('User inserted successfully into database.');

    res.status(201).json({ message: 'User created successfully' });
  } catch (err: any) {
    console.error('Error in register route:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req: LoginRequest, res: Response) => {
  const { username, password } = req.body;

  console.log('Incoming login request body:', req.body);

  if (!username || !password) {
    console.error('Missing username or password in login request:', req.body);
    res.status(400).json({ error: 'Missing username or password' });
    return;
  }

  try {
    console.log('Querying database for user:', username);
    const [userRows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    console.log('Query result for user:', userRows);

    if (userRows.length === 0) {
      console.warn('No user found with the given username:', username);
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const user = userRows[0];
    console.log('User found:', user);

    console.log('Comparing provided password with stored hash...');
    const match = await comparePassword(password, user.password);
    console.log('Password comparison result:', match);

    if (!match) {
      console.warn('Invalid password for user:', username);
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    console.log('Generating token for user:', username);
    const token = generateToken({ id: user.id, username: user.username });
    console.log('Token generated:', token);

    res.status(200).json({ token });
  } catch (err: any) {
    console.error('Error in login route:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
