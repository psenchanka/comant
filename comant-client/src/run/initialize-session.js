(function() {
  'use strict';

  angular
    .module('comantApp')
    .run(initializeSession);

  initializeSession.$inject = ['session', '$http', '$rootScope'];

  //If we have a saved token, restore our session.
  function initializeSession(session, $http, $rootScope) {
    if (session.getAuthToken()) {
      $http.get('api/users/me')
        .then(response => $rootScope.currentUser = response.data)
        .then(session.initializationComplete, session.initializationComplete);
    } else {
      session.initializationComplete();
    }
  }
})();