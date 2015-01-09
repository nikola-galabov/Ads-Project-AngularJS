publicApp.controller('LoginController', function($scope,$cookieStore,$location,publicData){
    $scope.credentials = {
        username:'',
        password:''
    }

    $scope.loginUser = function() {
        $scope.userLogin = publicData.loginUser($scope.credentials)
            .$promise.then(
            function( value ){
                $cookieStore.put('user', value);
                if(value.isAdmin){
                    $location.path('/admin/home');
                } else {
                    $location.path('/user/home');
                }

                $scope.$parent.showSuccessMessage('Logged in successfully!');
                $scope.$parent.user = $cookieStore.get('user');
            },
            function( error ){
                $scope.$parent.showErrorMessage(error.data.error_description);
            });
    }

});
