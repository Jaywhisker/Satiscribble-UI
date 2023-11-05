import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function Home() {

  const [name, setName] = useState(null)
  const [pythonMsg, setPythonMsg] = useState(null)

  useEffect(() => {
    async function getName() {
      const response = await axios.get('/api/hello')
      console.log(response)
      setName(response.data.name)
    }

    async function getPythonMsg(){
      const response = await axios.get('/api/testpython')
      console.log(response)
      setPythonMsg(response.data.message)
    }
    getName()
    getPythonMsg()
  }, [])



  return (
    <>
      <p>Testing hello!</p>
      <p>API works! {name} says hello</p>
      <p>Python Backend works! Python says {pythonMsg}</p>
    </>
  )
}
