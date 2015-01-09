publicApp.controller('UserController',function($route, $scope, $location, $timeout, userData, $cookieStore){

    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        } else {
            init();
        }
    })();


    var lastStatus = 0;

    function init() {
        $scope.userAds = userData.getUserAds().$promise
            .then(
                function(value){
                   $scope.numItems = value;
                   return $scope.userAds = value;
                },
                function(error){
                    $scope.$parent.showErrorMessage(error.data.message + error.data.modelState['']);
                }
            );
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
                    $scope.$parent.showSuccessMessage('The ad has been published successfully!');
                    $location.path('/user/ads');
                },

                function(error) {
                    $scope.$parent.showErrorMessage('An error has occurred!');
                });
    }

    $scope.publishAgainAd = function(id){
        userData.publishAgainAd(id).$promise.
        then(
            function(){
                $scope.$parent.showSuccessMessage('The ad has been published successfully!');
                $scope.userAds = userData.getUserAds();
            },
            function(){
                $scope.$parent.showErrorMessage('An error has occurred!');
            }
        );
    }

    $scope.deactivateAd = function(id){
        userData.deactivateAd(id).$promise
            .then(
                function(){
                    $scope.userAds = userData.getUserAds();
                    $scope.$parent.showSuccessMessage('The ad has been deactivated successfully!');
                },
                function(error){
                    $scope.$parent.showErrorMessage('An error has occurred!');
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

        if(status!=lastStatus){
            $scope.startPage = 1;
            page = 1;
            lastStatus = status;
        }

        userData.getUserAds(status, page).$promise
            .then(
                function(value){
                    return $scope.userAds=value;
                },
                function(error) {
                    $scope.$parent.showErrorMessage('An error has occurred!');
                }
            );
    }

});