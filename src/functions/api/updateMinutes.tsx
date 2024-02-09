import axios from "axios";
import { readGlossary } from "./glossaryActions";

//updating agenda block
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


//updating meeting block
//splitting attendees string based off commas
//appending the date to the current datetime that the request was made
// TODO: Future iterations can do a fixed date format to convert the date into the datetime object
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
      //splitting participants list by commas
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
  reqData: {
    minutesID: string;
    chatHistoryID: string;
    abbreviation: string;
    topicID: number;
    topicTitle: string;
    minutes: string;
  },
  toast: any,
  agendaInaccuracyCounter: number,
  setAgendaInaccuracyCounter: any,
  topicInaccuracyCounter: number,
  setTopicInaccuracyCounter: any,
  onAddTopicArea: () => void,
  ignoreAlerts: boolean
) {
  try {
    if (reqData.minutes.length <= 0) {
      console.log("No minutes, ignoring function call");
      return undefined;
    }

    const response = await axios.post("/api/update", reqData);

    if (!response.data.agenda && !ignoreAlerts) {
      //update agenda error
      //call alert
      var agendaAlert = toast.alertContainer.filter(
        (alert) => alert.type === "agenda"
      );

      //track agenda
      if (agendaAlert.length < 1) {
        toast.agenda(
          false,
          agendaInaccuracyCounter,
          setAgendaInaccuracyCounter
        );
      }
    }

    if (!response.data.topic && !ignoreAlerts) {
      //update topic error
      //call alerts
      var topicAlert = toast.alertContainer.filter(
        (alert) => alert.type === "changeTopic"
      );

      if (topicAlert.length < 1) {
        toast.changeTopic(
          false,
          topicInaccuracyCounter,
          setTopicInaccuracyCounter,
          onAddTopicArea
        );
      }
    }

    if (response.data.abbreviation != null) {
      //check if glossary is in current glossary, if not get existing glossary
      //if abbreviation alr exist in glossary, ignore (or whatever we plan to do)
      //if abbreviation doesnt exist, call alert
      var formattedGlossary = await readGlossary(
        reqData.minutesID,
        reqData.chatHistoryID
      );
      var respAbbMeaning = response.data.abbreviation.split(":");
      console.log(respAbbMeaning)
      var respAbbreviation = respAbbMeaning[0].trim().toUpperCase();
      var respMeaning = respAbbMeaning[1].trim().toLowerCase();

      const exists = formattedGlossary.some((item) => {
        return (
          item.meaning === respMeaning && item.abbreviation === respAbbreviation
        );
      });

      if (exists) {
        //ignore
      } else {
        //call alert notification if no alert on this
        var existingAlert = toast.alertContainer.some(
          (item) => item.message === `${respAbbreviation} - ${respMeaning}`
        );
        if (!existingAlert) {
          toast.detectAbbrev(false, `${respAbbreviation} - ${respMeaning}`);
        }
      }
    }
  } catch (error) {
    return { ERROR: `Unable to update minutes, ${error}` };
  }
}
