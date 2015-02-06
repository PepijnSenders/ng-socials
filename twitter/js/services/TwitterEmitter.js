socialTwitterApp.factory('TwitterEmitter', function($rootScope) {

  var _createEventName = function(key) {
    return `social.twitter.${key}`;
  };

  var TwitterEmitter = {
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

  return TwitterEmitter;

});