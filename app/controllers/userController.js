publicApp.controller('UserController',function($route, $scope, $location, $timeout, userData){
    $scope.userAds = userData.getUserAds();
    $scope.status = 'all';
    $scope.startPage = 1;

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

    $scope.publishAgainAd = function(id){
        userData.publishAgainAd(id).$promise.
        then(
            function(){

            },
            function(){

            }
        );
    }

    $scope.deactivateAd = function(id){
        userData.deactivateAd(id).$promise.
        then(
            function(){

            },
            function(){

            }
        );
    }

    $scope.reloadUserAds = function(status, page) {
        switch (status) {
            case 'Inactive' : status = 0; break;
            case 'Waiting Approval' : status = 1; break;
            case 'Published' : status = 2; break;
            case 'Rejected' : status = 3; break;
            default : status = null;
        }
        userData.getUserAds(status, page).$promise
            .then(
                function(val){
                    return $scope.userAds=val;
                }
            );
    }

    function closeAlert() {
        $scope.alertShow=false;
    }

    $scope.$location = $location;

});