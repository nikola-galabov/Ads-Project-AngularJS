adminApp.controller('AdminEditAdController',function($scope, $location, adminData,$cookieStore){

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
        $scope.ad=adminData.getAdminAdById(id).$promise
            .then(
            function(value) {
                return $scope.ad = value;
            },
            function(error) {
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        );
    }


    $scope.deleteImage = function() {
        $scope.ad['changeimage']=true;
        $scope.ad.imageDataUrl=null;
        $scope.$parent.showSuccessMessage('Image successfully deleted!');
    }

    $scope.changeImage = function() {
        $scope.ad['changeimage']=true;
        $scope.$parent.showSuccessMessage('Image successfully changed!');
    }

    $scope.updateTheAd = function(ad) {
        adminData.adminEditAd(id, ad).$promise
            .then(
            function() {
                $scope.$parent.showSuccessMessage('Ad successfully edited!');
                $location.path('/admin/home');
            },
            function(error) {
                var msg = error.data.message || 'An error has occurred';
                $scope.$parent.showErrorMessage(msg);
            }
        )
    }
});
