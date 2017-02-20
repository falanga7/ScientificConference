
angular.module('scientificConference.controllers', ['ngCordova'])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup,$cordovaLocalNotifications, $ionicPlatform) {
    $http.get("http://"+scientificConferenceApp.serverIp+"/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];


            for(var i=0; i<data.length;i++)
            {
                datetime=data[i].DataOra.split(" ");
                if(moment(moment()._d).format("DD-MM-YYYY")==datetime[0]){

                    sessionToReturn.push(data[i]);


                    var alarmTime = new Date(moment(data[i].DataOra,"DD-MM-YYYY H:m").format("YYYY-MM-DDTH:m"));
                    alarmTime=new Date(alarmTime.getTime()- 1*60000);

                    $ionicPlatform.ready(function(){

                        $cordovaLocalNotifications.schedule({
                            id: Math.floor((Math.random() * 1000) + 1),
                            firstAt: alarmTime,
                            text: data[i].Info,
                            title: data[i].DataOra,
                            sound: null
                        })

                    });



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

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {

});
