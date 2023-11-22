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
    // if (!value.endsWith("<br></li></ul>")){
    //   console.log('triggered')
    //   const newValue = value.slice(0, -5) + "<li><br></li></ul>";
    //   console.log(newValue)
    //   setValue(newValue); // Update the state with the new value
    // };
    setActive(true);
  };
  
  export const handleBlur = (id, setActive, value, setValue) => {
    console.log(`Textarea with ID ${id} has lost focus, with text: ${value}`);
    if (value.endsWith("<br></li></ul>")){
      const newValue = value.slice(0, -14) + "</ul>";
      setValue(newValue); // Update the state with the new value
    };
    setActive(false);
  };

