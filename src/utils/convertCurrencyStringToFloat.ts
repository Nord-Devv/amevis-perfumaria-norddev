export const convertCurrencyStringToFloat = (value: string) => {
  let cleanedString = value.replace(/R\$\s*/g, '').trim();
  cleanedString = cleanedString.replace(/\./g, '').replace(',', '.');

  const number = parseFloat(cleanedString);

  if (isNaN(number)) {
    throw new Error(`error trying to convert string value: "${value} to number"`);
  }

  return number;
}
