import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';


const helloAPI = async (req, res) => {
  try {
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    let counter = 1
    const apiKey = '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';
    while (counter < 101) {
      const csvFile = path.join(__dirname, '../../../../output.csv');
      const csvContent = fs.readFileSync(csvFile, 'utf-8');
      const lines = csvContent.split('\n');
      const results = [];
      lines.forEach((line, index) => {
        results.push(`Line ${index + 1}: ${line}`);
      });

      // Your OpenAI API endpoint
      const openai = new OpenAI({ apiKey: apiKey });
      
      const prompt = `
      I am learning how to code, I have about 6 months to two years worth of experience learning on my own.
      I would like to build a project for my portfolio. I want this project to be non-generic, 
      by this, I mean I don't want to build a todo list (this is generic, doesn't solve any real-world problems 
      and will not help me stand out as a candidate).
      I would ideally like to build a project I can treat like a product, in the sense that it solves a real-world problem, 
      is something companies would find interesting enough to stand out in a sea of applications and is something I can test with live users.
      Please generate a project idea for me in the fintech space that would be easy enough for me to complete within a month, 
      return only a one-liner of the project idea.
      In coming up with a project prioritize:
      - novelty: does this solve a problem in a way that is unique and could actually be of enough value to receive paying users
      - saturated: avoid ideas that are common, this will not help me stand out (e.g an expense tracker and cryptocurrency portfolio trackers are all example of very common projects). 
      Think about the entire fintech space and identify problems that do not have an abundance of pre-existing solutions.
      - market relevance: prioritize an idea that is likely to help me stand out to recruiters and developers operating in the space I mentioned
      - practicality: the product must be practical and something I can ideally use in everyday life (or a group of people can use)
      Lean towards ideas that aren't overly complicated, I believe the most value often comes from the most simple things
      Expected output
      I expect the output to be once sentence in this format:
      [Project Idea]: [Very short description]
      Do not include any of these or any ideas similar to any of these:
    `;    
      // Make a request to OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt+' '+results }, 
        ],
      });
  
      // async function main() {
      //   const completion = await openai.chat.completions.create({
      //     messages: [{ role: "system", content: "You are a helpful assistant." }],
      //     model: "gpt-3.5-turbo",
      //   });
  
      const generatedText = completion.choices[0].message.content;
      console.log('generated', generatedText);
  
      // Write the generated text to a CSV file
      const csvFilePath = 'output.csv';
      fs.appendFileSync(csvFilePath, generatedText + '\n', 'utf-8');
      console.log(`CSV file updated with output for counter: ${counter}`);
      counter++;
    }
    res.status(200).json({ message: 'CSV file generated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default helloAPI;
