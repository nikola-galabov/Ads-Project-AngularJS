adminApp.controller('AdminController',function($scope, adminData){

    var lastState = {
        townsId: null,
        categoryId: null,
        status: null
    }

    $scope.status = 'all';
    $scope.startPage = 1;
    $scope.numItems;

    $scope.adminAds = adminData.getAdminAds().$promise
        .then(
        function(value){
            $scope.numItems = value.numItems;
            return $scope.adminAds = value
        },
        function(error){
            $scope.$parent.showErrorMessage('An error has been occurred!');
        });

    $scope.reloadAdminAds = function(status, page, townid, categoryid) {
        switch (status) {
            case 'Inactive' : status = 0; break;
            case 'Waiting Approval' : status = 1; break;
            case 'Published' : status = 2; break;
            case 'Rejected' : status = 3; break;
            default : status = null;
        }

        if(status!=lastState.status||townid!=lastState.townsId||lastState.categoryId!=categoryid){
            $scope.startPage = 1;
            page = 1;
            lastState.townsId = townid;
            lastState.categoryId = categoryid;
            lastState.status = status;
        }

        adminData.getAdminAds(status, page, townid, categoryid).$promise
            .then(
            function(value){
                if($scope.startPage == 1){
                    $scope.numItems = value.numItems;
                }
                return $scope.adminAds=value;
            },
            function(error) {
                $scope.$parent.showErrorMessage('An error has occurred!');
            }
        );
    }

});
