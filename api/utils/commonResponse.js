function ok(body = {}, res) {
  return res.status(200).send({
    success: true,
    body,
  });
}

function badRequest(msg = '', res) {
  return res.status(409).send({
    success: false,
    msg,
  });
}

function internalError(msg = '', res) {
  return res.status(500).send({
    success: false,
    msg,
  });
}

module.exports = {
  ok,
  badRequest,
  internalError,
}