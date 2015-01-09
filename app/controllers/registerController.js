publicApp.controller('RegisterController',function($scope,$cookieStore,$location,publicData){
    $scope.user = {
        username:'',
        password:'',
        confirmPassword:'',
        name:'',
        email:'',
        townId:'',
        phone:''
    }

    $scope.register = function() {
        publicData.registerUser($scope.user).$promise
            .then(
            function( value ){
                $cookieStore.put('user', value);
                $scope.$parent.user = $cookieStore.get('user');
                $location.path('/user/home');
                $scope.$parent.showSuccessMessage('Register success!');
            },
            function( error ){
                $scope.$parent.showErrorMessage(error.data.message + error.data.modelState[''] );
            });
    }
})
