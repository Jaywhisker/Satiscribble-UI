import axios from 'axios'

export default async function handler(req, res) {
    try {
        const response = await axios.get(`${process.env.PYTHON_BACKEND_AI_URI}/create`)
        res.status(200).json(response.data)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({'error':error})
    }
  }
  