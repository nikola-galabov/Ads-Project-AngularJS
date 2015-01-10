adminApp.controller('AdminController',function($scope, adminData, $cookieStore, $location){

    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        } else {
            init();
        }
    })();

    var lastState;

    function init() {
        lastState = {
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
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            });

        $scope.usersList = adminData.getUsersList().$promise
            .then(
            function(value){
                $scope.numItems = value.numItems;
                return $scope.usersList = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        );
    }


    $scope.approveAd = function(id) {
        adminData.adminApproveAd(id).$promise
            .then(
                function(success){
                    $scope.$parent.showSuccessMessage('Ad approved successfully!');
                },
                function(err){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.rejectAd = function(id){
        adminData.adminRejectAd(id).$promise
            .then(
                function(succes){
                    $scope.$parent.showSuccessMessage('Ad rejected successfully!');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.reloadUsersList = function(page,sortType,sortby) {
        var sortBy = sortType ? sortType + sortby : sortby ;
        adminData.getUsersList(page, sortBy).$promise
            .then(
                function(value){
                    $scope.usersList = value;
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.deleteUser= function (user) {
        $scope.$parent.userToDelete = user;
        $location.path('/admin/users/delete/user.username');
    }

    $scope.edtUser = function (user) {
        $scope.$parent.userToDelete = user;
        $location.path('/admin/users/edit/user.username');
    }

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
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        );
    }

    $scope.categories = adminData.adminGetCategories().$promise
        .then(
        function(value){
            $scope.categories = value
        },
        function(error) {
            var msg = error.data.message || 'An error has occurred';
            $scope.$parent.showErrorMessage(msg);
        }
    )

    $scope.reloadCategoryList = function() {

    }

});
