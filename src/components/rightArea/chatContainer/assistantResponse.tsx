import inputChat from "@/styles/components/rightSideBar/inputChat.module.css";

export interface assistantResponse {
  text: string;
  sourceIDTitle?: any[];
  sourceIDs?: any[];
  setSelectedMinutes?: any;
  waiting?: boolean;
  id: number;
}

export default function AssistantResponse(props: assistantResponse) {
  
  return (
    <div key={props.id} className={inputChat['cc-responseChatBubble']}>
      
      {/* Loading animtion */}
      {props.waiting && (
        <div className={inputChat['cc-loadingResponseAnimation']}></div>
      )}

      {/* Generated Response */}
      <div>
        <p className={inputChat['cc-responseText']}>{props.text}</p>
      </div>

      {/* Source IDS if there are any, show the Title */}
      {props.sourceIDTitle && (
        <div className={inputChat['cc-responseSourceContainer']}>
          <p className={inputChat['cc-responseSourceHeader']}>Sources</p>
          <ul className={inputChat['cc-responseSourceList']}>
            {props.sourceIDTitle.map((topic, index) => {
              if (topic) {
                return (
                  <li
                    className={inputChat['cc-responseSourceText']}
                    key={index}
                    onClick={() => props.setSelectedMinutes(props.sourceIDs[index])}
                  >
                    {topic.title || topic.placeholder || "No sources"}
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
