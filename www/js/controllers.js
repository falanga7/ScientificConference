
angular.module('scientificConference.controllers', ['ngCordova'])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup,$cordovaLocalNotification, $ionicPlatform) {
    $http.get("http://192.168.1.3:8888/htdocs/ScientificConference/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];


            for(var i=0; i<data.length;i++)
            {
                datetime=data[i].DataOra.split(" ");
                if(moment(moment()._d).format("DD-MM-YYYY")==datetime[0]){

                    sessionToReturn.push(data[i]);

                    time=datetime[1].split(":");
                    var alarmTime = new Date();
                    alarmTime.setHours(time[0])
                    alarmTime.setMinutes(time[1]-1);
                    /*
                    $ionicPlatform.ready(function () {
                    $cordovaLocalNotification.schedule({
                        id: data[i].DataOra,
                        date: alarmTime,
                        message: data[i].Info,
                        title: data[i].DataOra,
                        autoCancel: true,
                        sound: true
                    })
                })*/
                }

            }
            $scope.sessioni =sessionToReturn;
        })
        .error(function() {
            $ionicPopup.alert({ title: "Errore", template:"Il programma non può essere caricato dal server."});

        });



})




.controller('InfoCtrl', function($scope) {
        $scope.logo=scientificConferenceApp.logo;
        $scope.conferenceName=scientificConferenceApp.conferenceName;
        $scope.conferencePlace=scientificConferenceApp.conferencePlace;
        $scope.backgroundColour=scientificConferenceApp.backgroundColour;
        $scope.conferenceInfo=scientificConferenceApp.conferenceInfo;
        $scope.organizers=scientificConferenceApp.organizers;

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, function(error){
        console.log("Could not get location");
    });
});