const loggerResponse = (statusCode, path, message) => {
  let response = `${path}  ${statusCode} - ${message}`;
  return response;
};
module.exports = loggerResponse;
