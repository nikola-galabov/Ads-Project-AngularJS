publicApp.controller('UserController',function($scope, $location, $timeout, userData){
    $scope.ads = userData.getUserAds();
    $scope.ad = {
        title: '',
        text: '',
        imageDataUrl:'',
        categoryId:'',
        townId:''
    }

    $scope.publishTheAd = function(){
        userData.createAd($scope.ad)
            .$promise.then(
                function(value){
                    $scope.alert = { type: 'success', msg: 'Ad successfully published!' };
                    $location.path('/user/ads');
                },

                function(err) {
                    $scope.alert = { type: 'success', msg: 'ERROR!' };
                })
            .then(function(){
                $scope.alertShow=true;
                $timeout(closeAlert, 5000);
            })
    }

    function closeAlert() {
        $scope.alertShow=false;
    }

    $scope.$location = $location;

});