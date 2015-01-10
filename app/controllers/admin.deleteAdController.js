adminApp.controller('AdminDeleteAdController', function($scope, $location, adminData,$cookieStore){
    (function(){
        if(!$cookieStore.get('user')){
            return $location.path('/');
        } else {
            init();
        }
    })();

    var id;

    function init(){
        id = $location.path().split('/');
        id = id[id.length-1];

        $scope.ad = adminData.getAdminAdById(id).$promise
            .then(
            function(value){
                return $scope.ad = value;
            },
            function(error){
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        );
    }

    $scope.adminDeleteAd = function(id) {
        adminData.adminDeleteAd(id).$promise
            .then(
                function(success){
                    $scope.$parent.showSuccessMessage('Ad deleted successfully!');
                    $location.path('/admin/home');
                },
                function(error){
                    var msg = error.data.message || 'An error has occurred';
                    $scope.$parent.showErrorMessage(msg);
                }
            )
    }

});
