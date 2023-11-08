import React, { useState, useEffect} from "react";
import rightBar from '@/styles/components/rightSideBar.module.css'

export default function RightSideBar() {

    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState('CuriousCat')

    function handleExpand() {
        const dropDownContainerElement = document.querySelector('#rightSideBar') as HTMLElement
        if (!expanded) {
            //previously not expanded but now expanding
            dropDownContainerElement.style.animation = `${rightBar.scrollUp} 1.25s ease-in-out forwards`
        } else {
            dropDownContainerElement.style.animation = `${rightBar.scrollDown} 1.25s ease-in-out forwards`
        }
        setExpanded(!expanded)
    }

    function handleTabChange(tabName) {
        setSelected(tabName)
    }

    return(
        <div className={rightBar.overallContainer} id='rightSideBar'>
            
            <div className={rightBar.dropDownContainer} onClick={handleExpand}>
                <svg className={rightBar.dropDownIcon} style={{transform : expanded ? 'none' : 'rotate(180deg)'}} viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5265 9.61822C10.2589 9.86267 9.89594 10 9.51754 10C9.13913 10 8.77621 9.86267 8.5086 9.61822L0.435668 2.24185C0.299368 2.12156 0.190651 1.97768 0.115859 1.81859C0.041068 1.65951 0.00170046 1.4884 5.3881e-05 1.31527C-0.00159269 1.14213 0.034515 0.970431 0.106269 0.810182C0.178024 0.649933 0.283988 0.504345 0.417979 0.381914C0.551971 0.259484 0.711305 0.162663 0.886687 0.0970995C1.06207 0.0315363 1.24998 -0.00145527 1.43947 4.92329e-05C1.62896 0.00155374 1.81621 0.0375246 1.99032 0.105863C2.16443 0.174201 2.3219 0.273537 2.45354 0.398077L9.51754 6.85257L16.5815 0.398077C16.8507 0.160554 17.2112 0.0291241 17.5853 0.0320951C17.9595 0.035066 18.3174 0.1722 18.582 0.41396C18.8466 0.655721 18.9967 0.982765 18.9999 1.32465C19.0032 1.66654 18.8594 1.99592 18.5994 2.24185L10.5265 9.61822Z" fill="#B1B1B1"/>
                </svg>
            </div>

            <div className={rightBar.tabOverallContainer}>
                <div className={rightBar.tabContainer} onClick={() => handleTabChange('CuriousCat')} style={{backgroundColor: selected=== "CuriousCat" ? `var(--Dark_Grey)` : `var(--Grey)`}}>
                    <p className={rightBar.tabText} style={{color: selected=== "CuriousCat" ? `var(--Nice_Blue)` : `var(--Off_White)`}}>CuriousCat</p>
                </div>
                <div className={rightBar.tabContainer} onClick={() => handleTabChange('Glossary')} style={{backgroundColor: selected === "Glossary" ? `var(--Dark_Grey)` : `var(--Grey)`}}>
                    <p className={rightBar.tabText} style={{color: selected=== "Glossary" ? `var(--Nice_Blue)` : `var(--Off_White)`}}>Glossary</p>
                </div>
            </div>

            {
                selected == "CuriousCat" ? (
                    <div className={rightBar.tabDetailsContainer}>
                        <div className={rightBar.moreContainer}>
                            <svg className={rightBar.moreIcon} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36" height="36" rx="5" fill="#9CA5D8" fillOpacity="0.1" className={rightBar.hoverable}/>
                                <path d="M25.5753 18H25.4253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.0753 18H17.9253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5753 18H10.4253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <div className={rightBar.chatContainer}>
                            <p>TEXT CONTAINER</p>
                        </div>
                    </div>
                ) : selected == "Glossary" ? (
                    <div>
                        <p>GLOSSARY</p>
                    </div>
                ) : (
                    null
                )
            }
        </div>


    )
}