import axios from 'axios'

// read chatHistory document and web 
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
        console.log("Error retrieving chathistory", error)
        return {'document': [], 'web': []}
      }
}

// read the Glossary entries
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
      
        //Sorting the abbreviations by alphabetical order
        if (abbreviationA < abbreviationB) {
          return -1;
        }
        if (abbreviationA > abbreviationB) {
          return 1;
        }
        return 0;
      });
    setGlossaryData(sortedGlossary)
    //Returns the number of entries as we are using it to populate use state
    return sortedGlossary.length
  } catch (error) {
      console.log("Error retrieving glossary", error)
      return 0
  }
}