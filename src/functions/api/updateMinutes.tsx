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
  minutesID: string,
  chatHistoryID: string,
  topicID: number,
  topicTitle: string,
  minutes: string,
  abbreviation: any
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      abbreviation: abbreviation,
      topicID: topicID,
      topicTitle: topicTitle,
      minutes: minutes,
    };

    console.log(reqData);
    const response = await axios.post("/api/update", reqData);
    console.log(response);

    if (!response.data.agenda) {
      //update agenda error
      //call alert
      null;
    }

    if (!response.data.topic) {
      //update topic error
      //call alert
      null;
    }

    if (response.data.abbreviation != null) {
      //check if glossary is in current glossary, if not get existing glossary
      //if abbreviation alr exist in glossary, ignore (or whatever we plan to do)
      //if abbreviation doesnt exist, call alert
      var formattedGlossary = await readGlossary(minutesID, chatHistoryID);
      var respAbbMeaning = response.data.abbreviation.split(":");
      var respAbbreviation = respAbbMeaning[0].trim().toUpperCase();
      var respMeaning = respAbbMeaning[1].trim().toLowerCase();

      console.log(respAbbreviation, respMeaning);
      const exists = formattedGlossary.some(
        (item) =>
          item.meaning === respMeaning && item.abbreviation === respAbbreviation
      );

      if (exists) {
        //ignore if exist? or are we gna js alert
      } else {
        //call alert notification
      }
    }
  } catch (error) {
    return { ERROR: `Unable to update minutes, ${error.code}` };
  }
}
