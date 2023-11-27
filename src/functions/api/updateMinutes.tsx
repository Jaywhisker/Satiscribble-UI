import axios from 'axios'

export async function updateAgenda(minutesID:string, chatHistoryID:string, agenda:string[]) {
    try {
        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "agenda": agenda,
        }

        const response = await axios.post('/api/update', reqData)
    } 
    catch (error) {
        return {"ERROR": `Unable to update Agenda Block, ${error.code}`}
    }
}

export async function updateMeetingDetails(minutesID:string, chatHistoryID:string, location:string, attendees:string) {
    try {

        console.log(location, attendees)
        
        let participantList
        if (attendees.length <= 0) {
            participantList = []
        } else {
            participantList = attendees.split(",")
            participantList = participantList.map(str => str.trim())
        }

        let currentDateTime = new Date()
        var formattedDateTime = currentDateTime.toISOString(); 

        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "data" : {
                "location": location,
                "date": formattedDateTime,
                "attendees": participantList
            }

        }

        const response = await axios.post('/api/update', reqData)
    } 
    catch (error) {
        return {"ERROR": `Unable to update Meeting Details Block, ${error.code}`}
    }
}

export async function updateMinutes(minutesID:string, chatHistoryID:string, topicID:string, topicTitle: string, minutes:string, abbreviation:string) {
    try {

        var reqData = {
            "minutesID" : minutesID,
            "chatHistoryID": chatHistoryID,
            "abbreviation": abbreviation,
            "topicID": topicID,
            "topicTitle": topicTitle,
            "minutes": minutes
        }

        const response = await axios.post('/api/glossary', reqData)
        // logic flow for response
        if (!response.agenda) {
            //update agenda error
            null
        } 

        if (!response.topic) {
            //update topic error
            null
        }

        if (response.abbreviation != null) {
            //update glossary
            null
        }
        
    } 
    catch (error) {
        return {"ERROR": `Unable to delete glossary entry, ${error.code}`}
    }
}