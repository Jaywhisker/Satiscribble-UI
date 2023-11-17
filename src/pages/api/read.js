import axios from 'axios'

export default async function handler(req, res) {

    const requestBody = {
        "minutesID" : req.body.minutesID,
        "chatHistoryID" : req.body.chatHistoryID
    }

    if (req.body.type == 'chatHistory') {
        try {
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/read_history`, requestBody)
            res.status(200).json(response.data)
        }
        catch (error) {
            console.log(error)
            res.status(500)
        }
    }

    else if (req.body.type == 'glossary') {
        try {
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/read_glossary`, requestBody)
            res.status(200).json(response.data)
        }
        catch (error) {
            console.log(error)
            res.status(500)
        }
    }

    else{
        res.status(500).json({"error": "Non acceptable type"})
    }
  }
  