publicApp.controller('DeleteAdController', function($scope, $location, userData){
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

    $scope.deleteAd = function() {
        console.log('op')
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
