socialFacebookApp.service('Facebook', function ($rootScope, $q, FacebookScriptLoader, $log, $timeout) {

  this.getMe = function() {
    var getMeDeferred = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.api('/me', function(response) {
          if (response && 'error' in response) {
            getMeDeferred.reject({
              error: response.error
            });
          } else {
            if ('email' in response) {
              getMeDeferred.resolve({
                email: response.email,
                id: response.id
              });
            } else {
              getMeDeferred.reject({
                error: 'No email'
              });
            }
          }
        });
      });

    return getMeDeferred.promise;
  };

  this.getPermissions = function() {
    var getPermissionsDefer = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.api('/me/permissions', function(response) {
          if (response && 'error' in response) {
            getPermissionsDefer.reject({
              error: response.error
            });
          } else {
            getPermissionsDefer.resolve(response.data);
          }
        });
      });

    return getPermissionsDefer.promise;
  };

  this.getUserLikesPage = function(userId, pageId) {
    var likePageDeffered = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.api(`/${userId}/likes/${pageId}`, function(response) {
          if (response && 'error' in response) {
            likePageDeffered.reject({
              error: response.error
            });
          } else {
            $log.info(response);
          }
        });
      });

    return likePageDeffered.promise;
  };

  this.getLoginStatus = function() {
    var getLoginStatusDeferred = $q.defer();

    var connected = 'connected';

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.getLoginStatus(function(response) {
          if (response && 'error' in response) {
            getLoginStatusDeferred.reject({
              error: response.error
            });
          } else {
            if (response.status === connected) {
              getLoginStatusDeferred.resolve(response.authResponse);
            } else {
              getLoginStatusDeferred.reject({
                error: `Status is ${response.status}`
              });
            }
          }
        });
      });

    return getLoginStatusDeferred.promise;
  };

  this.share = function(options) {
    var shareDeferred = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.ui({
          method: 'share',
          href: options.url
        }, function(response) {
          if (response && 'error' in response) {
            shareDeferred.reject({
              error: response.error,
              code: response.error_code
            });
          } else {
            shareDeferred.resolve(response);
          }
        });
      });

    return shareDeferred.promise;
  };

  this.logout = function() {
    var logoutDeferred = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.logout(function(response) {
          if (response && 'error' in response) {
            logoutDeferred.reject({
              error: response.error
            });
          } else {
            $timeout(function() {
              logoutDeferred.resolve(response);
            });
          }
        });
      });

    return logoutDeferred.promise;
  };

  this.login = function(options = {}) {
    var loginDeferred = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.login(function(response) {
          if (response && 'error' in response) {
            loginDeferred.reject({
              error: response.error
            });
          } else {
            if (response.authResponse) {
              loginDeferred.resolve(response.authResponse);
            } else {
              loginDeferred.reject({
                error: 'User cancelled login'
              });
            }
          }
        }, options);
      });

    return loginDeferred.promise;
  };

  this.getProfilePicture = function(type = 'large') {
    var getProfilePictureDeferred = $q.defer();

    FacebookScriptLoader.attach()
      .then(function(fb) {
        fb.api(`/me/picture?type=${type}`, function(response) {
          if (response && 'error' in response) {
            getProfilePictureDeferred.reject({
              error: response.error
            });
          } else {
            if ('data' in response && 'is_silhouette' in response.data) {
              getProfilePictureDeferred.resolve(response.data);
            } else {
              getProfilePictureDeferred.reject({
                error: 'No picture'
              });
            }
          }
        });
      });

    return getProfilePictureDeferred.promise;
  };

});