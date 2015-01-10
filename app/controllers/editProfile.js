publicApp.controller('EditProfileController', function($scope, userData, $cookieStore, publicData, $location){
//    (function(){
//        if(!$cookieStore.get('user')){
//            return $location.path('/');
//        } else {
//            init();
//        }
//    })();

    function init() {
        $scope.towns = publicData.getTowns().$promise
            .then(
            function(value){
                return $scope.towns = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )

        $scope.profile = userData.getProfile().$promise
            .then(
            function(value){
                return $scope.profile = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
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
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
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
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
            .then(function(){
                return $location.path('/user/home');
            });
    }

});