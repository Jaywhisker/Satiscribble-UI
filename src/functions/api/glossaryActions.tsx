import axios from 'axios'

export async function createGlossaryEntry(minutesID:string, chatHistoryID:string, abbreviation:string, meaning:string) {
    try {
        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "type": "new",
            "abbreviation": abbreviation,
            "meaning": meaning
        }

        const response = await axios.post('/api/glossary', reqData)
    } 
    catch (error) {
        return {"ERROR": `Unable to create glossary entry, ${error.code}`}
    }
}

export async function updateGlossaryEntry(minutesID:string, chatHistoryID:string, abbreviation:string, meaning:string) {
    try {
        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "type": "update",
            "abbreviation": abbreviation,
            "meaning": meaning
        }

        const response = await axios.post('/api/glossary', reqData)
    } 
    catch (error) {
        return {"ERROR": `Unable to update glossary entry, ${error.code}`}
    }
}

export async function deleteGlossaryEntry(minutesID:string, chatHistoryID:string, abbreviation:string, meaning:string) {
    try {
        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "type": "delete",
            "abbreviation": abbreviation,
            "meaning": meaning
        }

        const response = await axios.post('/api/glossary', reqData)
        
    } 
    catch (error) {
        return {"ERROR": `Unable to delete glossary entry, ${error.code}`}
    }
}


export async function readGlossary(minutesID:string, chatHistoryID:string) {
    //reads glossary and essentially returns the abbreviation in caps and the meaning in lower case
    var reqData = {
        "minutesID" : minutesID,
        "chatHistoryID": chatHistoryID,
        "type": "glossary"
    }

    const response = await axios.post('/api/read', reqData)
    const formattedGlossary = response.data.glossary.map((data) => {data.meaning.toLowerCase();
                                                                data.abbreviation.toUpperCase()})
    return formattedGlossary
}