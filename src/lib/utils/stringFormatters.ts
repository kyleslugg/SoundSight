export const toTitleCase = (str: string): string => {
  if (!str.length) return '';
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
};
