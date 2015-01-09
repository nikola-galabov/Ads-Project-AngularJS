publicApp.controller('DeleteAdController', function($scope, $location, userData){
    (function(){
        if(!$cookieStore.get('user')){
            console.log('Unauthorized');
            return $location.path('/');
        } else {
            init();
        }
    })();

    function init() {
        var id = $location.path().split('/');
        id = id[id.length-1];

        $scope.ad=userData.getAdById(id).$promise
            .then(
            function(value) {
                return $scope.ad = value;
            },
            function(err) {

            }
        );
    }

    $scope.deleteAd = function() {
        userData.deleteAd(id).$promise
        .then(
            function() {
                $location.path('/user/ads');
            },
            function() {

            }
        )
    }
})
