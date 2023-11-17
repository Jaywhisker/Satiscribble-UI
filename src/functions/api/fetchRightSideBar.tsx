import axios from 'axios'

export async function fetchChatHistory(minutesID:string, chatHistoryID:string, setDocumentChatHistory:any, setWebChatHistory:any) {
    var reqData = {
        "minutesID" : minutesID,
        "chatHistoryID": chatHistoryID,
        "type": "chatHistory"
    }

    const response = await axios.post('/api/read', reqData)
    setDocumentChatHistory(response.data.document)
    setWebChatHistory(response.data.web)
}

export async function fetchGlossary(minutesID:string, chatHistoryID:string, setGlossaryData:any) {
    var reqData = {
        "minutesID" : minutesID,
        "chatHistoryID": chatHistoryID,
        "type": "glossary"
    }

    const response = await axios.post('/api/read', reqData)
    setGlossaryData(response.data.glossary)
    return response.data.glossary.length
}