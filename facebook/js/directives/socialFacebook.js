facebookApp.directive('socialFacebook', function ($rootScope, Facebook, $log, FacebookEmitter) {

  return {
    scope: {
      'options': '=socialFacebook'
    },
    link: function(scope, el, attrs) {
      el.on('click', function() {
        scope.$apply(function() {
          scope[attrs.ngClick.replace(/\(\)|\;/g, '')]();
        });
      });

      scope.login = function() {
        Facebook.getLoginStatus()
          .then(function(response) {
            FacebookEmitter.broadcast('login', true, response);
          })
          .catch(function(response) {
            $log.error(response.error);
            Facebook.login(scope.options)
            .then(function(response) {
              FacebookEmitter.broadcast('login', true, response);
            })
            .catch(function(response) {
              $log.error(response.error);
              FacebookEmitter.broadcast('login', false, response)
            });
          });
      };

      scope.share = function() {
        Facebook.share({
          url: scope.options.url,
          method: scope.options.method,
          app_id: scope.options.app_id,
          name: scope.options.name,
          link: scope.options.link,
          redirect_uri: scope.options.redirect_uri,
          caption: scope.options.caption,
          description: scope.options.description,
          message: scope.options.message,
          display: scope.options.display
        })
        .then(function(response) {
          FacebookEmitter.broadcast('share', true, response);
        })
        .catch(function(response) {
          FacebookEmitter.broadcast('share', false, response);
        });
      };

      scope.logout = function() {
        Facebook.getLoginStatus()
          .then(function() {
            Facebook.logout()
              .then(function(response) {
                FacebookEmitter.broadcast('logout', true, response);
              })
              .catch(function(response) {
                FacebookEmitter.broadcast('logout', false, response);
              });
          })
          .catch(function(rootScope) {
            FacebookEmitter.broadcast('logout', true, response);
          });
      };
    }
  };

});