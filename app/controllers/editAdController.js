publicApp.controller('EditAdController', function($scope, $location, userData){
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

    $scope.deleteImage = function() {
        $scope.ad['changeimage']=true;
        $scope.ad.imageDataUrl=null;
    }

    $scope.changeImage = function() {
        $scope.ad['changeimage']=true;
    }

    $scope.updateTheAd = function(ad) {
        userData.editAd(id, ad).$promise
            .then(
            function() {
                $location.path('/user/ads');
            },
            function() {

            }
        )
    }
});