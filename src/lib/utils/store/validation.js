/* eslint-disable import/prefer-default-export */
export const validateJSON = (json) => {
  if (!json.status) {
    return json.error;
  }

  return null;
};
