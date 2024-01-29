export const debug = (message, ...optionalParams) => {
  if (false) {
    console.log(message, optionalParams);
  }
};

export const error = (message, ...optionalParams) => {
  console.error(message, optionalParams);
};

export const warn = (message, ...optionalParams) => {
  console.warn(message, optionalParams);
};
