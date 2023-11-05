import axios from "axios";

export default function handler(req, res) {
  console.log("Sending minutes to backend...");
  const requestBody = {
    "query": "What about Node.js?",
    "type": "web",
    "minutesID": "6546618ee29a41b6fd71f2e4",
    "chatHistoryID": "6546618ee29a41b6fd71f2e5"
  };

  try {
    axios
      .post("http://satiscribble-python-ai-1:8000/web_query", requestBody)
      .then((response) => {
        console.log(response.data); // log or handle response data
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("There was an error!", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
