socialFacebookApp.factory('FacebookEmitter', function($rootScope) {

  var _createEventName = function(key) {
    return `social.facebook.${key}`;
  };

  var FacebookEmitter = {
    broadcast: function(key, success, response) {
      $rootScope.$broadcast(_createEventName(key), {
        success: success,
        response: response
      });
    },
    get: function(key) {
      return _createEventName(key);
    }
  };

  return FacebookEmitter;

});