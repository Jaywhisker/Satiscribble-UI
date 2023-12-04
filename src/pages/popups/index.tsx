import React, { useState, useEffect } from "react";
import { Button } from '@/components/buttons';
import PopUp from '@/components/popup';


export default function Home() {

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
      
      <PopUp.InactivityAlert isOpen={true} onClose={() => {}} />
      <PopUp.AgendaAlert isOpen={true} onClose={() => {}} />
      <PopUp.TopicChangeAlert isOpen={true} onClose={() => {}} />
      <PopUp.DetectAlert isOpen={true} onClose={() => {}} />
      <PopUp.ClearChat isOpen={true} />
      <PopUp.DeleteTopic isOpen={true} onClose={() => {}} />
      <PopUp.BasicAlert isOpen={true} onClose={() => {}} />

      <PopUp.BasicAlert
        colorVariant="red"
        iconName="exclamation"
        iconColor="red"
        messageTitle="Topic Length Alert"
        messageContent="The current topic block has exceeded 1000 tokens. Your topic may be too long for effective discussion."
        messageHeaderColor="Red"
        isOpen={true}
        onClose={() => {}}
      />

      <PopUp.BasicAlert
        colorVariant="red"
        iconName="exclamation"
        iconColor="red"
        messageTitle="Add new topic failed"
        messageContent="Oops! It seems we can't add a new topic just yet. To proceed, please make sure both the meeting details and agenda blocks are filled out."
        messageHeaderColor="Red"
        isOpen={true}
        onClose={() => {}}
      />

      <PopUp.BasicAlert
        colorVariant="grey"
        iconName="check"
        iconColor="green"
        messageTitle="Glossary Addition Successful"
        messageContent="Great news! Your abbreviation has been successfully added to the glossary."
        messageHeaderColor="Green"
        isOpen={true}
        onClose={() => {}}
      />
    </div>
  );
}
