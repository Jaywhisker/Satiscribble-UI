// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import axios from 'axios'

export default async function handler(req, res) {
  try{
    const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/web_query`, 
    req.body.requestBody,
    {responseType: 'stream',
  })
    res.status(200);
    response.data.pipe(res)
    response.data.on('end', () => {
      console.log('Streaming completed.');
      res.end();
    })
  } catch (error){
    console.log(error)
    res.status(500).end()
  }
}
