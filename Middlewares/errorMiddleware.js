const globalError = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const status = err.status || "error";
  res.status(statuscode).json({
    status: status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
module.exports = globalError;
