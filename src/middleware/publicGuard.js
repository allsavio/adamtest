const isPublicEnabled = () => {
  const flag = process.env.PUBLIC_OUTPUT_ENABLED;
  if (flag === undefined) {
    return false;
  }
  return flag === 'true' || flag === true;
};

module.exports = (req, res, next) => {
  if (!isPublicEnabled() && req.headers['x-delivery-visibility'] === 'public') {
    return res.status(403).json({
      message: 'Public delivery mode is disabled. Remove the public visibility header or enable PUBLIC_OUTPUT_ENABLED.',
    });
  }
  return next();
};
