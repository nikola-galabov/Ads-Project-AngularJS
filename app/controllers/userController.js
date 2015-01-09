publicApp.controller('UserController',function($route, $scope, $location, $timeout, userData, $cookieStore){

    (function(){
        if(!$cookieStore.get('user')){
            console.log('Unauthorized');
            return $location.path('/');
        } else {
            init();
        }
    })();

    function init() {
        $scope.userAds = userData.getUserAds();
        $scope.status = 'all';
        $scope.startPage = 1;
        $scope.$location = $location;
        $scope.ad = {
            title: '',
            text: '',
            imageDataUrl:'',
            categoryId:'',
            townId:''
        }
    }

    $scope.publishTheAd = function(){
        userData.createAd($scope.ad)
            .$promise.then(
                function(value){
                    $location.path('/user/ads');
                },

                function(err) {

                });
    }

    $scope.publishAgainAd = function(id){
        userData.publishAgainAd(id).$promise.
        then(
            function(){
                $scope.userAds = userData.getUserAds();
            },
            function(){

            }
        );
    }

    $scope.deactivateAd = function(id){
        userData.deactivateAd(id).$promise
            .then(
                function(){
                    $scope.userAds = userData.getUserAds();
                },
                function(error){

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
                function(value){
                    return $scope.userAds=value;
                },
                function(error) {

                }
            );
    }

});