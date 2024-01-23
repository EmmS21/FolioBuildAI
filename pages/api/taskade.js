import axios from 'axios';
import Cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your front-end origin
    optionsSuccessStatus: 200,
  };

  const runMiddleware = (req, res, fn) => {
    const corsMiddleware = Cors(corsOptions);
    return new Promise((resolve, reject) => {
      corsMiddleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  };
  

export default async function handler(req, res) {
    await runMiddleware(req, res);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const baseUrl = 'https://api.taskade.com/v1';
    const url = `${baseUrl}/workspaces`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer tskdp_sZN3QuELh3kn14LZmweTFJQTRf5HWjtfcj`, // Replace YOUR_API_KEY with your actual API key
                'accept': 'application/json',
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in GET request:', error);
        res.status(error.response?.status || 500).json(error.response?.data || "Internal server error");
    }
}


// export default async function handler(req, res) {
//     await runMiddleware(req, res);
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     let url;
//     const baseUrl = 'https://api.taskade.com/v1';
//     const { type, workspaceId, apiKey, title, description } = req.body;

//     switch (type) {
//         case 'createWorkspace':
//             url = `${baseUrl}/workspaces`;
//             break;
//         case 'getWorkspaces':
//             url = `${baseUrl}/workspaces`;
//             break;
//         case 'createProject':
//             url = `${baseUrl}/workspaces/${workspaceId}/projects`;
//             break;
//         default:
//             res.status(400).json({ message: 'Invalid request type' });
//             return;
//     }

//     try {
//         let data = {};
//         if (type === 'createProject') {
//             data = {
//                 contentType: 'text/markdown',
//                 content: `# ${title}\n\n${description}`
//             };
//         } else if (type === 'createWorkspace') {
//             data = { name: title };
//         }

//         console.log('Sending request to Taskade:', {
//             url: url,
//             method: req.method,
//             headers: {
//                 'Authorization': 'Bearer ' + {apiKey},
//                 'Content-Type': 'application/json',
//                 'User-Agent': 'PostmanRuntime/7.36.1'
//             },
//             data: data
//         });

//         const response = await axios({
//             url,
//             method: req.method,
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         });

//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error in proxy endpoint:', error);
//         if (error.response) {
//             console.error('Error response data:', error.response.data);
//             console.error('Error response status:', error.response.status);
//             console.error('Error response headers:', error.response.headers);
//         }
//         res.status(error.response?.status || 500).json(error.response?.data || "Internal server error");
//     }
// }
