
angular.module('scientificConference.controllers', ['ngCordova'])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup,$cordovaLocalNotifications, $ionicPlatform) {
    $http.get("http://"+scientificConferenceApp.serverIp+"/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];


            for(var i=0; i<data.length;i++)
            {
                datetime=data[i].DataOra.split(" ");
                if(moment(moment()._d).format("DD-MM-YYYY")==datetime[0]) {

                    sessionToReturn.push(data[i]);
                    sessionToReturn[i].DataOra.replace(" (In corso)","");
                    time=datetime[1].split(":");
                    if (moment()._d.getHours()<=time[0] && moment()._d.getMinutes()<time[1]){

                        var alarmTime = moment(data[i].DataOra, "DD-MM-YYYY HH:mm").toDate();
                        alarmTime = new Date(alarmTime.getTime() - 1 * 60000);

                        $ionicPlatform.ready(function () {

                            $cordovaLocalNotifications.schedule({
                                id: Math.floor((Math.random() * 1000) + 1),
                                at: alarmTime,
                                text: data[i].Info,
                                title: data[i].DataOra,
                                sound: null
                            })

                        });
                }
                else if(i<data.length-1){
                        _futureTime=data[i+1].DataOra.split(" ")[1].split(":");
                        if(moment()._d.getHours()<=_futureTime[0] && moment()._d.getMinutes()<_futureTime[1]) {
                            sessionToReturn[i].DataOra += " (In corso)";
                        }
                    }



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
.controller('ParticipantsCtrl', function($scope, $state, $cordovaGeolocation) {



})

.controller('MapCtrl', function($scope, $ionicLoading) {

    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
    });

});

