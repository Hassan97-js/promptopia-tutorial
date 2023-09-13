export const capitalize = (text: string | null) => {
  if (!text) {
    return "";
  }

  if (typeof text !== "string" || text.length === 0) {
    return "";
  }

  const words = text.toLowerCase().trim().split(" ");

  let result = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const capitalizedWord = word[0].toUpperCase() + word.slice(1);

    if (i === words.length - 1) {
      result += capitalizedWord;
    } else {
      result += capitalizedWord + " ";
    }
  }

  return result;
};
