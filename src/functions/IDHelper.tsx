import axios from 'axios'

// Check if there is any chatHistoryID and minutesID existing in the software
// If there are none, initialise a new chatHistoryID and minutesID to update the database
export async function readID(setMinutesID:any, setChatHistoryID:any) {
    var minutesID = localStorage.getItem("minutesID");
    var chatHistoryID = localStorage.getItem("chatHistoryID")
    if (minutesID === null || chatHistoryID === null) {
        const response = await initialiseID()
        setMinutesID(response.minutesID)
        setChatHistoryID(response.chatHistoryID)
    }
    else {
        console.log("Existing IDs found", {"minutesID": minutesID, "chatHistoryID":chatHistoryID})
        setMinutesID(minutesID)
        setChatHistoryID(chatHistoryID)
    }
}

// Calls the backend to create a brand new database entry for minutes and chatHistory
async function initialiseID() {
    const response = await axios.get('/api/create')
    const newIDs = response.data
    localStorage.setItem("minutesID", newIDs.minutesID)
    localStorage.setItem("chatHistoryID", newIDs.chatHistoryID)
    return newIDs
}