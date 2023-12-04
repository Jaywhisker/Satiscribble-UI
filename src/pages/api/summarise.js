import axios from 'axios'

export default async function handler(req, res) {

    try {
        const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/summarise`, req.body)
        res.status(200).json(response.data)
    }
    catch (error) {
        res.status(500).json({'error':error})
    }
  }
  