publicApp.controller('EditAdController', function($scope, $location, $cookieStore, userData){
    var id;

//    (function(){
//        if(!$cookieStore.get('user')){
//            return $location.path('/');
//        } else {
//            init();
//        }
//    })();

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

    $scope.deleteImage = function() {
        $scope.ad['changeimage']=true;
        $scope.ad.imageDataUrl=null;
        $scope.$parent.showSuccessMessage('Image successfully deleted!');
    }

    $scope.changeImage = function() {
        $scope.ad['changeimage']=true;
        $scope.$parent.showSuccessMessage('Image successfully changed!');
    }

    $scope.updateTheAd = function(ad) {
        userData.editAd(id, ad).$promise
            .then(
            function() {
                $scope.$parent.showSuccessMessage('Ad successfully edited!');
                $location.path('/user/ads');
            },
            function(error) {
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }
});