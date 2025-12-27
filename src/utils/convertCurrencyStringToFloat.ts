export const convertCurrencyStringToFloat = (value: string) => {
  const cleanedString = value.replace(/[^\d,]/g, '');

  const numberString = cleanedString.replace(',', '.');

  const number = parseFloat(numberString);

  if (isNaN(number)) {
    throw new Error(`error trying to convert string value: "${value} to number"`);
  }

  return number;
};

