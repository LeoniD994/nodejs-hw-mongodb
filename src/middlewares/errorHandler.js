import createHttpError from 'http-errors';

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      message: err.message || 'Error',
      data: err.data || null,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
export default errorHandler;
