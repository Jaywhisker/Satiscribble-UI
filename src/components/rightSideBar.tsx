import React, { useState, useEffect, useRef} from "react";
import rightBar from '@/styles/components/rightSideBar.module.css'

export default function RightSideBar() {

    const [expanded, setExpanded] = useState(true)
    const [selected, setSelected] = useState('CuriousCat')
    const [queryMode, setQueryMode] = useState('document')
    const [query, setQuery] = useState('')
    const [showMore, setShowMore] = useState(false)
    const queryInputArea = useRef(null)


    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
        }
    }, [])


    useEffect(() => {
        if (selected === 'CuriousCat') {
            const textarea = queryInputArea.current
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
    
            const bottomTabElement = document.querySelector('#bottomTab') as HTMLElement
            bottomTabElement.style.top = `${window.innerHeight * 0.86 - textarea.scrollHeight}px`
        }
    }, [query, selected])


    function handleExpand() {
        const dropDownContainerElement = document.querySelector('#rightSideBar') as HTMLElement
        const bottomTabElement = document.querySelector('#bottomTab') as HTMLElement
        if (!expanded) {
            //previously not expanded but now expanding
            bottomTabElement.style.position = 'absolute'
            dropDownContainerElement.style.animation = `${rightBar.scrollUp} 1.25s ease-in-out forwards`
            setTimeout(() => {bottomTabElement.style.position = 'fixed'}, 1250)
        } else {
            bottomTabElement.style.position = 'absolute'
            dropDownContainerElement.style.animation = `${rightBar.scrollDown} 1.25s ease-in-out forwards`
        }
        setExpanded(!expanded)
    }

    function handleTabChange(tabName) {
        setSelected(tabName)
    }

    function handleQueryChange(queryMode){
        setQueryMode(queryMode)
    }

    function handleKeyDown(event) {
        console.log(event)
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            insertLineBreak();
        } else if (event.key ==='Enter') {
            event.preventDefault();
            setQuery('')
            handleSubmitQuery()
        }
      }

    function insertLineBreak() {
        const textarea = document.getElementById('queryInput') as HTMLTextAreaElement;
        const { selectionStart, selectionEnd } = textarea;
        const text = textarea.value;
        const newText = text.substring(0, selectionStart) + '\n' + text.substring(selectionEnd);
        textarea.value = newText;
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        setQuery(textarea.value)
    }

    function handleInputChange(event) {
        setQuery(event.target.value)
    }

    function handleSubmitQuery() {
        console.log('submit')
    }

    function handleClearChat() {
        console.log('clear chat')
    }

    function closeModal(event) {
        if (event.target.id == 'showMore') {
            setShowMore(!showMore)
        } else {
            setShowMore(false)
        }
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
                        <div className={rightBar.backgroundIconContainer}>
                            <p className={rightBar.backgroundText}>CURIOUSCAT</p>
                            <svg className={rightBar.backgroundIcon} viewBox="0 0 325 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M115.442 30.11C114.464 32.511 113.479 34.8923 113.033 37.4635C112.732 39.2048 111.264 44.0705 112.414 42.7288C116.184 38.331 117.673 30.0055 120.745 24.8747" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M124.605 17.9951C130.656 20.4606 134.587 26.8674 139.237 31.3529" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M141.586 33.3663C142.688 31.635 144.724 30.5992 146.585 29.8855C155.342 26.527 165.054 24.7683 174.256 23.1985C180.704 22.0987 187.626 20.5568 194.177 20.9842" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M193.237 25.8843C194.009 23.9881 194.315 21.3489 194.865 19.1517C196.172 13.9221 199.155 10.6027 201.359 5.94942C204.015 0.342223 221.182 18.3217 221.596 23.7039" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M109.3 52.9649C107.355 52.4423 102.982 63.2834 102.134 65.3654C100.372 69.6901 100.11 74.3354 101.362 78.786C103.177 85.2419 110.877 88.6344 116.462 91.5714C128.279 97.7862 141.384 101.006 154.318 103.826C166.636 106.512 177.374 101.612 188.828 97.93C200.795 94.0836 210.273 87.5186 221.103 81.6728C238.384 72.3453 244.477 61.7234 236.496 43.8941" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M150.849 59.6909C150.201 62.4083 151.146 65.8601 151.253 68.607C151.308 70.0279 150.899 72.0391 151.755 73.3005" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M195.032 43.7432C196.43 44.3125 196.842 47.2869 197.252 48.5709C197.581 49.5996 197.693 50.6195 198.31 51.5294" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M176.397 63.6499C179.565 64.2576 183.228 63.4275 186.156 62.1944" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M171.241 75.4686C173.835 76.5256 177.909 78.4644 179.824 75.4198C180.189 74.8393 181.174 71.6354 181.816 71.3651C182.419 71.1112 184.109 72.4443 184.698 72.5772C187.26 73.1549 190.219 72.889 192.653 71.8951C195.785 70.6157 196.937 67.6066 197.76 64.5453" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M251.703 37.9755C255.06 37.1197 258.826 36.361 261.883 34.6543" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M244.714 53.4613C249.704 52.1838 254.503 50.6106 259.683 50.054" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M84.8817 85.7756C89.2528 83.9353 93.7429 82.7048 98.3692 81.6517C101.908 80.8463 105.501 80.2203 108.972 79.1442C109.704 78.9174 110.151 78.7541 110.678 78.2923" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M95.8599 94.6619C97.906 93.8492 99.6178 92.8402 101.452 91.5838C103.591 90.1187 105.96 89.2037 108.337 88.2026" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M229.364 83.0121C229.678 82.2422 229.953 81.6846 230.812 81.3579C237.276 78.8995 244.554 77.9954 251.227 76.1721C257.186 74.5438 263.912 72.6439 268.61 68.3585C269.359 67.6752 269.469 65.8339 269.643 65.0648C270.766 60.0814 272.222 55.1906 273.371 50.217C274.045 47.2982 274.749 43.6393 276.543 41.1013C281.68 33.8361 286.871 45.8999 288.774 49.2576C290.193 51.7607 285.928 56.8101 289.337 56.9932C293.131 57.197 296.484 55.4989 300.091 56.8092C303.755 58.1402 305.571 65.6904 307.033 68.924C308.659 72.5177 310.829 75.9805 311.668 79.8663C312.431 83.4031 311.884 90.343 308.528 92.1294C306.52 93.1983 302.641 91.9746 300.577 91.1336" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M287.547 68.4136C286.514 71.7098 284.579 80.1999 286.565 83.6449C287.337 84.9843 291.549 83.7999 293.077 83.8996" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M296.75 71.4668C295.129 75.1427 292.585 77.8078 289.626 80.4041" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M297.059 79.2542C295.482 80.7709 293.416 83.9219 291.042 83.767" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M298.298 91.5985C295.33 92.2408 292.589 94.564 290.045 96.0903C282.825 100.422 276.177 105.338 269.32 110.204C262.284 115.197 254.766 119.31 247.415 123.797C244.738 125.431 242.347 126.892 240.446 129.315" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M148.948 109.446C151.2 108.89 154.468 111.258 156.27 112.081C166.302 116.664 176.591 120.647 186.655 125.158C193.071 128.033 199.536 130.754 206.045 133.407" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M206.045 133.406C209.053 129.695 212.563 122.034 217.373 120.61C219.238 120.058 220.201 117.693 222.682 118.595C225.995 119.798 226.944 125.744 226.556 128.84C226.19 131.755 224.259 134.858 223.146 137.588" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M223.124 141.062C230.963 144.256 231.157 154.934 226.456 160.992C223.251 165.122 218.002 169.762 212.929 171.305C210.543 172.031 206.506 174.686 204.23 173.758" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M207.992 147.432C209.488 143.76 204.999 154.777 203.503 158.449C202.524 160.853 201.219 164.256 202.239 166.679" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M212.128 156.083C212.425 155.353 210.184 157.33 209.83 157.545C208.082 158.605 206.305 159.482 204.673 160.706" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M211.973 161.591C211.352 162.735 210.152 162.377 209.041 162.331C207.732 162.277 206.298 163.759 205.248 164.422" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M134.125 123.604C142.451 127.548 150.261 134.552 157.95 139.58C164.534 143.885 172.411 146.996 178.445 151.954C180.432 153.587 183.298 154.164 184.993 156.015C186.08 157.202 187.551 159.302 188.988 159.887" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M130.896 104.18C124.263 122.814 121.456 143.052 117.987 162.453C116.363 171.532 114.569 180.565 113.46 189.705" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M248.543 136.793C247.443 139.492 247.214 142.554 246.891 145.406C245.705 155.859 244.874 166.393 244.427 176.904C243.974 187.557 243.287 198.125 242.213 208.735" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M101.315 197.293C97.5072 191.982 90.6874 189.556 86.7389 184.351C79.9168 175.357 75.9866 164.673 75.3653 153.483C74.8551 144.293 70.9943 136.005 65.9973 128.424C61.408 121.462 56.281 115.226 50.0279 109.691C48.9742 108.758 45.7387 104.357 43.9911 104.755C36.7228 106.409 27.7346 111.149 24.2425 118.182C21.3873 123.933 24.4561 130.567 26.2968 136.121C35.1794 162.926 51.6932 188.661 72.8648 207.291" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M226.536 28.7876C229.539 32.9641 233.273 37.1728 235.287 41.9573C236.686 45.2812 237.398 49.2042 238.143 52.7254C238.837 56.003 240.053 59.8794 238.723 63.1444" stroke="#343541" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M186.93 105.184C188.666 103.983 191.264 103.412 193.199 102.514C194.452 101.932 195.664 101.098 196.982 100.696C197.679 100.484 199.697 99.2707 199.616 100.77C199.437 104.082 197.696 107.198 197.001 110.396C196.732 111.632 196.446 114.198 194.757 114.198C192.775 114.198 190.108 111.541 189.267 109.858" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M193.607 114.532C192.838 117.607 190.269 120.6 190.269 123.88" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M195.944 114.532C196.679 114.679 197.325 115.495 197.891 115.923C200.526 117.914 203.546 119.25 206.441 120.801C207.954 121.612 209.464 122.711 210.633 123.88" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M210.632 123.879C210.632 125.911 209.631 127.583 209.631 129.555" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                <path d="M186.262 161.604C188.752 163.867 190.785 166.68 192.846 169.337C194.896 171.981 197.397 174.41 199.208 177.22C199.922 178.328 200.664 180 200.951 177.776C201.142 176.299 201.461 174.192 202.287 172.954" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                        </div>

                        <div className={rightBar.moreContainer}>
                            <svg className={rightBar.moreIcon} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="36" height="36" rx="5" fill="#9CA5D8" className={rightBar.hoverable} id='showMore' style={{fillOpacity: showMore ? 0.35 : 0.1}}/>
                                <path d="M25.5753 18H25.4253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.0753 18H17.9253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.5753 18H10.4253" stroke="#9CA5D8" strokeWidth="3.75" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        {showMore && (
                                <div className={rightBar.clearChatContainer}>
                                    <p className={rightBar.clearChatText}>Clear Chat</p>
                                </div>
                            )}

                        <div className={rightBar.chatContainer}>
                            <p style={{color: `var(--Off_White)`}}>{queryMode == 'document' ? 'DOCUMENT QUERY' : "WEB QUERY"}</p>
                        </div>
                        
                        <div className={rightBar.inputContainer} id="bottomTab">
                            <div className={rightBar.buttonContainer}>
                                <div className={rightBar.button}  onClick={() => handleQueryChange('document')} style={{backgroundColor: queryMode == 'document' ? `var(--Nice_Blue)` : `var(--Dark_Blue)`}}>
                                    <p className={rightBar.buttonText} style={{color: queryMode == 'document' ? `var(--Dark_Blue)` : `var(--Nice_Blue)`}}>DOCUMENT QUERY</p>
                                </div>

                                <div className={rightBar.button} onClick={() => handleQueryChange('web')} style={{backgroundColor: queryMode == 'web' ? `var(--Nice_Blue)` : `var(--Dark_Blue)`}}>
                                    <p className={rightBar.buttonText} style={{color: queryMode == 'web' ? `var(--Dark_Blue)` : `var(--Nice_Blue)`}}>WEB QUERY</p>
                                </div>
                            </div>

                            <div className={rightBar.inputTextContainer}>
                                <textarea
                                    id = "queryInput"
                                    className = {rightBar.queryContainer}
                                    ref = {queryInputArea}
                                    placeholder = 'Ask me anything! Shift enter for newline'
                                    value = {query}
                                    onChange = {handleInputChange}
                                    onKeyDown = {handleKeyDown}
                                    rows = {1}
                                    />
                                <svg onClick={handleSubmitQuery} className = {rightBar.sendIcon} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.18675 24.505L23.7099 13.9249C23.9324 13.8162 24.1222 13.6349 24.2555 13.4036C24.3889 13.1722 24.46 12.901 24.46 12.6236C24.46 12.3463 24.3889 12.0751 24.2555 11.8437C24.1222 11.6123 23.9324 11.431 23.7099 11.3223L2.18675 0.742227C2.00038 0.649007 1.79671 0.610461 1.5941 0.630065C1.3915 0.64967 1.19633 0.726809 1.02622 0.854523C0.85611 0.982238 0.716399 1.15651 0.619695 1.36162C0.52299 1.56672 0.472333 1.79621 0.472295 2.02938L0.459961 8.55001C0.459961 9.25723 0.916326 9.86545 1.53304 9.95031L18.9613 12.6236L1.53304 15.2828C0.916326 15.3818 0.459961 15.99 0.459961 16.6973L0.472295 23.2179C0.472295 24.2221 1.37269 24.9152 2.18675 24.505Z" fill="#B1B1B1"/>
                                </svg>
                            </div>

                            <p  className={rightBar.warningText}>CuriousCat can make mistakes. Remember to double check.</p>
                        </div>
                    </div>
                ) : selected == "Glossary" ? (
                    <div>
                        <div className={rightBar.backgroundIconContainer}>
                            <p className={rightBar.backgroundText}>GLOSSARY</p>
                                <svg className={rightBar.backgroundGlossaryIcon} viewBox="0 0 213 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M51.1333 27.8203C52.9409 21.8553 54.1395 15.689 56.1308 9.7738C56.9623 7.30382 56.9456 4.92418 59.4624 3.66576" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M64.4602 1.99996C68.726 1.99996 71.2637 7.36249 73.5529 10.4911C74.9003 12.3326 76.392 14.2329 77.6017 16.1595C78.385 17.4069 79.6794 18.6953 80.2856 19.9076" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M89.8643 19.4912C100.274 19.4912 111.027 18.8908 121.099 21.9899" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M131.926 21.9899C134.362 21.2796 136.544 18.8167 138.52 17.3395C142.983 14.0035 147.513 10.705 152.124 7.5759C155.051 5.58956 156.398 6.25627 157.931 9.72759C160.605 15.7783 163.577 22.8159 163.577 29.4862" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M45.719 33.6507C42.8715 36.4982 40.1072 39.452 37.5981 42.6045C33.6214 47.6009 31.4386 52.7693 29.9862 59.0083C27.5435 69.5007 27.3907 83.0198 35.4927 91.1218C41.5989 97.228 49.5461 99.6821 57.4261 102.736C64.1584 105.346 70.7732 106.736 77.8787 107.873C93.3288 110.345 108.8 111.112 124.429 111.112C135.805 111.112 147.789 109.787 158.833 106.947C166.919 104.868 171.172 95.1336 173.525 87.8132C175.877 80.4976 178.365 72.5823 176.672 64.885C175.233 58.3472 171.962 52.2596 170.656 45.7279" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M66.1256 64.4685C64.2959 67.3961 63.5422 71.9291 62.7939 75.2964" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M111.936 68.6331C111.936 72.3815 111.212 75.7835 110.687 79.461" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M81.1179 79.8775C83.4918 80.0357 85.8113 80.2939 88.1977 80.2939" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M183.567 69.466H194.811" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M182.317 84.8749C188.34 85.0073 194.202 86.5408 200.225 86.5408" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M9.0708 61.1369C12.293 62.3591 15.2392 63.7865 18.6493 64.4685" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M8.65454 76.9622C12.1457 76.7569 15.6469 75.9802 19.066 75.2964" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M16.5801 179.624C21.4424 176.585 25.1736 171.586 28.9812 167.408C33.5927 162.348 38.3292 157.511 43.2333 152.74C46.1169 149.934 50.4212 146.073 54.4777 145.058" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M15.3306 181.707C21.1285 182.69 26.8897 183.791 32.6367 185.038C38.4236 186.294 44.3433 186.647 50.1973 187.514C53.3572 187.982 56.5108 188.46 59.6601 188.995C60.8661 189.199 62.8016 189.198 63.6396 190.036" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M65.3057 189.619C79.3347 197.436 95.3361 200.089 109.867 206.694" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M111.949 207.944C119.969 199.923 129.172 192.786 135.964 183.627C138.472 180.246 140.312 176.425 142.905 173.1C143.849 171.891 144.968 171.117 145.265 169.629" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M56.0074 144.5C55.6127 144.556 58.2959 145.962 58.2986 145.963C64.1321 148.88 70.0973 151.52 76.021 154.245C78.5284 155.398 80.9764 157.295 83.5848 158.164" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M87.311 159.655C97.2734 161.423 107.104 164.543 117.152 165.756C119.423 166.03 121.674 165.947 123.943 166.363C125.851 166.713 127.703 167.285 129.629 167.55C132.678 167.97 135.914 168.03 138.932 168.654C142.271 169.345 145.47 170.09 148.925 170.09" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M26.0396 103.561C29.2432 103.775 38.1175 105.334 38.2671 99.7988C38.3225 97.7479 38.3821 95.6655 37.7794 93.6851C37.4157 92.49 35.8509 89.5159 34.7835 88.9822C29.4252 86.303 24.7103 83.809 18.4976 83.809C15.899 83.809 13.0842 83.2522 11.4433 85.6902C10.1956 87.5438 10.0498 90.1087 10.0498 92.2742" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M24.7855 105.442C23.6067 109.026 23.2179 112.083 23.2179 115.858C23.2179 119.679 22.6686 123.707 24.4023 127.215C27.1797 132.834 33.3467 129.23 36.4905 125.647C41.26 120.212 45.7846 114.534 50.5817 109.118C51.4966 108.085 52.2892 106.959 53.1596 105.895C53.716 105.215 54.8655 104.539 55.1975 103.875" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M8.48243 94.4688C7.98449 97.3071 7.15293 99.9945 6.35742 102.76C4.44945 109.392 3.37372 116.101 2.56028 122.947C1.49766 131.891 1.56278 141.077 6.21808 149.057C7.16745 150.685 8.5242 152.071 10.3287 152.715C15.6533 154.614 22.2346 154.231 27.7468 153.934C33.5189 153.624 39.2576 152.313 44.5031 149.841C45.8059 149.227 47.6297 148.482 48.3002 147.141" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M160.229 107.01C164.624 110.729 167.952 115.529 170.505 120.666C174.963 129.635 177.752 139.054 178.221 149.075C178.48 154.585 178.413 160.107 178.413 165.622C178.413 167.331 178.548 169.102 178.256 170.795C177.973 172.438 178.19 174.055 177.786 175.672" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M149.882 144.006C149.882 151.177 149.715 158.113 148.384 165.186C147.837 168.097 147.374 170.838 147.374 173.791" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M145.179 175.672C142.473 175.728 138.047 176.021 136.226 178.424C134.231 181.058 132.748 185.443 133.335 188.77C134.02 192.654 138.208 195.374 141.626 196.626C146.947 198.574 153.887 197.694 159.392 197.236C162.363 196.988 165.884 195.36 167.927 193.247C169.922 191.183 171.072 188.961 172.595 186.506C175.507 181.816 177.509 176.082 178.413 170.656" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M177.282 171.18C180.265 166.132 182.466 161.418 184.273 155.868C186.644 148.585 185.897 140.955 186.381 133.455C186.729 128.056 186.799 123.159 188.517 118.004C189.982 113.608 193.254 111.955 197.615 110.792C202.316 109.539 207.485 109.542 209.515 114.704C210.62 117.514 210.446 121.161 210.625 124.135C210.902 128.743 210.477 133.234 209.987 137.81C208.862 148.303 208.007 159.416 204.245 169.349C203.388 171.611 202.518 177.747 199.751 178.669" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M46.105 171.283C48.6746 171.841 50.9851 173.001 53.4903 173.756C56.3599 174.621 59.2664 175.327 62.1296 176.229C64.239 176.894 66.4446 178.494 68.6788 178.494" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M56.7656 161.877C60.1118 164.333 63.2974 166.554 67.0075 168.409C68.139 168.974 69.262 169.715 70.5608 169.715" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M85.9233 182.883C92.3124 185.34 98.9535 187.064 105.362 189.467" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M91.5664 173.791C95.8549 173.975 99.723 175.311 103.829 176.404C106.024 176.988 108.723 176.999 110.691 178.18" stroke="#343541" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M150.519 45.2943C152.48 43.4022 154.659 41.8811 156.846 40.2674C159.228 38.5101 161.505 36.5901 164.005 34.9978C168.336 32.24 172.987 29.9702 177.369 27.2842C177.927 26.9425 180.726 24.795 181.2 25.6375C182.103 27.2419 182.31 29.2604 183.28 30.7857C183.833 31.6542 179.004 34.2535 178.41 34.6165C175.893 36.1541 173.482 37.8318 170.991 39.4007C168.529 40.9506 166.292 42.8856 163.901 44.5489C162.662 45.4105 161.177 46.1726 160.191 47.3223" stroke="#4E599C" strokeWidth="3.75" strokeLinecap="round"/>
                                    <path d="M160.816 47.0103C159.368 47.1552 158.492 48.4718 157.219 48.7264C156.494 48.8714 155.649 49.5712 155.044 49.9745" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M151.144 44.5142C151.424 46.8493 152.599 48.1714 153.952 49.9744" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M151.299 44.9822C150.168 46.7131 148.942 48.3798 147.798 50.1131C147.667 50.3114 145.57 53.6476 145.666 53.6839C146.352 53.9453 147.988 53.1711 148.691 53.0252C149.585 52.8396 150.468 52.5593 151.377 52.4705C152.529 52.3582 153.555 51.8887 154.575 51.3785" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M149.115 50.4425C149.34 50.7801 149.427 51.4317 149.427 51.8466" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M155.044 51.2225C156.715 51.0554 157.968 49.358 159.247 48.4231C160.118 47.7869 161.036 47.3193 161.596 46.3863" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M100.405 112.682C98.255 112.682 96.0654 112.834 94.0154 113.539C93.3324 113.773 91.667 114.24 91.4793 115.054C90.9128 117.508 92.5364 119.551 94.0318 121.312C96.1759 123.836 98.6789 126.484 101.64 128.064C102.07 128.293 103.325 127.444 103.657 127.273C105.138 126.514 106.241 125.358 107.453 124.243C108.663 123.131 109.803 121.915 111.06 120.859C111.601 120.405 112.131 119.989 112.476 119.36C112.783 118.802 112.86 118.061 112.27 117.639C111.67 117.211 110.852 116.959 110.187 116.684C108.504 115.987 106.82 115.301 105.09 114.724C102.644 113.909 100.124 113.158 97.589 112.682" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M102.925 127.8C102.925 128.786 103.442 129.725 103.806 130.616C105.398 134.522 107.14 138.372 108.713 142.284C109.215 143.532 109.671 144.807 110.154 146.063C110.397 146.696 110.824 147.502 110.78 148.204C110.697 149.532 109.704 150.788 109.158 151.959C108.272 153.858 107.214 155.684 106.482 157.649C106.028 158.866 105.487 160.252 104.703 161.296" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                    <path d="M100.257 128.689C100.115 130.038 98.4908 131.551 97.6797 132.51C96.5442 133.853 95.2461 135.029 94.0237 136.289C92.4733 137.888 91.1119 139.623 89.7173 141.353C89.1852 142.014 88.6615 142.581 88.1858 143.28C87.624 144.106 88.1207 145.464 88.2516 146.343C88.7649 149.79 89.1409 153.222 89.1409 156.702" stroke="#4E599C" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </div>


    )
}