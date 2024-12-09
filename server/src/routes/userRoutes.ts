// import { Router, Response } from 'express';
// import { pool } from '../services/connection';
// import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

// const router = Router();

// router.get(
//   '/profile',
//   authMiddleware,
//   async (req: AuthRequest, res: Response): Promise<void> => {
//     if (!req.user) {
//       res.status(401).json({ error: 'Not authorized' });
//       return;
//     }

//     try {
//       const [rows] = await pool.query(
//         'SELECT id, first_name, last_name, username, favorite_driver, favorite_team, created_at FROM users WHERE id = ?',
//         [req.user.id]
//       );
//       const userRows = Array.isArray(rows) ? rows : [];
//       if (userRows.length === 0) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//       }
//       res.json(userRows[0]);
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   }
// );

// export default router;

import { Router, Response } from 'express';
import { pool } from '../services/connection';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

const router = Router();

/**
 * Define a full user row interface based on the fields you expect
 * from the `users` table. This should match the columns you select.
 */
interface UserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  favorite_driver: string | null;
  favorite_team: string | null;
  created_at: Date;
}

/**
 * Define a minimal interface for queries that only return `username`.
 * Extending `RowDataPacket` ensures the query returns rows with
 * the correct shape.
 */
interface UsernameRow extends RowDataPacket {
  username: string;
}

/**
 * Define a minimal interface for queries that only return `id`.
 */
interface IdRow extends RowDataPacket {
  id: number;
}

/**
 * GET /api/user/profile
 */
router.get(
  '/profile',
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    try {
      const [rows] = await pool.query<UserRow[]>(
        `SELECT id, first_name, last_name, username, favorite_driver, favorite_team, created_at
         FROM users WHERE id = ?`,
        [req.user.id]
      );

      if (rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(rows[0]);
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * PUT /api/user/profile
 */
router.put(
  '/profile',
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const { first_name, last_name, username, favorite_driver, favorite_team } = req.body;

    if (!first_name || !last_name || !username) {
      res.status(400).json({ error: 'Missing required fields: first_name, last_name, username' });
      return;
    }

    try {
      // Fetch current username
      const [currentRows] = await pool.query<UsernameRow[]>(
        'SELECT username FROM users WHERE id = ?',
        [req.user.id]
      );

      if (currentRows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const currentData = currentRows[0];

      // If username changed, check if the new one is already taken
      if (currentData.username !== username) {
        const [existingRows] = await pool.query<IdRow[]>(
          'SELECT id FROM users WHERE username = ?',
          [username]
        );

        if (existingRows.length > 0) {
          res.status(400).json({ error: 'Username already in use' });
          return;
        }
      }

      // Update the user record
      await pool.query<OkPacket | ResultSetHeader>(
        `UPDATE users
         SET first_name = ?, last_name = ?, username = ?, favorite_driver = ?, favorite_team = ?
         WHERE id = ?`,
        [first_name, last_name, username, favorite_driver || null, favorite_team || null, req.user.id]
      );

      res.status(200).json({ message: 'User updated successfully' });
    } catch (err: any) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * DELETE /api/user/profile
 */
router.delete(
  '/profile',
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    try {
      const [result] = await pool.query<OkPacket | ResultSetHeader>(
        'DELETE FROM users WHERE id = ?',
        [req.user.id]
      );

      // The result for DELETE is typically an OkPacket or ResultSetHeader
      const deleteResult = result as OkPacket; // casting since we know it's a delete operation

      if (deleteResult.affectedRows === 0) {
        res.status(404).json({ error: 'User not found or already deleted' });
        return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
