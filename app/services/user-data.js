var PAGE_SIZE = 10;
publicApp.factory('userData', function userData($resource, $cookieStore, $http) {
    //var HEADERS = {'Authorization':'Bearer '+$cookieStore.get('user').acces_token};
    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads/:id?PageSize=' + PAGE_SIZE,
		{id: '@id'}, 
		{
            update: {
			    method: 'PUT'
		    }
	});

    var deactivateAdRes = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var publishAgainRes = $resource(
        'http://softuni-ads.azurewebsites.net/api/user/ads/PublishAgain/:id',
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

    function publishAgainAd(id) {
        getHeaders();
        return publishAgainRes.update({id: id});
    }

    function deactivateAd(id) {
        getHeaders();
        return deactivateAdRes.update({id: id});
    }

	return {
        getUserAds: getUserAds,
		createAd: createNewAd,
		getAdById: getAdById,
		editAd: editAd,
		deleteAd: deleteAd,
        deactivateAd:deactivateAd,
        publishAgainAd: publishAgainAd
	}
});