publicApp.controller('PublicController', function PublicController($scope, $cookieStore, $location, publicData) {
    $scope.ads = publicData.getAds();
    $scope.categories = publicData.getCategories();
    $scope.towns = publicData.getTowns();
    $scope.townsId = null;
    $scope.categoryId = null;
    $scope.startPage = 1;

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
                    $cookieStore.put('auth', value.access_token);
                    $scope.alert = { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
                },

                function( error ){
                    $scope.alert = { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' };
                }).then($scope.alertShow=true);
    }

    $scope.userLogin = {
        username:'',
        password:''
    }

    $scope.loginUser = function() {
        $scope.userLogin = publicData.loginUser($scope.userLogin)
            .$promise.then(
            function( value ){
                $cookieStore.put('auth', value.access_token);
                $scope.alert = { type: 'success', msg: 'Successful logged!' }
            },

            function( error ){
                $scope.alert = { type: 'danger', msg: 'Something went wrong!' };
            }).then($scope.alertShow=true);
    }
});