export const isAbbreviation = (word) => {
    return word.length > 1 && word === word.toUpperCase();
  };
  
  export const adjustHeight = (textareaRef) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'; 
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };
  
  export const handleFocus = (id) => {
    console.log(`Textarea with ID ${id} is focused.`);
  };
  
  export const handleBlur = (id, text) => {
    console.log(`Textarea with ID ${id} has lost focus, with text: ${text}`);
  };

