import axios from 'axios'

export async function readID(setMinutesID:any, setChatHistoryID:any) {
    var minutesID = localStorage.getItem("minutesID");
    var chatHistoryID = localStorage.getItem("chatHistoryID")
    if (minutesID === null || chatHistoryID === null) {
        const response = await initialiseID()
        setMinutesID(response.minutesID)
        setChatHistoryID(response.chatHistoryID)
    }
    else {
        setMinutesID(minutesID)
        setChatHistoryID(chatHistoryID)
    }
}

async function initialiseID() {
        try {
            const response = await axios.get('/api/create')
            const newIDs = response.data
            localStorage.setItem("minutesID", newIDs.minutesID)
            localStorage.setItem("chatHistoryID", newIDs.chatHistoryID)
            return newIDs
        }
        catch (error) {
            console.log(error)
            return null
        }
}