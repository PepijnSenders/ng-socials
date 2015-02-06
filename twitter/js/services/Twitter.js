twitterApp.service('Twitter', function(TwitterScriptLoader, TwitterEmitter, $window) {

  this.bind = function(eventName, cb) {
    TwitterScriptLoader.attach()
      .then(function(twttr) {
        twttr.events.bind(eventName, cb);
      });
  };

  this.loadWidget = function(el) {
    TwitterScriptLoader.attach()
      .then(function(twttr) {
        twttr.widgets.load(el);
      });
  };

});