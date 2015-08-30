/* global rdf */

var PubkeyLogin = require('pubkey-login')

function initPubkeyLogin (config) {
  var options = config.authn || {}

  var StoreClass = options.StoreClass || rdf.LdpStore
  var store = new StoreClass(options.storeOptions)

  config.appCtx.pubkeyLogin = new PubkeyLogin({'rdf': rdf, 'store': store})
  config.app.use(config.appCtx.pubkeyLogin.middleware)
};

function initAssertion (config) {
  config.app.use('/login-assertion', config.appCtx.pubkeyLogin.assertionMiddleware)
};

module.exports = function () {
  var config = this

  initPubkeyLogin(config)
  initAssertion(config)
}
