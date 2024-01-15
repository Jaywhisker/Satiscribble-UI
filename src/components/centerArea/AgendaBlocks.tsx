import React, { useState, useEffect, useRef } from "react";

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [noDelete, setNoDelete] = useState(false);

  const textInputRefs = useRef([]);

  const toast = useToast();

  //intialisation to alw alr have 1 agenda input space
  useEffect(() => {
    if (props.agendaItems.length <= 0) {
      addNewAgendaItem(undefined);
    }
  }, []);

  // Adding mouse arrow key functionality
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (focused) {
        switch (event.key) {
          case "ArrowUp":
            console.log("up");
            var newIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(newIndex);
            textInputRefs.current[newIndex]?.focus();
            break;
          case "ArrowDown":
            console.log("down");
            var newIndex = Math.min(focusedIndex + 1, nextId - 1);
            setFocusedIndex(newIndex);
            textInputRefs.current[newIndex]?.focus();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex]);

  // Update the refs array when the agenda items change
  useEffect(() => {
    textInputRefs.current = textInputRefs.current.slice(
      0,
      props.agendaItems.length
    );
  }, [props.agendaItems]);

  //updating agenda when unfocused
  useEffect(() => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(async () => {
      if (!focused &&  props.agendaItems.length > 0 ) {
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
          toast.agendaSaveFail({ items: agendaContent }, false, toast);
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
    }

    var topicAddFailedAlert = toast.alertContainer.filter(
      (alert) => alert.type === "addTopicfail" && alert.stateValue === false
    ); 
    if (topicAddFailedAlert.length > 0) {
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
      addNewAgendaItem(index);
      setNoDelete(false);
    } else if (e.key === "Backspace" && props.agendaItems[index].name === "") {
      // Delete row if row is empty
      e.preventDefault();
      if (props.agendaItems.length > 1) {
        const focusIndex = index > 0 ? index - 1 : 0;
        deleteAgendaItem(index, focusIndex);
        //add focus on modulartextfileagenda with id-1
      }
    } else if (e.key === "Backspace") {
      // Prevent agenda from being empty if there are minutes
      if (
        props.agendaItems[0].name.length === 1 &&
        props.agendaItems
          .slice(0, index)
          .every((item) => item.name.length === 0) &&
        props.topicContent.length > 0
      ) {
        e.preventDefault();
        setNoDelete(true);
      }
    } else {
      setNoDelete(false);
    }
  };

  // Function to add a new agenda item
  const addNewAgendaItem = (index) => {
    const newAgendaItems = [...props.agendaItems];
    const newAgendaItem = { id: `item-${nextId}`, name: "", completed: false };
    if (index !== null && index !== undefined) {
      newAgendaItems.splice(index + 1, 0, newAgendaItem);
    } else {
      newAgendaItems.push(newAgendaItem);
    }
    updateAgendaItems(newAgendaItems);
    setNextId(nextId + 1);

    // Set focus on the new item's input field
    setTimeout(() => {
      const newItemIndex =
        index !== null && index !== undefined
          ? index + 1
          : newAgendaItems.length - 1;
      textInputRefs.current[newItemIndex]?.focus();
    }, 0);
  };

  // Function to delete an agenda item
  const deleteAgendaItem = (index, focusIndex) => {
    const newAgendaItems = props.agendaItems.filter((_, i) => i !== index);
    updateAgendaItems(newAgendaItems);

    // Set focus on the previous (or next if the first was deleted) item's input field
    setTimeout(() => {
      textInputRefs.current[focusIndex]?.focus();
    }, 0);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
    setFocused(true);
    // Remove agendaSaveFail alert
    var agendaFailedAlert = toast.alertContainer.filter(
      (alert) => alert.type === "agendaSaveFail"
    );
    if (agendaFailedAlert.length > 0) {
      toast.update(agendaFailedAlert[0].id, "agendaSaveFail", null, null, true);
    }
  };

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
              ref={(el) => (textInputRefs.current[index] = el)}
              value={item.name}
              placeholder="Enter agenda here"
              onChange={(e) => handleAgendaChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={() => {
                setFocused(false), setFocusedIndex(null);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
