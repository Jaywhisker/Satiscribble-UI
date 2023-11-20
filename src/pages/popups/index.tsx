import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@/components/buttons';
import { InactivityAlert, AgendaAlert, TopicChangeAlert } from '@/components/popup';


export default function Home() {
  const [name, setName] = useState(null);
  const [pythonMsg, setPythonMsg] = useState(null);

  useEffect(() => {
    async function getPythonMsg() {
      const response = await axios.get("/api/testpython");
      console.log(response);
      setPythonMsg(response.data.message);
    }
    getPythonMsg();
  }, []);

  return (
    <div style={{ display:'flex', flexDirection: 'column', gap: '2vh'}}>
      <div style={{ display:'flex', flexDirection: 'row', gap: '1vw'}}>
        <Button size="small" fillBorderVariant="border" leftIcon={<span>🚀</span>}>
          Small
        </Button>
        <Button size="medium" fillBorderVariant="fill" leftIcon={<span>🚀</span>}>
          Medium
        </Button>
        <Button size="large" fillBorderVariant="border" colorVariant = 'white' leftIcon={<span>🚀</span>}>
          Large
        </Button>
        <Button size="medium" fillBorderVariant="fill" colorVariant = 'red' >
          No Icon
        </Button>
        <Button buttonType = 'icon-button' size="small" fillBorderVariant="fill" leftIcon={<span>🚀</span>}>
        </Button>
      </div>
      
      <InactivityAlert isOpen={true} onClose={() => {}} />
      <AgendaAlert isOpen={true} onClose={() => {}} />
      <TopicChangeAlert isOpen={true} onClose={() => {}} />
    </div>
  );
}
