export const handleError = (err, res) => {
  const response = { error: true, message: err };
  return res.status(400).json(response);
};
