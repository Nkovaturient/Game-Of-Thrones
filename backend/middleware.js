

module.exports.payloadErr=(err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error("Bad JSON:", err);
      return res.status(400).json({ success: false, message: "Invalid JSON payload" });
    }
    next();
  };