export const generateRandomString = (length: number) => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const sessionUIDGen = () => {
  let counter = 10000;
  return () => {
    return counter++;
  };
};

export const getSessionUID = sessionUIDGen();
