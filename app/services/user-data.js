publicApp.factory('userData', function userData($resource, $cookieStore, $http) {
    //var HEADERS = {'Authorization':'Bearer '+$cookieStore.get('user').acces_token};
    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads',
		{id: '@id'}, 
		{
            update: {
			    method: 'PUT'
		    }
	});

	function getUserAds() {
        getHeaders();
		return resource.get();
	}

	function createNewAd(ad) {
        getHeaders();
		return resource.save(ad);
	}

	function getAdById(id) {
        getHeaders();
		return resource.get({id: id});
	}

	function editAd(id, ad) {
        getHeaders();
		return resource.update({id: id}, ad);
	}

	function deleteAd(id) {
        getHeaders();
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