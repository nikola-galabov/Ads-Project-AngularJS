publicApp.controller('EditProfileController', function($scope, userData, publicData, $location){
    $scope.towns = publicData.getTowns().$promise
        .then(
            function(value){
                return $scope.towns = value;
            },
            function(error){

            }
        )

    $scope.profile = userData.getProfile().$promise
        .then(
            function(value){
                return $scope.profile = value;
            },
            function(error){

            }
    );

    $scope.updateProfile = function(profile){
        userData.editProfile(profile).$promise
            .then(
                function(value){

                },
                function(error){

                }
            )
            .then(function(){
                    return $location.path('/user/home');
                });
    }

    $scope.passwordData = {
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    }

    $scope.changePassword = function(data) {
        userData.changePassword(data).$promise
            .then(
                function(value){

                },
                function(error){

                }
            )
            .then(function(){
                return $location.path('/user/home');
            });
    }

});