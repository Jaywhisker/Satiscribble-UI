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
  
// Function that is used to remove extra empty bullet points if they are left empty
// Used in textAreaUsingQuill
export const handleBlur = (id, textValue, value, setValue, minutesID, chatHistoryID) => {
  if (value.endsWith("<br></li></ul>")){
    const newValue = value.slice(0, -14) + "</ul>";
    setValue(newValue); // Update the state with the new value
  };
};

// This functions purpose is to convert the list input from react quill into a single paragraph to be processed
// Used in textAreaUsingQuill
export const deltaToHTML = (delta) =>{
  let html = "<ul>";
  let previousCharWasNewline = false;
  
  // So delta is a list of each line from the react quill library
  delta.ops.forEach((op) => {
    let text = op.insert
    if (/^[\n]+$/.test(text)) {
      // For each enter there is \n, but for empty gaps, it is \n\n, so this is used to check and replicate that
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
      // Base case of text not being \n
      html += `<li>${text}</li>`; 
      previousCharWasNewline = false;
    }
  });
  return html;
}


// This function is used to create nested bullet points in react quill
// They use a unique class so this is scanning for that class and readding it
// Used in textAreaUsingQuill
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


// Function that is used to cleanup the raw text from quill area before sending to backend
// Used in textAreaUsingQuill
export const deltaToBackend = (rawText) => {
  const multipleNewlineRegex = /(\n{2,})/g;
  
  // Replace multiple newline characters with a single newline
  let cleanedText = rawText.replace(multipleNewlineRegex, '\n');

  if (cleanedText.endsWith('\n')) {
    cleanedText = cleanedText.slice(0, -1);
  }

  return cleanedText
}

// Function that is used to find the last abbreviation in the content block
// Used in textAreaUsingQuill
export const detectLastAbbreviation = (text) => {
  // Regular expression to match the abbreviations as per the new rules
  const abbreviationRegex = /\b[A-Z]{2,}\b/g;

  const matches = text.match(abbreviationRegex);

  // If no matches found, return null
  if (!matches || matches.length === 0) {
    return null;
  }

  return matches[matches.length - 1];
};