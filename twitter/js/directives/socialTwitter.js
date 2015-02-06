twitterApp.directive('socialTwitter', function(Twitter, $window, TwitterEmitter) {

  return {
    scope: {
      'options': '=socialTwitter'
    },
    link: function(scope, el, attrs) {
      Twitter.loadWidget(el[0].parentNode);
      var urlParameters = [];
      for (var key in scope.options) {
        var encoded = $window.encodeURIComponent(scope.options[key]);
        urlParameters.push(`${key}=${encoded}`);
      }
      var urlParametersString = urlParameters.join('&');

      var url = `https://twitter.com/intent/tweet?${urlParametersString}`;
      el[0].setAttribute('href', url);
      Twitter.bind('tweet', function(e) {
        if (e.target === el[0]) {
          TwitterEmitter.broadcast('tweet', true, e);
        }
      });
    }
  };

});