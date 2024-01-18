import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import PopUp from "@/components/popup";

import rightBar from "@/styles/components/rightSideBar.module.css";

import SirLogo from "./chatContainer/sirLogos";
import UserChat from "./chatContainer/userInput";
import AssistantResponse from "./chatContainer/assistantResponse";
import GlossaryModal from "./glossary/glossaryModal";

import {
  fetchChatHistory,
  fetchGlossary,
} from "@/functions/api/fetchRightSideBar";

import { useToast } from "@/hooks/useToast";

interface rightSideBarProps {
  minutesID: string;
  chatHistoryID: string;
  topicTitles: string[];
  setSelectedMinutes: any;
}

export default function RightSideBar(props: rightSideBarProps) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState("CuriousCat");
  const [queryMode, setQueryMode] = useState(null);
  const [query, setQuery] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [documentChatHistory, setDocumentChatHistory] = useState([]);
  const [webChatHistory, setWebChatHistory] = useState([]);
  const [gptResponse, setGPTResponse] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [responseError, setResponseError] = useState([false, false]);

  const [glossaryData, setGlossaryData] = useState([]);
  const [glossaryMode, setGlossaryMode] = useState([]);

  const queryInputArea = useRef(null);
  const chatResponse = useRef(null);

  const toast = useToast();

  useEffect(() => {
    setGPTResponse("");
    setQueryMode(localStorage.getItem("queryMode") || "document");
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (props.minutesID != null) {
        await fetchChatHistory(
          props.minutesID,
          props.chatHistoryID,
          setDocumentChatHistory,
          setWebChatHistory
        );
        const glosaryLength = await fetchGlossary(
          props.minutesID,
          props.chatHistoryID,
          setGlossaryData
        );
        setGlossaryMode(Array(glosaryLength).fill("default"));
      }
    };
    fetchData();
  }, [props.minutesID]);

  useEffect(() => {
    const refetchGlossary = async () => {
      var newGlossary = toast.alertContainer.some((alert) => {
        return alert.type === "glossaryAdd";
      });
      if (newGlossary) {
        const glosaryLength = await fetchGlossary(
          props.minutesID,
          props.chatHistoryID,
          setGlossaryData
        );
        // console.log(glosaryLength)
        setGlossaryMode(Array(glosaryLength).fill("default"));
      }
    };
    refetchGlossary();
  }, [toast.alertContainer]);

  // useEffect(() => {
  //     if (loadingResponse && !(queryMode === 'document' ? responseError[0] : responseError[1])) {
  //         //loading true and error is false
  //         fetchQueryResponse(query)
  //     } else if (loadingResponse && (queryMode === 'document' ? responseError[0] : responseError[1]) && query.length > 0) {
  //         //send a new query instead of retrying
  //         //need to remove old query that failed
  //         fetchQueryResponse(query)
  //     }
  // }, [loadingResponse])

  useEffect(() => {
    if (loadingResponse) {
      let errorIndex;
      const updatedResponseError = [...responseError];
      if (queryMode === "document") {
        errorIndex = 0;
      } else if (queryMode === "web") {
        errorIndex = 1;
      }
      updatedResponseError[errorIndex] = false;
      setResponseError(updatedResponseError);
      fetchQueryResponse(query);
    }
  }, [loadingResponse]);

  useEffect(() => {
    if (selected === "CuriousCat") {
      const textarea = queryInputArea.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      var inputHeight = Math.min(
        textarea.scrollHeight,
        window.innerHeight * 0.25
      );
      const bottomTabElement = document.querySelector(
        "#bottomTab"
      ) as HTMLElement;
      const chatContainerElement = document.querySelector(
        "#chatContainer"
      ) as HTMLElement;

      if (queryMode === "document" ? responseError[0] : responseError[1]) {
        //if error, chatContainer height is smaller
        chatContainerElement.style.height = `${
          window.innerHeight * 0.64 - inputHeight
        }px`;
        var buttonElementHeight = window.innerHeight * 0.804 - inputHeight;
      } else {
        chatContainerElement.style.height = `${
          window.innerHeight * 0.69 - inputHeight
        }px`;
        var buttonElementHeight = window.innerHeight * 0.86 - inputHeight;
      }
      bottomTabElement.style.top = `${buttonElementHeight}px`;
      //insert scrolling logic if desired
    }
  }, [query, selected, queryMode, responseError]);


  useEffect(() => {
    if (loadingResponse && chatResponse.current) {
      chatResponse.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [gptResponse, loadingResponse]);

  function closeModal(event) {
    if (event.target.id == "showMore") {
      setShowMore(!showMore);
    } else {
      setShowMore(false);
    }
  }

  function handleExpand() {
    const dropDownContainerElement = document.querySelector(
      "#rightSideBar"
    ) as HTMLElement;
    const bottomTabElement = document.querySelector(
      "#bottomTab"
    ) as HTMLElement;

    if (!expanded && selected === "CuriousCat") {
      //previously not expanded but now expanding
      bottomTabElement.style.position = "absolute";
      dropDownContainerElement.style.animation = `${rightBar.scrollUp} 1.25s ease-in-out forwards`;
      setTimeout(() => {
        bottomTabElement.style.position = "fixed";
      }, 1250);
    } else if (expanded && selected === "CuriousCat") {
      bottomTabElement.style.position = "absolute";
      dropDownContainerElement.style.animation = `${rightBar.scrollDown} 1.25s ease-in-out forwards`;
    } else if (!expanded) {
      dropDownContainerElement.style.animation = `${rightBar.scrollUp} 1.25s ease-in-out forwards`;
    } else {
      dropDownContainerElement.style.animation = `${rightBar.scrollDown} 1.25s ease-in-out forwards`;
    }
    setExpanded(!expanded);
  }

  function handleTabChange(tabName) {
    setSelected(tabName);
  }

  function handleQueryChange(queryMode) {
    if (!loadingResponse) {
      setQueryMode(queryMode);
      localStorage.setItem("queryMode", queryMode);
    }
  }

  function handleKeyDown(event) {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      insertLineBreak();
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitQuery();
    }
  }

  function insertLineBreak() {
    const textarea = document.getElementById(
      "queryInput"
    ) as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = textarea;
    const text = textarea.value;
    const newText =
      text.substring(0, selectionStart) + "\n" + text.substring(selectionEnd);
    textarea.value = newText;
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
    setQuery(textarea.value);
  }

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmitQuery() {
    if (queryMode == "document") {
      var newDocumentHistory = [...documentChatHistory];
      if (responseError[0]) {
        newDocumentHistory.pop(); //remove old user query that failed
      }
      newDocumentHistory.push({ user: query });
      setDocumentChatHistory(newDocumentHistory);
    } else if (queryMode == "web") {
      var newWebHistory = [...webChatHistory];
      if (responseError[1]) {
        newWebHistory.pop(); //remove old user query that failed
      }
      newWebHistory.push({ user: query });
      setWebChatHistory(newWebHistory);
    }
    setLoadingResponse(true);
    setWaitingResponse(true);
  }

  async function handleClearChat() {
    try {
      var requestData = {
        type: queryMode,
        minutesID: props.minutesID,
        chatHistoryID: props.chatHistoryID,
      };
      await axios.post("/api/clear", requestData);
      await fetchChatHistory(
        props.minutesID,
        props.chatHistoryID,
        setDocumentChatHistory,
        setWebChatHistory
      );
      setDeleteMode(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchQueryResponse(query) {
    var requestData = {
      type: queryMode,
      query: query,
      minutesID: props.minutesID,
      chatHistoryID: props.chatHistoryID,
    };
    let errorIndex;
    const updatedResponseError = [...responseError];
    if (queryMode === "document") {
      errorIndex = 0;
    } else if (queryMode === "web") {
      errorIndex = 1;
    }
    setQuery("");

    try {
      let res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ requestData }),
      });
      if (res.ok) {
        setWaitingResponse(false);
        const reader = res.body.getReader();
        const processStream = async () => {
          let fullResponse;

          while (true) {
            // .read() returns 2 properties
            const { done, value } = await reader.read();

            if (done) {
              console.log(fullResponse);
              setLoadingResponse(false);
              if (queryMode === "web") {
                var newWebChat = [...webChatHistory];
                newWebChat.push({ assistant: fullResponse.slice(9) });
                setWebChatHistory(newWebChat);
                setGPTResponse("");
              } else if (queryMode === "document") {
                var newDocumentChat = [...documentChatHistory];
                var sourceIDs = res.headers.get("sourceID");
                const sourceIDsList = sourceIDs
                  .slice(1, -1)
                  .split(", ")
                  .map((value) => value.slice(1, -1));
                newDocumentChat.push({
                  assistant: fullResponse.slice(9),
                  sourceID: sourceIDsList,
                });
                setDocumentChatHistory(newDocumentChat);
                setGPTResponse("");
              }
              break;
            }
            let chunk = new TextDecoder("utf-8").decode(value);

            // append to the response
            setGPTResponse((prev) => prev + chunk);
            fullResponse += chunk;
          }
        };
        processStream().catch((err) => console.log("--stream error--", err));
      } else {
        setLoadingResponse(false);
        setWaitingResponse(false);
        updatedResponseError[errorIndex] = true;
        setResponseError(updatedResponseError);
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function retryQuery() {
  //     setQuery('')
  //     setWaitingResponse(true)
  //     setLoadingResponse(true)
  //     if (queryMode == 'document') {
  //         //submit query already added the userQuery to the document chat history
  //         var lastQuery = documentChatHistory[documentChatHistory.length - 1]
  //         var userQuery = lastQuery.user
  //     } else if (queryMode == 'web') {
  //         var lastQuery = webChatHistory[webChatHistory.length -1]
  //         var userQuery = lastQuery.user
  //     }
  //     fetchQueryResponse(userQuery)
  // }

  return (
    <div
      style={{
        height: "100vh",
        width: `var(--rightSideWidth)`,
        backgroundColor: `var(--Dark_Grey_50)`,
        position: "fixed",
        bottom: "0",
        right: "0",
      }}
    >
      {deleteMode && (
        <div className={rightBar.deleteOverlay}>
          <PopUp.ClearChat
            isOpen={true}
            onClose={() => setDeleteMode(false)}
            onDelete={() => handleClearChat()}
          />
        </div>
      )}
      <div className={rightBar.overallContainer} id="rightSideBar">
        <div className={rightBar.dropDownContainer} onClick={handleExpand}>
          <svg
            className={rightBar.dropDownIcon}
            style={{ transform: expanded ? "none" : "rotate(180deg)" }}
            viewBox="0 0 19 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5265 9.61822C10.2589 9.86267 9.89594 10 9.51754 10C9.13913 10 8.77621 9.86267 8.5086 9.61822L0.435668 2.24185C0.299368 2.12156 0.190651 1.97768 0.115859 1.81859C0.041068 1.65951 0.00170046 1.4884 5.3881e-05 1.31527C-0.00159269 1.14213 0.034515 0.970431 0.106269 0.810182C0.178024 0.649933 0.283988 0.504345 0.417979 0.381914C0.551971 0.259484 0.711305 0.162663 0.886687 0.0970995C1.06207 0.0315363 1.24998 -0.00145527 1.43947 4.92329e-05C1.62896 0.00155374 1.81621 0.0375246 1.99032 0.105863C2.16443 0.174201 2.3219 0.273537 2.45354 0.398077L9.51754 6.85257L16.5815 0.398077C16.8507 0.160554 17.2112 0.0291241 17.5853 0.0320951C17.9595 0.035066 18.3174 0.1722 18.582 0.41396C18.8466 0.655721 18.9967 0.982765 18.9999 1.32465C19.0032 1.66654 18.8594 1.99592 18.5994 2.24185L10.5265 9.61822Z"
              fill="#B1B1B1"
            />
          </svg>
        </div>

        <div className={rightBar.tabOverallContainer}>
          <div
            className={rightBar.tabContainer}
            onClick={() => handleTabChange("CuriousCat")}
            style={{
              backgroundColor:
                selected === "CuriousCat" ? `var(--Dark_Grey)` : `var(--Grey)`,
            }}
          >
            <p
              className={rightBar.tabText}
              style={{
                color:
                  selected === "CuriousCat"
                    ? `var(--Nice_Blue)`
                    : `var(--Off_White)`,
              }}
            >
              CuriousCat
            </p>
          </div>
          <div
            className={rightBar.tabContainer}
            onClick={() => handleTabChange("Glossary")}
            style={{
              backgroundColor:
                selected === "Glossary" ? `var(--Dark_Grey)` : `var(--Grey)`,
            }}
          >
            <p
              className={rightBar.tabText}
              style={{
                color:
                  selected === "Glossary"
                    ? `var(--Nice_Blue)`
                    : `var(--Off_White)`,
              }}
            >
              Glossary
            </p>
          </div>
        </div>

        {selected == "CuriousCat" ? (
          <div className={rightBar.tabDetailsContainer}>
            <div className={rightBar.backgroundIconContainer}>
              <p className={rightBar.backgroundText}>CURIOUSCAT</p>
              <SirLogo mode="qna" />
            </div>

            <div className={rightBar.moreContainer}>
              <svg
                className={rightBar.moreIcon}
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="36"
                  height="36"
                  rx="5"
                  fill="#9CA5D8"
                  className={rightBar.hoverable}
                  id="showMore"
                  style={{ fillOpacity: showMore ? 0.35 : 0.1 }}
                />
                <path
                  d="M25.5753 18H25.4253"
                  stroke="#9CA5D8"
                  strokeWidth="3.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.0753 18H17.9253"
                  stroke="#9CA5D8"
                  strokeWidth="3.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5753 18H10.4253"
                  stroke="#9CA5D8"
                  strokeWidth="3.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {showMore && (
              <div
                className={rightBar.clearChatContainer}
                onClick={() => setDeleteMode(true)}
              >
                <p className={rightBar.clearChatText}>Clear Chat</p>
              </div>
            )}

            <div id="chatContainer" className={rightBar.chatContainer}>
              {queryMode === "document" &&
                documentChatHistory.map((chatDetail, index) =>
                  chatDetail.hasOwnProperty("user") ? (
                    <UserChat text={chatDetail.user} id={index} />
                  ) : (
                    <AssistantResponse
                      text={chatDetail.assistant}
                      sourceID={chatDetail.sourceID.map(
                        (data) => props.topicTitles[parseInt(data, 10)]
                      )}
                      copyable={false}
                      id={index}
                      setSelectedMinutes={props.setSelectedMinutes}
                    />
                  )
                )}

              {queryMode === "document" && loadingResponse && (
                <div ref={chatResponse} style={{ scrollMarginBottom: "5vh" }}>
                  <AssistantResponse
                    text={gptResponse}
                    copyable={true}
                    id={documentChatHistory.length + 1}
                    waiting={waitingResponse}
                  />
                </div>
              )}

              {queryMode === "web" &&
                webChatHistory.map((chatDetail, index) =>
                  chatDetail.hasOwnProperty("user") ? (
                    <UserChat text={chatDetail.user} id={index} />
                  ) : (
                    <AssistantResponse
                      text={chatDetail.assistant}
                      copyable={true}
                      id={index}
                    />
                  )
                )}

              {queryMode === "web" && loadingResponse && (
                <div ref={chatResponse} style={{ scrollMarginBottom: "5vh" }}>
                  <AssistantResponse
                    text={gptResponse}
                    copyable={true}
                    id={webChatHistory.length + 1}
                    waiting={waitingResponse}
                  />
                </div>
              )}
            </div>

            <div className={rightBar.inputContainer} id="bottomTab">
              {queryMode == "document" && responseError[0] ? (
                <p className={rightBar.errorText}>
                  Oops! Something went wrong while generating a response.
                  <br />
                  Please try again.
                </p>
              ) : // Button if you need to have it, look at responseError
              queryMode == "web" && responseError[1] ? (
                <p className={rightBar.errorText}>
                  Oops! Something went wrong while generating a response.
                  <br />
                  Please try again.
                </p> // Button if you need to have it, look at responseError
              ) : // Button if you need to have it, look at responseError
              null}
              <div
                className={rightBar.buttonContainer}
                style={{ opacity: loadingResponse ? "0.5" : "1" }}
              >
                <div
                  className={rightBar.button}
                  onClick={() => handleQueryChange("document")}
                  style={{
                    backgroundColor:
                      queryMode == "document"
                        ? `var(--Nice_Blue)`
                        : `var(--Dark_Blue)`,
                  }}
                >
                  <p
                    className={rightBar.buttonText}
                    style={{
                      color:
                        queryMode == "document"
                          ? `var(--Dark_Blue)`
                          : `var(--Nice_Blue)`,
                    }}
                  >
                    DOCUMENT QUERY
                  </p>
                </div>

                <div
                  className={rightBar.button}
                  onClick={() => handleQueryChange("web")}
                  style={{
                    backgroundColor:
                      queryMode == "web"
                        ? `var(--Nice_Blue)`
                        : `var(--Dark_Blue)`,
                  }}
                >
                  <p
                    className={rightBar.buttonText}
                    style={{
                      color:
                        queryMode == "web"
                          ? `var(--Dark_Blue)`
                          : `var(--Nice_Blue)`,
                    }}
                  >
                    WEB QUERY
                  </p>
                </div>
              </div>

              <div className={rightBar.inputTextContainer}>
                <textarea
                  id="queryInput"
                  className={rightBar.queryContainer}
                  ref={queryInputArea}
                  placeholder="Ask me anything! Shift enter for newline"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={loadingResponse}
                />

                {loadingResponse ? (
                  <div className={rightBar.loadingAnimation}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <svg
                    onClick={handleSubmitQuery}
                    className={rightBar.sendIcon}
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.18675 24.505L23.7099 13.9249C23.9324 13.8162 24.1222 13.6349 24.2555 13.4036C24.3889 13.1722 24.46 12.901 24.46 12.6236C24.46 12.3463 24.3889 12.0751 24.2555 11.8437C24.1222 11.6123 23.9324 11.431 23.7099 11.3223L2.18675 0.742227C2.00038 0.649007 1.79671 0.610461 1.5941 0.630065C1.3915 0.64967 1.19633 0.726809 1.02622 0.854523C0.85611 0.982238 0.716399 1.15651 0.619695 1.36162C0.52299 1.56672 0.472333 1.79621 0.472295 2.02938L0.459961 8.55001C0.459961 9.25723 0.916326 9.86545 1.53304 9.95031L18.9613 12.6236L1.53304 15.2828C0.916326 15.3818 0.459961 15.99 0.459961 16.6973L0.472295 23.2179C0.472295 24.2221 1.37269 24.9152 2.18675 24.505Z"
                      fill="#B1B1B1"
                    />
                  </svg>
                )}
              </div>

              <p className={rightBar.warningText}>
                CuriousCat can make mistakes. Remember to double check.
              </p>
            </div>
          </div>
        ) : selected == "Glossary" ? (
          <div className={rightBar.glossaryBlock}>
            <div className={rightBar.backgroundIconContainer}>
              <p className={rightBar.backgroundText}>GLOSSARY</p>
              <SirLogo mode="glossary" />
            </div>

            <div>
              {glossaryData.map((data, index) => (
                <div key={index}>
                  <GlossaryModal
                    type={glossaryMode[index]}
                    abbreviation={data.abbreviation}
                    meaning={data.meaning}
                    id={index}
                    glossaryType={glossaryMode}
                    setGlossaryType={setGlossaryMode}
                    glossaryData={glossaryData}
                    setGlossaryData={setGlossaryData}
                    minutesID={props.minutesID}
                    chatHistoryID={props.chatHistoryID}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
