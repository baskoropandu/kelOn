const myLogger = (req, res, next) => {
  if (req.session.isLogin === true) {
    next()
  }
  else {
    let err = ['anda harus login terlebih dahulu']
    res.redirect(`/login?err=${err}`)
  }
}

module.exports = myLogger