'use strict';

angular.module("mopify.account.services.spotify", [
    "spotify",
    'mopify.services.servicemanager',
    "mopify.services.spotifylogin",
    "mopify.services.settings",
    'toggle-switch'
])

.config(function($routeProvider) {
    $routeProvider.when("/account/services/spotify", {
        templateUrl: "account/services/spotify/spotify.tmpl.html",
        controller: "SpotifyServiceController"
    }); 
})


.controller("SpotifyServiceController", function SpotifyServiceController($scope, $location, ServiceManager, Settings, Spotify){
    if(!ServiceManager.isEnabled("spotify")){
        $location.path("/account/services");
        return;
    }

    // Bind settings to the scope
    Settings.bind($scope);

    // Get current user
    Spotify.getCurrentUser().then(function(data){
        $scope.profile = data;
    });

})

.controller("SpotifyMenuController", function SpotifyMenuController($q, $scope, Spotify, SpotifyLogin){

    // Set some scope vars
    $scope.userProfile = {};
    $scope.authorized = false;

    // Check if we are logged in
    SpotifyLogin.getLoginStatus().then(function(data){
        if(data.status == "connected"){
            collectdata();   
        }
        else{
            SpotifyLogin.login().then(function(){
                collectdata();
            });            
        }
    });

    // Get the user porfile from Spotify
    function collectdata(){
        // Make the call
        Spotify.getCurrentUser().then(function(data){
            $scope.authorized = true;
            $scope.userProfile = data;
        });
    }

    $scope.$on("mopify:services:disconnected", function(e, service){
        if(service.name == "Spotify"){
            SpotifyLogin.disconnect();
        }
    });
});