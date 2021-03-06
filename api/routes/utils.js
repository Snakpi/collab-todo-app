function codeAndJson(res, code, content = null) {
  if (!content) {
    content =
      code === 400
        ? "Invalid query"
        : code === 404
        ? "Resource not found"
        : code === 500
        ? "Internal server error"
        : code === 409
        ? "Resource conflict"
        : content;
  }
  return res.status(code).json({
    code,
    content,
  });
}

module.exports = { codeAndJson };
