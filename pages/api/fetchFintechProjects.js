import { Pool } from 'pg';

const pool = new Pool({
    user: 'zxakoedw',
    host: 'mahmud.db.elephantsql.com',
    database: 'zxakoedw',
    password: 'YadefOtS3HuSvKQgUr92dFy98aICHoiN', // Replace with your actual password
    port: 5432, 
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const queryResult = await pool.query('SELECT * FROM fintech_projects');
      res.status(200).json(queryResult.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
