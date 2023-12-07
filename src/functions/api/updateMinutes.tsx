import axios from "axios";
import { readGlossary } from "./glossaryActions";

export async function updateAgenda(
  minutesID: string,
  chatHistoryID: string,
  agenda: string[]
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      agenda: agenda,
    };

    const response = await axios.post("/api/update", reqData);
  } catch (error) {
    return { ERROR: `Unable to update Agenda Block, ${error.code}` };
  }
}

export async function updateMeetingDetails(
  minutesID: string,
  chatHistoryID: string,
  location: string,
  attendees: string
) {
  try {
    let participantList;
    if (attendees.length <= 0) {
      participantList = [];
    } else {
      participantList = attendees.split(",");
      participantList = participantList.map((str) => str.trim());
    }

    let currentDateTime = new Date();
    var formattedDateTime = currentDateTime.toISOString();

    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      data: {
        location: location,
        date: formattedDateTime,
        attendees: participantList,
      },
    };

    const response = await axios.post("/api/update", reqData);
    console.log(response);
  } catch (error) {
    return { ERROR: `Unable to update Meeting Details Block, ${error.code}` };
  }
}

export async function updateMinutes(
  reqData: {minutesID: string,
            chatHistoryID: string,
            abbreviation: string,
            topicID: number,
            topicTitle: string,
            minutes: string},
  toast:any,
  agendaInaccuracyCounter: number,
  setAgendaInaccuracyCounter:any,
  topicInaccuracyCounter:number,
  setTopicInaccuracyCounter:any,
  onAddTopicArea: () => void,
) {
  try {
    if (reqData.minutes.length <= 0) {
      console.log('No minutes, ignoring function call')
      return undefined
    }

    const response = await axios.post("/api/update", reqData);
    console.log(response);
    console.log(toast)
    
    if (!response.data.agenda) {
      //update agenda error
      //call alert
      toast.agenda(agendaInaccuracyCounter, setAgendaInaccuracyCounter)
    }

    if (!response.data.topic) {
      //update topic error
      //call alert
      toast.changeTopic(topicInaccuracyCounter, setTopicInaccuracyCounter, onAddTopicArea)

    }

    if (response.data.abbreviation != null) {
      //check if glossary is in current glossary, if not get existing glossary
      //if abbreviation alr exist in glossary, ignore (or whatever we plan to do)
      //if abbreviation doesnt exist, call alert
      var formattedGlossary = await readGlossary(reqData.minutesID, reqData.chatHistoryID);
      var respAbbMeaning = response.data.abbreviation.split(":");
      var respAbbreviation = respAbbMeaning[0].trim().toUpperCase();
      var respMeaning = respAbbMeaning[1].trim().toLowerCase();

      console.log(respAbbreviation, respMeaning);
      console.log(formattedGlossary);
      const exists = formattedGlossary.some((item) => {
        return item.meaning === respMeaning && item.abbreviation === respAbbreviation;
      });

      if (exists) {
        //ignore if exist? or are we gna js alert
      } else {
        //call alert notification
        toast.detectAbbrev(`${respAbbreviation} - ${respMeaning}`)
      }
    }
  } catch (error) {
    return { ERROR: `Unable to update minutes, ${error}` };
  }
}
