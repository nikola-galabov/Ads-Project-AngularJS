publicApp.controller('EditProfileController', function($scope, userData, $cookieStore, publicData, $location){
    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        } else {
            init();
        }
    })();

    function init() {
        $scope.towns = publicData.getTowns().$promise
            .then(
            function(value){
                return $scope.towns = value;
            },
            function(error){
                $scope.$parent.showErrorMessage('An error has occurred.')
            }
        )

        $scope.profile = userData.getProfile().$promise
            .then(
            function(value){
                return $scope.profile = value;
            },
            function(error){
                $scope.$parent.showErrorMessage('An error has occurred.')
            }
        );

        $scope.passwordData = {
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
        }
    }

    $scope.updateProfile = function(profile){
        userData.editProfile(profile).$promise
            .then(
                function(value){
                    $scope.$parent.showSuccessMessage('Profile successfully updated.');
                },
                function(error){
                    $scope.$parent.showErrorMessage('An error has occurred.');
                }
            )
            .then(function(){
                    return $location.path('/user/home');
                });
    }

    $scope.changePassword = function(data) {
        userData.changePassword(data).$promise
            .then(
                function(value){
                    $scope.$parent.showSuccessMessage('Password successfully changed.');
                },
                function(error){
                    $scope.$parent.showErrorMessage('An error has occurred.');
                }
            )
            .then(function(){
                return $location.path('/user/home');
            });
    }

});