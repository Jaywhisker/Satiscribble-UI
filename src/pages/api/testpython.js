import axios from 'axios'

export default async function handler(req, res) {
    try {
        const response = await axios.get(process.env.PYTHON_BACKEND_AI_URI)
        res.status(200).json(response.data)
    }
    catch {
        console.log(error)
    }
  }
  