adminApp.controller('AdminEditUserController', function($scope,$cookieStore, $location, adminData){
    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        }
    })();

    $scope.profile = $scope.$parent.userToDelete;


    $scope.editUser = function(username, profile) {
        adminData.adminEditUser(username, profile).$promise
            .then(
            function(success){
                $scope.$parent.userToDelete = null;
                $scope.$parent.showSuccessMessage(success.message);
                $location.path('admin/users/list');
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }

    $scope.passwordData = {
        username: $scope.profile.username,
        newPassword:'',
        confirmPassword:''
    }

    $scope.adminSetPass = function(passwordData) {
        adminData.adminSetPassword(passwordData).$promise
            .then(
                function(success){
                    $scope.$parent.userToDelete = null;
                    $scope.$parent.showSuccessMessage(success.message);
                    $location.path('admin/users/list');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }
});
