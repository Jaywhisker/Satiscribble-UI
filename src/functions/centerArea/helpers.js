export const isAbbreviation = (word) => {
    return word.length > 1 && word === word.toUpperCase();
  };
  
export const adjustHeight = (textareaRef) => {
  if (textareaRef.current) {
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }
};

export const setDefaultHeight = (textareaRef) => {
  if (textareaRef.current) {
    const headerSize = getComputedStyle(document.documentElement).getPropertyValue('--headersize').trim();
    const headerSizeValue = parseFloat(headerSize);
    const adjustedHeight = headerSizeValue * (4 / 3);
    textareaRef.current.style.height = `${adjustedHeight}px`;
  }
};
  
  export const handleFocus = (id, setActive, quillValue, setQuillValue) => {
    console.log(`Textarea with ID ${id} is focused.`);
    setActive(true);
  };
  
  export const handleBlur = (id, value, setValue) => {
    console.log(`Textarea with ID ${id} has lost focus, with text: ${value}`);
    if (value.endsWith("<br></li></ul>")){
      const newValue = value.slice(0, -14) + "</ul>";
      setValue(newValue); // Update the state with the new value
    };
  };

// This functions purpose is not to create an accurate capture of the html code, but trying to get the point at which to slice to
export const deltaToHTML = (delta) =>{
  let html = "<ul>";
  let previousCharWasNewline = false;

  delta.ops.forEach((op) => {
    let text = op.insert
    if (/^[\n]+$/.test(text)) {
      let newlineCount = (text.match(/\n/g) || []).length;
      if (newlineCount != 1){
        html += `<li><br></li>`.repeat(newlineCount-1); 
        previousCharWasNewline = false
      } else {
        if (previousCharWasNewline){
          html += `<li><br></li>`.repeat(newlineCount)
          previousCharWasNewline = true
        } else {
          previousCharWasNewline = true
        }
      }
    }else{
      html += `<li>${text}</li>`; 
      previousCharWasNewline = false;
    }
  });
  return html;
}


export const updateListItems = (processedDelta, quillValue) => {
  const listItemRegex = /<li(?: class="([^"]*)")?>(.*?)<\/li>/g;

  const processedItems = [...processedDelta.matchAll(listItemRegex)];
  const quillItems = [...quillValue.matchAll(listItemRegex)];

  let updatedProcessedDelta = processedDelta;
  let lastQuillItemClass = null; // Initialize as null to indicate no class

  processedItems.forEach((processedItem, index) => {
    if (index < quillItems.length) {
      const quillItemClass = quillItems[index][1];
      const processedItemText = processedItem[2];

      if (quillItemClass) {
        // console.log(index, processedItem)
        updatedProcessedDelta = updatedProcessedDelta.replace(
          processedItem[0],
          `<li class="${quillItemClass}">${processedItemText}</li>`
        );
      }
    }
  });

  // Separate thing for returning the last class
  if (processedItems.length > 0) {
    const lastItemIndex = processedItems.length - 1;

    // Check if there is a corresponding item in quillItems
    if (lastItemIndex < quillItems.length) {
      const correspondingQuillItem = quillItems[lastItemIndex];
      lastQuillItemClass = correspondingQuillItem[1] || null; // Get class of the corresponding <li> in quillItems or null if not present
    }
  }

  return { updatedProcessedDelta, lastQuillItemClass };
}

//                             this from where
{/* <ul><li>The error</li><li><br></li><li><br></li><li><br></li><li><br></li><li class="ql-indent-1">Seems</li><li class="ql-indent-1">TO be</li><li>that</li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li>After tabbing twice</li><li class="ql-indent-1">Then</li><li class="ql-indent-1">Something</li><li class="ql-indent-2">Goes</li><li class="ql-indent-2">Wron</li><li class="ql-indent-1">I mean that's fine</li><li>Hmm</li><li><br></li><li><br></li><li>okay</li><li class="ql-indent-1">dah</li><li><br></li> */}
{/* <ul><li>The error</li><li><br></li><li><br></li><li><br></li><li><br></li><li class="ql-indent-1">Seems</li><li class="ql-indent-1">TO be</li><li>that</li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li><br></li><li>After tabbing twice</li><li class="ql-indent-1">Then</li><li class="ql-indent-1">Something</li><li class="ql-indent-2">Goes</li><li class="ql-indent-2">Wron</li><li class="ql-indent-1">I mean that's fine</li><li>Hmm</li><li><br></li><li><br></li><li>okay</li><li class="ql-indent-1">dah</li><li class="ql-indent-1"><br></li></ul><p><br></p> */}