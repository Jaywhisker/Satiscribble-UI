import inputChat from '@/styles/components/rightSideBar/inputChat.module.css'

export interface userInput {
    text: string
    id: number
}


export default function UserQuery(props: userInput ) {
    return(
        <div key={props.id} className={inputChat['cc-queryChatBubble']}>
            <p className={inputChat['cc-queryText']}>{props.text}</p>
        </div>
)}