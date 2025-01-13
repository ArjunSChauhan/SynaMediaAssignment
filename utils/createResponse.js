const createResponse = (data = {}, statusCode, message, res) => {
  return res.status(parseInt(statusCode)).json({
    data,
    statusCode,
    message,
  });
};
module.exports = createResponse;
