publicApp.factory('userData', function userData($resource, $cookieStore, $http) {
    //var HEADERS = {'Authorization':'Bearer '+$cookieStore.get('user').acces_token};
    $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads',
		{id: '@id'}, 
		{ update: {
			method: 'PUT'
		}
	});

	function getUserAds() {
		return resource.get();
	}

	function createNewAd(ad) {
		return resource.save(ad);
	}

	function getAdById(id) {
		return resource.get({id: id});
	}

	function editAd(id, ad) {
		return resource.update({id: id}, ad);
	}

	function deleteAd(id) {
		return resource.delete({id: id});
	}

	return {
        getUserAds: getUserAds,
		createAd: createNewAd,
		getAdById: getAdById,
		editAd: editAd,
		deleteAd: deleteAd
	}
});