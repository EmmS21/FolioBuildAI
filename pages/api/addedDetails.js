import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Database connection pool
const pool = new Pool({
    user: 'zxakoedw',
    host: 'mahmud.db.elephantsql.com',
    database: 'zxakoedw',
    password: 'YadefOtS3HuSvKQgUr92dFy98aICHoiN',
    port: 5432, 
});

const readAndProcessCSV = async (fileName, basePath) => {
    const filePath = path.join(basePath, fileName);
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const processedData = processCSVContent(fileContent);
        console.log(`Successfully processed ${fileName}`);
    } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
    }
};

const processCSVContent = (content) => {
    const headers = [
        { regex: /Project:|Title:|Project Title:/, key: 'projectTitles' },
        { regex: /Ticket:|Ticket Title:|Ticket:/, key: 'ticketTitles' },
        { regex: /Description:/, key: 'descriptions' },
        { regex: /Why is this important:/, key: 'importance' },
        { regex: /Barriers we may encounter:|Barriers:/, key: 'barriers' },
        { regex: /What will this feature do:|This feature will:/, key: 'features' },
        { regex: /Resources:|Links:|Links and Resources:/, key: 'resources' },
        { regex: /Story Points:/, key: 'storyPoints' },
        { regex: /Steps:/, key: 'steps' },
        { regex: /Tests:/, key: 'tests' },
        { regex: /Expected Behavior:/, key: 'expectedBehavior' },
        { regex: /Note:|Notable Considerations:|Things we do not need to worry about testing:/, key: 'notes' }
    ];

    const result = headers.reduce((acc, header) => ({ ...acc, [header.key]: [] }), {});

    let currentKey = null;
    let currentItem = '';
    let isNumberedPoint = false;

    content.split('\n').forEach((line, index, arr) => {
        const headerFound = headers.find(header => line.match(header.regex));
        const isNumberedLine = line.match(/^\d+\./);
        const isBulletPoint = line.trim().startsWith('-');
        const isNextLineNumbered = index + 1 < arr.length && arr[index + 1].match(/^\d+\./);

        if (headerFound) {
            if (currentItem) {
                result[currentKey].push(currentItem.trim());
                currentItem = '';
            }
            currentKey = headerFound.key;
            isNumberedPoint = false;
        } else if (currentKey && line.trim()) {
            if (isNumberedLine) {
                if (currentItem) {
                    result[currentKey].push(currentItem.trim());
                }
                currentItem = line.trim();
                isNumberedPoint = true;
            } else if (isBulletPoint && isNumberedPoint && !isNextLineNumbered) {
                currentItem += `\n${line.trim()}`;
            } else if (!isBulletPoint || isNextLineNumbered) {
                if (currentItem) {
                    result[currentKey].push(currentItem.trim());
                    currentItem = '';
                }
                currentItem = line.trim();
                isNumberedPoint = false;
            }
        }
    });

    if (currentItem) {
        result[currentKey].push(currentItem.trim());
    }

    return result;
};

const addedDetailsAPI = async () => {
    const tableNamesPath = path.join(__dirname, '../../../../tableNames.csv');
    const outputCSVPath = path.join(__dirname, '../../../../output.csv');

    try {
        const tableNamesContent = fs.readFileSync(tableNamesPath, 'utf-8');
        const tableNames = tableNamesContent.split('\n');

        const outputContent = fs.readFileSync(outputCSVPath, 'utf-8');
        const outputLines = outputContent.split('\n');

        let baseFileCount = 11;
        let folderCount = 8;

        for (let i = 0; i < tableNames.length; i++) {
            const tableName = tableNames[i].trim() + '_details';
            const projectTitle = outputLines[i].trim();

            if (tableName && projectTitle) {
                console.log(`Processing table: ${tableName} with project title: ${projectTitle}`);

                await pool.query(`DROP TABLE IF EXISTS ${tableName};`);
                await pool.query(`
                    CREATE TABLE ${tableName} (
                        project_title TEXT,
                        ticket_title TEXT,
                        description TEXT,
                        importance TEXT,
                        barriers TEXT,
                        feature TEXT,
                        links_and_resources TEXT,
                        story_points TEXT,
                        steps TEXT,
                        tests TEXT,
                        expected_behavior TEXT,
                        notes TEXT,
                        category TEXT
                    );
                `);
                console.log(`Table ${tableName} created successfully.`);

                const baseFileName = `file_${baseFileCount}.csv`;
                const basePath = path.join(__dirname, '../../../../');
                const baseFilePath = path.join(basePath, baseFileName);
                const baseFileContent = fs.readFileSync(baseFilePath, 'utf-8');
                const lines = baseFileContent.split('\n');
                let counter = 0;
                let currentHeader = "Unknown";

                for (const line of lines) {
                    let headerFound = ["Design:", "Frontend:", "Database:", "Backend:", "Machine Learning:", "Infrastructure:"].find(header => line.startsWith(header));
                    if (headerFound) {
                        currentHeader = headerFound.replace(':', ''); 
                    }

                    if (line.match(/^\d+\./)){
                        counter++;
                        const folderFileName = `line_${counter}.csv`;
                        const folderFilePath = path.join(basePath, `folder_${folderCount}`, folderFileName);
                        
                        try {
                            const folderFileContent = fs.readFileSync(folderFilePath, 'utf-8');
                            const processedData = processCSVContent(folderFileContent);

                            const numRows = Math.max(...Object.values(processedData).map(arr => arr.length));
                            for(let i = 0; i < numRows; i++) {
                                const rowData = {
                                    project_title: projectTitle,
                                    ticket_title: line,
                                    description: processedData.descriptions[i] || 'NULL',
                                    importance: processedData.importance[i] || 'NULL',
                                    barriers: processedData.barriers[i] || 'NULL',
                                    feature: processedData.features[i] || 'NULL',
                                    links_and_resources: processedData.resources[i] || 'NULL',
                                    story_points: processedData.storyPoints[i] || 'NULL',
                                    steps: processedData.steps[i] || 'NULL',
                                    tests: processedData.tests[i] || 'NULL',
                                    expected_behavior: processedData.expectedBehavior[i] || 'NULL',
                                    notes: processedData.notes[i] || 'NULL',
                                    category: currentHeader
                                };
                                await pool.query(`
                                    INSERT INTO ${tableName} (project_title, ticket_title, description, importance, barriers, feature, links_and_resources, story_points, steps, tests, expected_behavior, notes, category)
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                                    `, Object.values(rowData));
                            }
                            console.log(`Successfully wrote contents of ${folderFileName} into ${tableName}.`);
                        } catch (readErr) {
                            console.error(`Error reading file ${folderFileName}:`, readErr);
                        }
                    }
                }

                baseFileCount++;
                folderCount++;
            }
        }
        console.log('Completed processing all tables and output.csv contents.');
    } catch (err) {
        console.error('Error during the process:', err);
    }
};

addedDetailsAPI();

export default addedDetailsAPI;

