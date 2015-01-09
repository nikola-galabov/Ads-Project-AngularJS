publicApp.controller('EditProfileController', function($scope, userData, publicData, $location){
    (function(){
        if(!$cookieStore.get('user')){
            console.log('Unauthorized');
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

                },
                function(error){

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

                },
                function(error){

                }
            )
            .then(function(){
                return $location.path('/user/home');
            });
    }

});