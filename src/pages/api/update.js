import axios from 'axios'

export default async function handler(req, res) {

    var requestData = req.body 
    console.log(requestData)
    
    if (requestData.hasOwnProperty('agenda')) {
        try {
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/update_agenda`, requestData)
            res.status(200).json(response.data)
        } 
        catch (error) {
            console.log(error)
            res.status(500).json({'error':error})
        }
    }

    else if (requestData.hasOwnProperty('data')) {
        try {
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/update_meeting`, requestData)
            res.status(200).json(response.data)
        }
        catch (error) {
            console.log(error)
            res.status(500).json({'error':error})
        }
    }

    else if (requestData.hasOwnProperty('topicID')) {
        try {
            const response = await axios.post(`${process.env.PYTHON_BACKEND_AI_URI}/track_minutes`, requestData)
            res.status(200).json(response.data)
        }
        catch (error) {
            console.log(error)
            res.status(500).json({'error':error})
        }
    }

    else{
        console.log("Non acceptable data")
        res.status(500).json({"error": "Non acceptable data"})
    }
  }
  