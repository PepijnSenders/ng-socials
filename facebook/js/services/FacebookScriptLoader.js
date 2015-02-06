socialFacebookApp.factory('FacebookScriptLoader', function(APP_ID, $q, $window) {

  var attachDeferred = $q.defer();

  var attached = false;

  var FacebookScriptLoader = {

    fb: null,

    attach: function() {
      if (attached) {
        return attachDeferred.promise;
      }

      if (!$window.FB) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//connect.facebook.net/en_US/sdk.js';
        document.body.appendChild(script);
      }

      attached = true;

      return attachDeferred.promise;
    },

    initialize: function() {
      FacebookScriptLoader.fb = $window.FB;
      FacebookScriptLoader.fb.init({
        appId: APP_ID,
        cookie: true,
        version: 'v2.0'
      });
      attachDeferred.resolve(FacebookScriptLoader.fb);
    }

  };

  $window.fbAsyncInit = FacebookScriptLoader.initialize;

  return FacebookScriptLoader;

});