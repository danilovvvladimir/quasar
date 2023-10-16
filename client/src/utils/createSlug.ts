const transliterate = (text: string): string => {
  const translitDict: { [key: string]: string } = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  const transliteratedText = text
    .toLowerCase()
    .split("")
    .map((char) => translitDict[char] || char)
    .join("");
  return transliteratedText;
};

export const createSlug = (text: string): string => {
  const transliteratedText = transliterate(text);
  const slug = transliteratedText.replace(/\W+/g, "-").replace(/^-+|-+$/g, "");
  return slug;
};
