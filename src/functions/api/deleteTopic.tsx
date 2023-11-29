import axios from "axios";

export async function deleteTopic(
  minutesID: string,
  chatHistoryID: String,
  topicID: number
) {
  try {
    var reqData = {
      minutesID: minutesID,
      chatHistoryID: chatHistoryID,
      topicID: topicID,
    };

    const response = await axios.post("/api/delete", reqData);
    console.log(response);
  } catch (error) {
    return { ERROR: `Unable to delete topic, ${error.code}` };
  }
}
