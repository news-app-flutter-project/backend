export const removeBrackets = (text: string): string => {
  const regex = /\[(.*?)\]|\((.*?)\)/g; // matches text in [] or ()
  text = text.replace(regex, ""); // removes all text enclosed in [] or ()
  text = text.replace(/\[[^\]]*\]/g, ""); // removes text starting with [
  text = text.replace(/\([^\)]*\)/g, ""); // removes text starting with (
  return text;
};
