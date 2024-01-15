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
  alertCounters: number[],
  setalertCounters: any,
  ignoreAlerts: boolean,
) {
  try {
    if (reqData.minutes.length <= 0) {
      console.log('No minutes, ignoring function call')
      return undefined
    }

    const response = await axios.post("/api/update", reqData);
    console.log(response);
    
    let newAlertCounters = [...alertCounters] || []
    if (!response.data.agenda && !ignoreAlerts) {
      //update agenda error
      //call alert
      var agendaAlert = toast.alertContainer.filter(
        (alert) => alert.type === "agenda"
      )

      //track agenda
      // if (agendaAlert.length < 1 && alertCounters !== undefined && alertCounters[0] === 2) {
      if (agendaAlert.length < 1) {
        toast.agenda(agendaInaccuracyCounter, setAgendaInaccuracyCounter)
        newAlertCounters[0] = 0
      } else {
        newAlertCounters[0] += 1
      }
    }

    if (!response.data.topic && !ignoreAlerts) {
      //update topic error
      //call alerts
      var topicAlert = toast.alertContainer.filter(
        (alert) => alert.type === "changeTopic"
      )

      //only show the notification when above 3 topic
      if (topicAlert.length < 1 && alertCounters !== undefined && alertCounters[1] === 2) {
        toast.changeTopic(topicInaccuracyCounter, setTopicInaccuracyCounter, onAddTopicArea)
        newAlertCounters[1] = 0
      } else {
        newAlertCounters[1] += 1
      }
    }

    if (setalertCounters !== undefined) {
      console.log("alert counters", alertCounters)
      setalertCounters(newAlertCounters)
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
        //call alert notification if no alert on this
        var existingAlert = toast.alertContainer.some((item) => item.message === `${respAbbreviation} - ${respMeaning}`)
        if (!existingAlert) {
          toast.detectAbbrev(`${respAbbreviation} - ${respMeaning}`)
        }
      }
    }
  } catch (error) {
    return { ERROR: `Unable to update minutes, ${error}` };
  }
}
