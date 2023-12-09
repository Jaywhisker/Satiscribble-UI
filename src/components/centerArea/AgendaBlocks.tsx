import React, { useState, useEffect } from "react";

import DynamicStyles from "@/styles/components/DynamicTextArea.module.css";
import AgendaStyles from "@/styles/components/AgendaBlock.module.css";

import ModularTextFieldAgenda from "./ModularTextFieldAgenda";

import { updateAgenda } from "@/functions/api/updateMinutes";
import { useToast } from "@/hooks/useToast";

interface AgendaProps {
  agendaItems: [{ id: string; name: string; completed: boolean }];
  setAgendaItems: any;
  topicContent: any[];
  minutesID: string;
  chatHistoryID: string;
  showCover: boolean; // New prop for cover visibility
  setShowCover: (show: boolean) => void;
}

export default function AgendaBlock(props: AgendaProps) {
  const checkedImage = "/CheckboxTicked.svg";
  const uncheckedImage = "/Checkbox.svg";
  const deleteIcon = "/Cancellation.svg";

  const [nextId, setNextId] = useState(0);
  const [focused, setFocused] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [noDelete, setNoDelete] = useState(false);

  const toast = useToast();

  //intialisation to alw alr have 1 agenda input space
  useEffect(() => {
    if (props.agendaItems.length <= 0) {
      addNewAgendaItem();
    }
  }, []);

  //updating agenda when unfocused
  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(async () => {
      if (!focused) {
        var agendaContent = props.agendaItems
          .map((agenda) => agenda.name)
          .filter((items) => items.trim() !== "");
        console.log("Agenda unfocused, updating agenda", agendaContent);
        var response = await updateAgenda(
          props.minutesID,
          props.chatHistoryID,
          agendaContent
        );
        if (response !== undefined) {
          console.log("ERROR:", response.ERROR);
          toast.agendaSaveFail({'items': agendaContent}, false, toast)
        }
      }
    }, 1000);

    setTimeoutId(newTimeoutId);
    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [focused]);


  //outline the agenda block on alert
  useEffect(() => {
    var unfilledAgenda = toast.alertContainer.some((alert) => {
      return alert.type === "addTopicfail";
    });
    const agendaBlock = document.querySelector("#agendaBlock") as HTMLElement;

    if (unfilledAgenda) {
      agendaBlock.style.outline = `2px solid var(--Alert-Red)`;
    } else if (agendaBlock.style.outline == `2px solid var(--Alert-Red)`) {
      agendaBlock.style.outline = "none";
    }
  }, [toast.alertContainer]);


  const updateAgendaItems = (newAgendaItems) => {
    // Function to update agenda items
    const agendaBlock = document.querySelector("#agendaBlock") as HTMLElement;

    // Remove addTopicfail alert
    if (agendaBlock.style.outline == `2px solid var(--Alert-Red)`) {
      agendaBlock.style.outline = "none";
      var topicAddFailedAlert = toast.alertContainer.filter(
        (alert) => alert.type === "addTopicfail" && alert.stateValue === false
      );
      toast.update(topicAddFailedAlert[0].id, "addTopicfail", null, null, true);
    }
    props.setAgendaItems(newAgendaItems);
  };

  const updateCheckbox = (index) => {
    // Updates if Agenda has been updated (ticked or unticked)
    const newAgendaItems = [...props.agendaItems];
    newAgendaItems[index].completed = !newAgendaItems[index].completed;
    updateAgendaItems(newAgendaItems);
  };

  const handleAgendaChange = (value, index) => {
    // Update Agenda Text
    const newAgendaItems = [...props.agendaItems];
    newAgendaItems[index].name = value;
    updateAgendaItems(newAgendaItems);
  };

  const handleKeyDown = (e, index) => {
    // Key functions
    if (e.key === "Enter") {
      // Create new input on enter
      e.preventDefault();
      addNewAgendaItem();
      setNoDelete(false);
    } 
    else if (e.key === "Backspace" && props.agendaItems[index].name === "") {
      // Delete row if row is empty
      e.preventDefault();
      if (props.agendaItems.length > 1) {
        deleteAgendaItem(props.agendaItems[index].id);
        //add focus on modulartextfileagenda with id-1
      }
    }
    else if (e.key === "Backspace") {
      // Prevent agenda from being empty if there are minutes
      if (
        props.agendaItems[0].name.length === 1 &&
        props.agendaItems.slice(0, index).every((item) => item.name.length === 0) &&
        props.topicContent.length > 0
      ) {
        e.preventDefault();
        setNoDelete(true);
      }
    } else {
      setNoDelete(false);
    }
  };

  const addNewAgendaItem = () => {
    // Adds a new agenda item to the list
    const newAgendaItems = [
      ...props.agendaItems,
      { id: nextId, name: "", completed: false },
    ];
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);
  };


  const deleteAgendaItem = (idToDelete) => {
    // Deletes agenda item
    if (props.agendaItems.length > 1) {
      // Prevents deletetion of row if there is only one agenda item left
      const newAgendaItems = props.agendaItems.filter(
        (item) => item.id !== idToDelete
      );
      updateAgendaItems(newAgendaItems);
    }
  };


  const handleFocus = () => {
    setFocused(true)
    // Remove agendaSaveFail alert
    var agendaFailedAlert = toast.alertContainer.filter(
      (alert) => alert.type === "agendaSaveFail"
    )
    if (agendaFailedAlert.length > 0) {
      toast.update(agendaFailedAlert[0].id, "agendaSaveFail", null, null, true)
    }
  }

  return (
    <div className={DynamicStyles.genericBlockHolder}>
      {props.showCover && (
        <div className={DynamicStyles.genericBlockCover}></div>
      )}
      <div className={DynamicStyles.genericBlock} id="agendaBlock">
        {noDelete && (
          <div>
            <p className={AgendaStyles.warningText}>
              *Your agenda shouldn't be empty!
            </p>
          </div>
        )}
        <div className={AgendaStyles.titleContainer}>
          <h1
            className={DynamicStyles.genericTitleText}
            style={{ cursor: "default" }}
          >
            Agenda
          </h1>
        </div>
        {props.agendaItems.map((item, index) => (
          <div
            key={item.id}
            className={DynamicStyles.agendaBlockTextFieldHolder}
          >
            <img
              src={item.completed ? checkedImage : uncheckedImage}
              alt={item.completed ? "Checked" : "Unchecked"}
              onClick={() => updateCheckbox(index)}
              className={AgendaStyles.checkboxImage}
            />
            <ModularTextFieldAgenda
              value={item.name}
              placeholder="Enter agenda here"
              onChange={(e) => handleAgendaChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
              onBlur={() => setFocused(false)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
