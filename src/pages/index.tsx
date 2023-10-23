import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function Home() {

  const [name, setName] = useState(null)

  useEffect(() => {
    async function getName() {
      const response = await axios.get('/api/hello')
      console.log(response)
      setName(response.data.name)
    }
    getName()
  }, [])

  return (
    <>
      <p>Testing hello!</p>
      <p>API works! {name} says hello</p>
    </>
  )
}
