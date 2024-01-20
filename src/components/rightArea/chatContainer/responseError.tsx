import {useEffect} from 'react'
import errorStyle from '@/styles/components/error.module.css'

export interface errorInput {
    // retryFunction: () => void
    height: number
}


export default function ResponseError(props: errorInput ) {

    useEffect(() => {
        if (props.height != null) {
            const errorContainer = document.querySelector('#errorContainer') as HTMLElement
            errorContainer.style.bottom = `${props.height}px`
        }
    }, [props.height])

    return(
        <div className={errorStyle.errorBackground} id="errorContainer">
            <p className={errorStyle.errorText}>Oops! Something went wrong while generating a response.<br/>Please try again.</p>
            {/* <button onClick={props.retryFunction} className={errorStyle.retryButton}>RETRY</button>
            <p className={errorStyle.errorText}>Note: Sending a new query will override the previously failed query.</p> */}
        </div>
)}