import axios from "axios";


export default async function handler(req, res){
    console.log("accepting stream?")
    const requestBody = {
        "query": "What about Node.js?",
        "type": "document",
        "minutesID": "6546618ee29a41b6fd71f2e4",
        "chatHistoryID": "6546618ee29a41b6fd71f2e5"
    };

    try{
        const response = await axios.post("http://satiscribble-python-ai-1:8000/web_query", requestBody, {responseType: 'stream'})
        const stream = response.data;
        stream.on("data", (data) => {
          console.log(data);
        });
  
        stream.on("end", () => {
          console.log("stream done");
        });
    }
    catch (error){
        console.error("There was an error!", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}