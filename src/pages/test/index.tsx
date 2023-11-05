import React, { useState, useEffect} from "react";
import axios from 'axios';

export default function Home() {

  const [response, setResponse] = useState('')
  const requestBody = {
    "type": "web", 
    "query": "what is the difference between A/B testing", 
    "minutesID": "6546150922adb9a3427a979c", 
    "chatHistoryID": "6546150922adb9a3427a979d"
  }

  const handleSubmit = async (e) => {
    try {
  
     e.preventDefault()
     setResponse('')
  
     // make a POST call to our api route
     let res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
       'Content-type': 'application/json',
      },
      body: JSON.stringify({requestBody})
     })
  
     if (res.ok) {
      const reader = res.body.getReader();
  
      const processStream = async () => {
       while(true) {
        // .read() returns 2 properties
        const {done, value} = await reader.read()
  
        // if done is true
        if(done) {
         console.log('stream completed')
         break;
        }
        // value is a binary data in Uint8Array format, as Uint8Array is suitable data structure for binary data
        // we decode Uint8Array using TextDecoder
        let chunk = new TextDecoder('utf-8').decode(value)
        console.log(chunk)
  
        // append to the response
        setResponse((prev) => prev + chunk);
  
       }
      }
  
      processStream().catch(err => console.log('--stream error--', err))
  
     } else {
      alert(`error getting response`)
     }
    } catch (error) {
     alert(`error: ${error.message}`)
    }
   }
  

  return (
    <div>
      <p>Testing page works!</p>
      <button onClick={handleSubmit}>Test</button>
      <p>{response}</p>
    </>
  )
}
