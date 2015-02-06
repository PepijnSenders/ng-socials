socialTwitterApp.factory('TwitterScriptLoader', function($q, $window) {

  var attachDeferred = $q.defer();

  var attached = false;

  var TwitterScriptLoader = {

    twttr: null,

    attach: function() {
      if (attached) {
        return attachDeferred.promise;
      }

      attached = true;

      if (!$window.twttr) {
        $window.twttr = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
              t = $window.twttr || {};
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js, fjs);
          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };
          return t;
        }(document, 'script', 'twitter-wjs'));
      }

      $window.twttr.ready(this.initialize);

      return attachDeferred.promise;
    },

    initialize: function(twttr) {
      TwitterScriptLoader.twttr = twttr;
      attachDeferred.resolve(TwitterScriptLoader.twttr);
    }

  };

  return TwitterScriptLoader;
});