app.controller('Main', function($scope, $http){
	
	$scope.getAllAds = function getAllAds(success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/ads' // Try with invalid url
			// headers: {}
			// data: {}
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers(), config);
		});
	}

	
});