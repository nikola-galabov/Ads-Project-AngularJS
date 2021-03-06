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
        $scope.sortBy;
        $scope.sortType;

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
        $location.path('/admin/users/delete/'+user.username);
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

    $scope.categoriesList = adminData.adminGetCategories().$promise
        .then(
        function(value){
            $scope.catItems = value.numItems;
            $scope.startPage = 1;
            $scope.categoriesList = value;
        },
        function(error) {
            var msg = error.data.message || 'An error has occurred';
            $scope.$parent.showErrorMessage(msg);
        }
    );

    var categoriesLastState = {
        sortBy:null,
        sortType:null
    }

    $scope.reloadCategoriesList = function(page,sortType,sortby) {

        if(sortby!=categoriesLastState.sortBy||sortType!=categoriesLastState.sortType){
            $scope.startPage = 1;
            page = 1;
            lastState.sortType = sortType;
            lastState.sortBy = sortby;
        }
        var sortBy = sortType+sortby;
        if(!sortType){
            sortBy=sortby;
        }

        adminData.adminGetCategories(page, sortBy).$promise
            .then(
            function(value){
                $scope.categoriesList = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }
    $scope.townItems;
    $scope.townsList = adminData.adminGetTowns().$promise
        .then(
        function(value){
            $scope.townItems = value.numItems;
            $scope.startPage = 1;
            $scope.townsList = value;
        },
        function(error) {
            var msg = error.data.message || 'An error has occurred';
            $scope.$parent.showErrorMessage(msg);
        }
    );

    var townsLastState = {
        sortBy:null,
        sortType:null
    }

    $scope.reloadTownsList = function(page,sortType,sortby) {

        if(sortby!=townsLastState.sortBy||sortType!=townsLastState.sortType){
            $scope.startPage = 1;
            page = 1;
            townsLastState.sortType = sortType;
            townsLastState.sortBy = sortby;
        }
        var sortBy = sortType+sortby;
        if(!sortType){
            sortBy=sortby;
        }

        adminData.adminGetTowns(page, sortBy).$promise
            .then(
            function(value){
                $scope.townsList = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }

    $scope.newTown = {
        'name':''
    }

    $scope.createNewTown = function(town){
        adminData.adminCreateTowns(town).$promise
            .then(
                function(success){
                    $scope.$parent.showSuccessMessage('Town successfully created!');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.newCategory = {
        'name':''
    }

    $scope.createNewCategory = function(category) {
        adminData.adminCreateCategory(category).$promise
            .then(
            function(success){
                $scope.$parent.showSuccessMessage('Category successfully created!');
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }

    $scope.town = $scope.$parent.townToDelete ;
    $scope.deleteTown = function(town) {

        $scope.$parent.townToDelete = town;
        $location.path('/admin/town/delete/'+town.username);
    }

    $scope.adminDeleteTown= function(id){
        adminData.adminDeleteTown(id).$promise
            .then(
                function(){
                    $scope.$parent.showSuccessMessage('Town successfully deleted!');
                    $location.path('/admin/towns/list');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.categoryToDelete;

    $scope.adminDeleteCategory = function(id){
        adminData.adminDeleteCategory(id).$promise
            .then(
                function(){
                    $scope.$parent.showSuccessMessage('Category successfully deleted!');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

    $scope.deleteCategory= function (category) {
        $scope.$parent.categoryToDelete = category;
        $location.path('/admin/categories/delete/category.username');
        $scope.categoryToDelete = category;
    }

});
