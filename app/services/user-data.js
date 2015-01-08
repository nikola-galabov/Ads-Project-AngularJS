var PAGE_SIZE = 10;
publicApp.factory('userData', function userData($resource, $cookieStore, $http) {
    //var HEADERS = {'Authorization':'Bearer '+$cookieStore.get('user').acces_token};
    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads?PageSize=' + PAGE_SIZE,
		{id: '@id'}, 
		{
            update: {
			    method: 'PUT'
		    }
	});

	function getUserAds(status,page) {
        if(page == null) {
            page = 1;
        }
        getHeaders();
		return resource.get({status: status, startPage: page});
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