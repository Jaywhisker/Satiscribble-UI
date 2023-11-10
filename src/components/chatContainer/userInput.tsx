import inputChat from '@/styles/components/inputChat.module.css'

export interface userInput {
    text: string,
    id: number
}


export default function UserChat(props: userInput ) {
    return(
    <div key={props.id} className={inputChat.userContainer}>
        <p className={inputChat.userText}>{props.text}</p>
    </div>
)}