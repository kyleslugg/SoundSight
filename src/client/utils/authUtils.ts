export const exchangeToken = () => {
  fetch('/auth/refresh').catch((e) => {
    throw e;
  });
};
