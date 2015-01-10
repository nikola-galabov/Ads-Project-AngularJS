var PAGE_SIZE = 10;
//var BASE_URL = 'http://localhost:1337/api';
var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
publicApp.factory('userData', function userData($resource, $cookieStore, $http) {
    //var HEADERS = {'Authorization':'Bearer '+$cookieStore.get('user').acces_token};
    function getHeaders() {
        if($cookieStore.get('user')) {
            $http.defaults.headers.common['Authorization']= 'Bearer ' + $cookieStore.get('user').access_token;
        }
    }

	var resource = $resource(
		BASE_URL+'/user/ads/:id?PageSize=' + PAGE_SIZE,
		{id: '@id'}, 
		{
            update: {
			    method: 'PUT'
		    }
	});

    var deactivateAdRes = $resource(
        BASE_URL+'/user/ads/deactivate/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var publishAgainRes = $resource(
        BASE_URL+'/user/ads/PublishAgain/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            }
        });

    var profile = $resource(
        BASE_URL+'/user/profile',{},
        {
            update: {
                method: 'PUT'
            }
        });

    var password = $resource(
        BASE_URL+'/user/changePassword',{},
        {
            update: {
                method: 'PUT'
            }
        });

	function getUserAds(status,page) {
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

    function getProfile() {
        getHeaders();
        return profile.get();
    }

    function editProfile(profileData) {
        getHeaders();
        return profile.update(profileData);
    }

    function changePassword(data) {
        getHeaders();
        return password.update(data);
    }

	return {
        getUserAds: getUserAds,
		createAd: createNewAd,
		getAdById: getAdById,
		editAd: editAd,
		deleteAd: deleteAd,
        deactivateAd:deactivateAd,
        publishAgainAd: publishAgainAd,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword
	}
});