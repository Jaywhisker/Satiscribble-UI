import axios from "axios";

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
    console.log(location, attendees);

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

    // Insert the update agenda below

    // Why are we calling the update agenda?
    console.log(reqData);
    const response = await axios.post("/api/update", reqData);
    console.log(response);

    // After getting the responses do something with it

    var gloReqData = {
      type: "glossary",
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
    };

    const glossary = await axios.post("/api/read", gloReqData);
    console.log(glossary.data.glossary);

    if (!response.data.agenda) {
      //update agenda error
      // Honestly what are we suppose to do if false hahaha
      // call alert?
      null;
    }

    if (!response.data.topic) {
      //update topic error
      // Honestly what are we suppose to do if false hahaha
      // call alert?
      null;
    }
    console.log("Hmmm");
    if (response.data.abbreviation != null) {
      //update glossary
      console.log("gloosary thing");
      const splitString = response.data.abbreviation
        .split(":")
        .map((part) => part.trim());
      console.log(splitString);

      const isNotAbbreviation = glossary.data.glossary.every(
        (item) => item.abbreviation !== splitString[0]
      );

      if (isNotAbbreviation) {
        var newGlossaryData = {
          minutesID: minutesID,
          chatHistoryID: chatHistoryID,
          abbreviation: splitString[0],
          meaning: splitString[1],
          type: "new",
        };

        const responseOnG = await axios.post("/api/glossary", newGlossaryData);
        console.log(responseOnG);
        // Add it
      } else {
        // Idk what to do honestly?
        // overwrite?
      }
    }
  } catch (error) {
    return { ERROR: `Unable to delete glossary entry, ${error.code}` };
  }
}
