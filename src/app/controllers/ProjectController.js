module.exports = {
    async work (req, res) {
        res.send({ ok: true, user: req.userId });
    }
}
