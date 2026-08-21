// Plain CommonJS control probe: no TypeScript, no imports, no config. If this
// also 500s, the problem is the function runtime itself, not our compile.
module.exports = (req, res) => {
  res.status(200).json({ ok: true, runtime: process.version });
};
