import { useEffect } from "react";
import inputChat from "@/styles/components/inputChat.module.css";

export interface assistantResponse {
  text: string;
  sourceID?: any[];
  setSelectedMinutes?: any;
  waiting?: boolean;
  copyable: boolean;
  id: number;
}

export default function AssistantResponse(props: assistantResponse) {
  console.log(props.sourceID);

  return (
    <div key={props.id} className={inputChat.assistantContainer}>
      {props.waiting && (
        <div className={inputChat.responseLoadingAnimation}></div>
      )}

      <div>
        <p className={inputChat.assistantText}>{props.text}</p>
      </div>

      {props.sourceID && (
        <div className={inputChat.sourceContainer}>
          <p className={inputChat.sourceText}>Sources</p>
          <ul className={inputChat.listIndex}>
            {props.sourceID.map((topic, index) => {
              if (topic) {
                return (
                  <li
                    className={inputChat.source}
                    key={index}
                    onClick={props.setSelectedMinutes(null)}
                  >
                    {topic.title || topic.placeholder || 'No sources'}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
