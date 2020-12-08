export const validatorUrl = function (v) {
  return /^https?:\/\/(www\.)?[\w-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
};
