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
    <div key={props.id} className={inputChat.assistantContainer}>
      
      {/* Loading animtion */}
      {props.waiting && (
        <div className={inputChat.responseLoadingAnimation}></div>
      )}

      {/* Generated Response */}
      <div>
        <p className={inputChat.assistantText}>{props.text}</p>
      </div>

      {/* Source IDS if there are any, show the Title */}
      {props.sourceIDTitle && (
        <div className={inputChat.sourceContainer}>
          <p className={inputChat.sourceText}>Sources</p>
          <ul className={inputChat.listIndex}>
            {props.sourceIDTitle.map((topic, index) => {
              if (topic) {
                return (
                  <li
                    className={inputChat.source}
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
