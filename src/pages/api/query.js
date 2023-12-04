import axios from 'axios'

export default async function handler(req, res) {
    if (req.body.requestData['type'] == 'web') {
        try{
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/web_query`, 
            req.body.requestData,
            {responseType: 'stream',
        })
            res.status(200);
            
            response.data.pipe(res)
            response.data.on('end', () => {
                res.end();
            })
        } catch (error){
            console.log(error)
            res.status(500).end()
        }
    } else if (req.body.requestData['type'] == 'document') {
        try{
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/document_query`, 
            req.body.requestData,
            {responseType: 'stream',}
            )
            res.setHeader('SourceID', response.headers['source_id']);
            res.status(200);
            console.log(response.headers)
            response.data.pipe(res)
            response.data.on('end', () => {
                res.end();
            })
        } catch (error){
            console.log(error)
            res.status(500).end()
        }
    }
}
