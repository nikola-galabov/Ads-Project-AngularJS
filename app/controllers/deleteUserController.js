adminApp.controller('DeleteUserController',function($scope,adminData,$cookieStore, $location){
    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        }
    })();

    $scope.profile = $scope.$parent.userToDelete;

    $scope.deleteUser = function(username) {
        adminData.adminDeleteUser(username).$promise
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
