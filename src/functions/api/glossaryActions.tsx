import axios from "axios";

//create new glossary entry
export async function createGlossaryEntry(
  minutesID: string,
  chatHistoryID: string,
  abbreviation: string,
  meaning: string
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      type: "new",
      abbreviation: abbreviation,
      meaning: meaning,
    };

    const response = await axios.post("/api/glossary", reqData);
  } catch (error) {
    return { ERROR: `Unable to create glossary entry, ${error.code}` };
  }
}

//updating existing glossary entry
export async function updateGlossaryEntry(
  minutesID: string,
  chatHistoryID: string,
  abbreviation: string,
  meaning: string
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      type: "update",
      abbreviation: abbreviation,
      meaning: meaning,
    };

    const response = await axios.post("/api/glossary", reqData);
  } catch (error) {
    return { ERROR: `Unable to update glossary entry, ${error.code}` };
  }
}


//delete glossary entry
export async function deleteGlossaryEntry(
  minutesID: string,
  chatHistoryID: string,
  abbreviation: string,
  meaning: string
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      type: "delete",
      abbreviation: abbreviation,
      meaning: meaning,
    };

    const response = await axios.post("/api/glossary", reqData);
  } catch (error) {
    return { ERROR: `Unable to delete glossary entry, ${error.code}` };
  }
}

//read glossary (different from fetching as they return different things)
//readGlossary - returns list of glossary entries in the format:
// [ABBREVIATION (in Caps) - meaning (in lowercase)}]
// eg. [UI - user interface, UX - user experience]
//fetchGlossary will return the length of glossary entries
export async function readGlossary(minutesID: string, chatHistoryID: string) {
  var reqData = {
    minutesID: minutesID,
    chatHistoryID: chatHistoryID,
    type: "glossary",
  };

  const response = await axios.post("/api/read", reqData);
  const formattedGlossary = response.data.glossary;
  formattedGlossary.forEach((data) => {
    data.meaning.toLowerCase();
    data.abbreviation.toUpperCase();
  });
  return formattedGlossary;
}
