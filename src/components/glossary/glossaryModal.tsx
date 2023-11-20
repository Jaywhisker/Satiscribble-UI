import {useState, useEffect, useRef} from 'react'
import glossary from '@/styles/components/glossary.module.css'
import { updateGlossaryEntry, deleteGlossaryEntry } from '@/functions/api/glossaryActions'

export interface glossaryDetails {
    type: string
    abbreviation: string
    meaning: string
    id: number
    glossaryType: any[string]
    setGlossaryType: any
    glossaryData: any[]
    setGlossaryData: any
    minutesID: string
    chatHistoryID: string
}


export default function GlossaryModal(props: glossaryDetails ) {

    const [glossaryMeaning, setGlossaryMeaning] = useState(null)
    const [warning, setWarning] = useState(false)
    const meaningTextArea = useRef(null)

    //esc key to discard (original meaning)
    //underline for edit
    //cannot save is length = 0
    
    useEffect(() => {
        if (props.type == 'edit') {
            const textarea = meaningTextArea.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }, [glossaryMeaning, props.type]);


    useEffect(() => {
        setGlossaryMeaning(props.meaning)
    }, [props.meaning])


    function handleEdit(index) {
        var newGlossaryType = [...props.glossaryType]
        newGlossaryType[index] = 'edit'
        props.setGlossaryType(newGlossaryType)
    }

    async function handleSave(index)  {
        if (glossaryMeaning.length <= 0) {
            setWarning(true)
        } else {
            setWarning(false)
            var response = await updateGlossaryEntry(props.minutesID, props.chatHistoryID, props.abbreviation, glossaryMeaning)
            if (response === undefined) {
                var newGlossaryType = [...props.glossaryType]
                newGlossaryType[index] = 'default'
                props.setGlossaryType(newGlossaryType)
            } else {
                //error handling code
                console.log('error')
            }
        }
    }

    async function handleDelete(index) {
        var response = await deleteGlossaryEntry(props.minutesID, props.chatHistoryID, props.abbreviation, props.meaning)
        if (response === undefined) {
            var newGlossaryType = [...props.glossaryType]
            newGlossaryType.splice(index, 1)
            props.setGlossaryType(newGlossaryType)
    
            var newGlossaryData = [...props.glossaryData]
            newGlossaryData.splice(index, 1)
            props.setGlossaryData(newGlossaryData)
        } else {
            //error handling code
            console.log('error')
        }
    }

    function handleCancel(index) {
        setGlossaryMeaning(props.meaning)
        
        var newGlossaryType = [...props.glossaryType]
        newGlossaryType[index] = 'default'
        props.setGlossaryType(newGlossaryType)
    }

    function handleEditMeaning(event) {
        var value = event.target.value
        setGlossaryMeaning(value)
    }

    function handleSubmit(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleSave(props.id);
        } else if (event.key === 'Escape') {
            handleCancel(props.id);
        }
        else {
            null
        }
      }



    return(
    <div key={props.id} className={glossary.glossaryContainer}>
        {props.type == 'default' ? (
            <div className={glossary.detailsContainer}>
                <div className={glossary.titleContainer}>
                    <p className={glossary.abbreviationText}>{props.abbreviation}</p>
                    <div className={glossary.iconContainer}>
                        <svg className={glossary.editIcon} onClick={() => handleEdit(props.id)} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>edit</title>
                            <path d="M5.64085 4.72498L8.27502 7.35915L3.63417 12H1V9.36583L5.64085 4.72498ZM11.8162 2.93574L10.0643 1.18377C10.0065 1.12554 9.93779 1.07932 9.86209 1.04778C9.78638 1.01624 9.70518 1 9.62316 1C9.54115 1 9.45995 1.01624 9.38424 1.04778C9.30853 1.07932 9.23982 1.12554 9.18207 1.18377L7.39282 2.97301L10.027 5.60718L11.8162 3.81793C11.8745 3.76018 11.9207 3.69147 11.9522 3.61576C11.9838 3.54005 12 3.45885 12 3.37684C12 3.29482 11.9838 3.21362 11.9522 3.13791C11.9207 3.06221 11.8745 2.99349 11.8162 2.93574Z" fill="#D1D1D1" stroke="#D1D1D1" stroke-width="0.621265" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                        <svg className={glossary.deleteIcon} onClick={() => handleDelete(props.id)} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>delete</title>
                            <path d="M2.375 5.25H3.95833H16.625" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.3335 5.25004V3.66671C6.3335 3.24678 6.50031 2.84405 6.79724 2.54712C7.09418 2.25019 7.4969 2.08337 7.91683 2.08337H11.0835C11.5034 2.08337 11.9061 2.25019 12.2031 2.54712C12.5 2.84405 12.6668 3.24678 12.6668 3.66671V5.25004M15.0418 5.25004V16.3334C15.0418 16.7533 14.875 17.156 14.5781 17.453C14.2811 17.7499 13.8784 17.9167 13.4585 17.9167H5.54183C5.1219 17.9167 4.71918 17.7499 4.42224 17.453C4.12531 17.156 3.9585 16.7533 3.9585 16.3334V5.25004H15.0418Z" stroke="#D1D1D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.9165 9.20837V13.9584" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.0835 9.20837V13.9584" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <p className={glossary.meaningText}>{glossaryMeaning}</p>
            </div>
        ) : props.type == 'edit' ? (
            <div className={glossary.detailsContainer}>
                    <div className={glossary.titleContainer}>
                    <p className={glossary.abbreviationText}>{props.abbreviation}</p>

                    <div className={glossary.iconContainer}>
                        <svg className={glossary.saveIcon} onClick={() => handleSave(props.id)} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>save</title>
                            <path d="M1.5 5.525L4.8107 9.375L11.25 1.875" stroke="#D1D1D1" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        
                        <svg className={glossary.cancelIcon} onClick={() => handleCancel(props.id)} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>cancel</title>
                            <path d="M13.5 1.5L1.5 13.5" stroke="#DE5C64" strokeWidth="3" strokeLinecap="round"/>
                            <path d="M1.5 1.5L13.5 13.5" stroke="#DE5C64" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        
                    </div>
                </div>

                <textarea 
                    className={glossary.meaningText}
                    value = {glossaryMeaning}
                    placeholder = "Glossary meaning here..."
                    onChange = {handleEditMeaning}
                    rows = {1}
                    ref = {meaningTextArea}
                    onKeyDown = {handleSubmit}
                />
            </div>
        ) : (
            null
        )}
    </div>
)}