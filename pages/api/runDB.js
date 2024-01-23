import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
    user: 'zxakoedw',
    host: 'mahmud.db.elephantsql.com',
    database: 'zxakoedw',
    password: 'YadefOtS3HuSvKQgUr92dFy98aICHoiN', // Replace with your actual password
    port: 5432, 
});

const headers = ["Design", "Frontend", "Database", "Backend", "Machine Learning", "Infrastructure"];

const extractTextUnderHeaders = (fileContent, headers) => {
    const result = {};
    headers.forEach(header => {
        const key = header.toLowerCase().replace(/\s+/g, '_');
        result[key] = [];
        const headerPattern = new RegExp(`${header}:\\s*((?:\\d+\\.\\s*[^\\n]+\\s*)*)`, 'g');
        let match;
        while ((match = headerPattern.exec(fileContent)) !== null) {
            const items = match[1].trim().split('\n').map(item => item.trim());
            result[key].push(...items);
        }
    });
    return result;
};

const createAndPopulateTable = async (tableName, extractedData) => {
    try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName};`);
        await pool.query(`
            CREATE TABLE ${tableName} (
                design TEXT,
                frontend TEXT,
                database TEXT,
                backend TEXT,
                machine_learning TEXT,
                infrastructure TEXT
            );
        `);
        const numRows = Math.max(...Object.values(extractedData).map(arr => arr.length));
        for (let i = 0; i < numRows; i++) {
            const rowData = {
                design: extractedData.design[i] || 'NULL',
                frontend: extractedData.frontend[i] || 'NULL',
                database: extractedData.database[i] || 'NULL',
                backend: extractedData.backend[i] || 'NULL',
                machine_learning: extractedData.machine_learning[i] || 'NULL',
                infrastructure: extractedData.infrastructure[i] || 'NULL'
            };
            await pool.query(`
                INSERT INTO ${tableName} (design, frontend, database, backend, machine_learning, infrastructure)
                VALUES ($1, $2, $3, $4, $5, $6)
            `, Object.values(rowData));
        }

        const queryResult = await pool.query(`SELECT * FROM ${tableName};`);
        console.log(`Contents of table ${tableName}:`, queryResult.rows);

    } catch (err) {
        console.error('Error in createAndPopulateTable:', err);
        throw err;
    }
};


const runDBAPI = async () => {
    let counter = 1
    let fileCounter = 4
    const csvFile = path.join(__dirname, '../../../../tableNames.csv');
    const csvContent = fs.readFileSync(csvFile, 'utf-8');
    const csvLines = csvContent.split('\n');

    while(counter <= 58 && fileCounter <= 59) {
        const selectedLine = csvLines[counter - 1];
        const fileName = `file_${fileCounter}.csv`;
        const filePath = path.join(__dirname, '../../../../', fileName);      
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const extractedData = extractTextUnderHeaders(fileContent, headers);
        await createAndPopulateTable(selectedLine, extractedData);
        counter++
        fileCounter++
    }
};

runDBAPI();

export default runDBAPI;





