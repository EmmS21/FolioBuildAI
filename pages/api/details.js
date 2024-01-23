import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';


const detailsAPI = async (req, res) => {
  try {
    let counter = 1
    let fileCounter = 4
    const apiKey = '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';
    const csvFile = path.join(__dirname, '../../../../output.csv');
    const csvContent = fs.readFileSync(csvFile, 'utf-8');
    let selectedLine = counter
    const csvLines = csvContent.split('\n');
    while(counter <= 58) {
        selectedLine = csvLines[counter - 1];
        const folderName = `folder_${counter}`;
        const folderPath = path.join(__dirname, '../../../../', folderName); 
        try {
          fs.mkdirSync(folderPath);
          console.log(`Folder '${folderName}' created successfully in the root of the project.`);
        } catch (error) {
          console.error('Error creating folder:', error.message);
        }
        const fileName = `file_${fileCounter}.csv`;
        const filePath = path.join(__dirname, '../../../../', fileName);  
        
        try {
            const openai = new OpenAI({ apiKey: apiKey });
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          console.log(`File '${fileName}' found`);
          const numberedLines = fileContent.split('\n');

          for (const [index, line] of numberedLines.entries()) {
              const lineMatches = line.match(/^\d+\./);

              if (lineMatches) {
                  const numberedFileName = `line_${index}.csv`;
                  const numberedFilePath = path.join(folderPath, numberedFileName);
                  const prompt = `
                      Pretend you are a very experienced Engineering Manager who has to write tickets you will distribute to your team of junior engineers to build out this feature. Detail this ticket and include:
      
                      Description: [What is the feature][Why is it important][What are barriers we may encounter][What will this feature do]
                      Links: For this include links to valid websites with resources to help in building this feature, include learning material that may be helpful in troubleshooting problem areas
                      Story Points: Estimate how complex this feature would be and give out points based on this (the higher the score, the more complex it will be)
                      Steps: a language and tool agnostic step by step breakdown all what would need to be implemented
                      Tests: Include in writing, every unit test we would need to write for this feature to thoroughly test it. Detail what the test would test for, why it is important and what to consider when writing this test. Include a short write up for things we do not need to worry about testing
                      Expected Behavior: detail the functionality this feature will be expected to do

                      Include the title of the project
                      `;
                  const completion = await openai.chat.completions.create({
                      model: 'gpt-3.5-turbo',
                      messages: [
                      { role: 'system', content: 'You are a helpful assistant.' },
                      { role: 'user', content: `For this project: ${selectedLine} and this specific ticket: ${line} ${prompt}` }, 
                      ],
                  });
                  const generatedText = completion.choices[0].message.content;
      
                  fs.writeFileSync(numberedFilePath, generatedText, 'utf-8');
                  console.log(`Project: ${selectedLine} File '${numberedFileName}' created in folder '${folderName}' with content: ${line}`);
              }
          }          
        } catch (error) {
          console.error(`Error reading file '${fileName}':`, error.message);
        }
        counter++
        fileCounter++
        console.log('done with', counter)
    }   
    res.status(200).json({ message: selectedLine });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default detailsAPI;
