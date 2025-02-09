import axios from 'axios'

export async function fetchChatHistory(minutesID:string, chatHistoryID:string, setDocumentChatHistory:any, setWebChatHistory:any) {
    try{
      var reqData = {
        "minutesID" : minutesID,
        "chatHistoryID": chatHistoryID,
        "type": "chatHistory"
      }

      const response = await axios.post('/api/read', reqData)
      setDocumentChatHistory(response.data.document)
      setWebChatHistory(response.data.web)
    } catch (error) {
        console.log("Error reading history", error)
        return {'document': [], 'web': []}
      }
}

export async function fetchGlossary(minutesID:string, chatHistoryID:string, setGlossaryData:any) {
  try {
    var reqData = {
      "minutesID" : minutesID,
      "chatHistoryID": chatHistoryID,
      "type": "glossary"
    }

    const response = await axios.post('/api/read', reqData)
    const sortedGlossary = response.data.glossary.sort((a, b) => {
        const abbreviationA = a.abbreviation.toUpperCase();
        const abbreviationB = b.abbreviation.toUpperCase();
      
        if (abbreviationA < abbreviationB) {
          return -1;
        }
        if (abbreviationA > abbreviationB) {
          return 1;
        }
        return 0;
      });
    setGlossaryData(sortedGlossary)
    return sortedGlossary.length
  } catch (error) {
      console.log("Error reading glossary", error)
      return 0
  }
}