function getHealth(req, res) {
  res.json({ success: true, data: { status: "ok" } });
}

module.exports = { getHealth };
