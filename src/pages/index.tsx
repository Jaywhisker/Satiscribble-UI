import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState(null);
  const [pythonMsg, setPythonMsg] = useState(null);


  return (
    <>
      <p>Testing hello!</p>
      <p>API works! {name} says hello</p>
      <p>Python Backend works! Python says {pythonMsg}</p>
    </>
  );
}