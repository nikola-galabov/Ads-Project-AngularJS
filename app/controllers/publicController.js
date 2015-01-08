publicApp.controller('PublicController', function PublicController($scope, $cookieStore, $location, $timeout, publicData) {
    $scope.ads = publicData.getAds();
    $scope.categories = publicData.getCategories();
    $scope.towns = publicData.getTowns();
    $scope.townsId = null;
    $scope.categoryId = null;
    $scope.startPage = 1;

    $scope.user = $cookieStore.get('user');


    $scope.pages = function (pages) {
        var result = [];
        for (var i = 0; i < pages; i++) {
            result.push(i + 1);
        }

        return result;
    }

    $scope.reloadAds = function(townid,categoryid,startPage) {

        $scope.ads = publicData.getAds(townid,categoryid,startPage);
    }

    $scope.userReg = {
        username:'',
        password:'',
        confirmPassword:'',
        name:'',
        email:'',
        townId:'',
        phone:''
    }

    $scope.alertShow = false;

    $scope.register = function() {
         publicData.registerUser($scope.userReg)
            .$promise.then(
                function( value ){
                    $cookieStore.put('user', value);
                    $scope.alert = { type: 'success', msg: 'Successful registration!' };
                    $location.path('/');
                    $scope.user = $cookieStore.get('user');
                },
                 function( error ){
                     console.log(error)
                     $scope.alert = { type: 'danger', msg: error.data.message };
                 }).then(
                 function() {
                     $scope.alertShow=true;
                     $timeout(closeAlert, 5000);
                 });
    }

    $scope.userLogin = {
        username:'',
        password:''
    }

    $scope.loginUser = function() {
        $scope.userLogin = publicData.loginUser($scope.userLogin)
            .$promise.then(
            function( value ){
                $cookieStore.put('user', value);
                $scope.alert = { type: 'success', msg: 'Successful logged!' };
                $location.path('/');
                $scope.user = $cookieStore.get('user');
            },
            function( error ){
                $scope.alert = { type: 'danger', msg: error.data.error_description };
            }).then(
                function() {
                    $scope.alertShow=true;
                    $timeout(closeAlert, 5000);
                });
    }

    $scope.logout = function() {
        $cookieStore.remove('user');
        $scope.user = $cookieStore.get('user');
        $location.path('/');
    }

    $scope.closeAlert = closeAlert;

    function closeAlert() {
        $scope.alertShow=false;
    }

    $scope.$location = $location;

});