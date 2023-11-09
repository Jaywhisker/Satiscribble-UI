import inputChat from '@/styles/components/inputChat.module.css'

export interface assistantResponse {
    text: string;
    sourceID?: any[];
    copyable: boolean;
    id: number
}


export default function AssistantResponse(props: assistantResponse ) {
    return(
    <>
        <div key = {props.id} className={inputChat.assistantContainer}>
            <p className={inputChat.assistantText}>{props.text}</p>
        </div>
    </>
    
)}