publicApp.controller('DeleteAdController', function($scope, $location, userData, $cookieStore, $timeout){
    var id;

    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        } else {
            init();
        }
    })();

    function init() {
        id = $location.path().split('/');
        id = id[id.length-1];
        $scope.ad=userData.getAdById(id).$promise
            .then(
            function(value) {
                return $scope.ad = value;
            },
            function(error) {
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        );
    }

    $scope.deleteAd = function() {
        userData.deleteAd(id).$promise
        .then(
            function() {
                $scope.$parent.showSuccessMessage('Ad successfully deleted!');
                $location.path('/user/ads');
            },
            function() {
                $scope.$parent.showErrorMessage('An error has occurred!');
            }
        )
    }
})
