const errorResponse = (message, statusCode, res) => {
  return res.json({
    message,
    statusCode,
  });
};
module.exports = errorResponse;
