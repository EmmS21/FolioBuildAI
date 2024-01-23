import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';


const ticketsAPI = async (req, res) => {
  try {
    let counter = 1
    const apiKey = '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';
    const csvFile = path.join(__dirname, '../../../../output.csv');
    const csvContent = fs.readFileSync(csvFile, 'utf-8');
    const csvLines = csvContent.split('\n');
    while (counter <= csvLines.length) {
      const selectedLine = csvLines[counter - 1]

      // Your OpenAI API endpoint
      const openai = new OpenAI({ apiKey: apiKey });

      console.log('line ***', selectedLine)
      
      const prompt = `            
      Pretend you are a very experienced Engineering Manager who has to break this build into tickets that you will distribute to your engineering team. Break this project down into tickets detailing everything needed to be built for this project.
      
      Assume that our priority is to build a functional MVP. We want the MVP to be functional enough for users to start testing our product so we need to prioritize the most important features.
      
      The tickets should be detailed enough for engineers to understand what needs to be done. Be as thorough as possible, break every single small task into a ticket. I would expect at least 30 tickets (eg. if the task is implementing user registration this would be multiple tickets such as; 1. building the form (frontend), 2. setting up the models to handle user authentication 3. connecting the form to the backend and all functions required to do this 4. designing the database to handle the data we store when a user signs-up)
      
      I want the tickets to all ultimately fall under 4-6 headers:
      - Design
      - frontend
      - database
      - backend
      - machine_learning (show this where applicable. keeping in mind this is supposed to be an MVP)
      - nfrastructure (show this where applicable ie. anything DevOps related)

      Include the name of the project so I know what project you are dealing

      In terms of the format, please number each ticket incrementally. Only number the tickets listed under the the 4-6 headers and nothing else. For Example:

      Design
      1. Example
      2. Example

      Frontend
      3. Example
      4. Example
      
      ...
      
      Remember that is is important to build DRY components (for buttons that will likely be the same, merge these into a ticket to build buttons/cards and state that these will be reusable and where we would use these)
      
      Keep in mind that the priority is to build a functional MVP, we need to prioritize the simplest form of this platform required for us to start testing it with live users, anything related to cloud for example would likely be overkill (and most DevOps things - include this only when absolutely necessary). Return only the topics and tickets (no introductory or conclusion paragraph)
      `;
         
      // Make a request to OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `For this project: ${selectedLine} ${prompt}` }, 
        ],
      });
  
      const generatedText = completion.choices[0].message.content;
      res.status(200).json({ message: selectedLine });
  
      // Write the generated text to a CSV file
      const newCsvFilePath = `file_${counter}.csv`;
      fs.writeFileSync(newCsvFilePath, generatedText, 'utf-8');
      console.log(`New CSV file generated: ${newCsvFilePath}`);
      counter++;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default ticketsAPI;
