publicApp.controller('PublicController', function PublicController($scope, $cookieStore, $location, $timeout, publicData) {
    $scope.townsId = null;
    $scope.categoryId = null;
    $scope.startPage = 1;
    $scope.user = $cookieStore.get('user');
    $scope.showAlert = false;
    $scope.alert = '';
    $scope.numItems;
    var lastState = {
        townsId: null,
        categoryId: null
    }
    $scope.showSuccessMessage = function(msg){
        showSuccessMessage(msg);
    }

    $scope.showErrorMessage = function(msg) {
        showErrorMessage(msg)
    }

    function showSuccessMessage(msg) {
        return showMessage(msg, 'success')
    }

    function showErrorMessage(msg) {
        return showMessage(msg, 'danger')
    }

    function showMessage (msg, type) {
        $scope.alert = { type: type, msg: msg }
        $scope.showAlert = true;
        $timeout(function(){
            return $scope.showAlert = false;
        },10000);
    }

    $scope.ads = publicData.getAds().$promise.
        then(
            function(value){
                $scope.numItems = value.numItems;
                return $scope.ads = value;
            },
            function(error){
                showErrorMessage('An error has occurred');
            });
    $scope.categories = publicData.getCategories().$promise.
        then(
            function(value){
                return $scope.categories = value;
            },
            function(error){
                showErrorMessage('An error has occurred');
            });
    $scope.towns = publicData.getTowns().$promise.
        then(
            function(value){
                return $scope.towns = value;
            },
            function(error){
                showErrorMessage('An error has occurred');
            });

//    $scope.pages = function (pages) {
//        var result = [];
//        for (var i = 0; i < pages; i++) {
//            result.push(i + 1);
//        }
//
//        return result;
//    }

    $scope.reloadAds = function(townid,categoryid,startPage) {
        if(townid!=lastState.townsId||lastState.categoryId!=categoryid) {
            $scope.startPage = 1;
            startPage = 1;
            lastState.townsId = townid;
            lastState.categoryId = categoryid;
        }
        $scope.ads = publicData.getAds(townid,categoryid,startPage).$promise
            .then(
                function(value){
                    if($scope.startPage == 1){
                        $scope.numItems = value.numItems;
                    }
                    return $scope.ads = value;
                },
                function(error) {
                    showErrorMessage(error.data.message + error.data.modelState[''] );
                }
            );
    }

    $scope.logout = function() {
        $cookieStore.remove('user');
        $scope.user = $cookieStore.get('user');
        $location.path('/');
        showSuccessMessage('Successfully logged out');
    }

});