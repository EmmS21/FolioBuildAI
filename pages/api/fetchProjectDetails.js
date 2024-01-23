import { Pool } from 'pg';

const pool = new Pool({
    user: 'zxakoedw',
    host: 'mahmud.db.elephantsql.com',
    database: 'zxakoedw',
    password: 'YadefOtS3HuSvKQgUr92dFy98aICHoiN',
    port: 5432, 
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const { tableName } = req.body;
        if (!tableName.match(/^[a-z0-9_]+_details$/)) {
            return res.status(400).json({ error: 'Invalid table name' });
        }
        const queryResult = await pool.query(`SELECT * FROM "${tableName}"`);
        res.status(200).json(queryResult.rows);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
