angular.module('scientificConference.controllers', [])

    .controller('ProgramCtrl', function ($scope, $http, $ionicPopup, $interval, $ionicPlatform, $cordovaLocalNotifications) {
        // watch for program updates only current daily is inserted
        $scope.moment = moment(new Date());
        $scope.program = null;
        $scope.watch('moment', function () {
            $http.get("http://" + scientificConferenceApp.serverIp + "/updater.php?program")
                .success(function (data) {

                    $ionicPlatform.ready(function () {
                        $cordovaLocalNotifications.cancelAll();
                    });

                    if (JSON.stringify($scope.program) != JSON.stringify(data)) {
                        sessionToReturn = [];

                        for (var i = 0; i < data.length; i++) {

                            datetime = data[i].DataOra.split(" ");
                            if (moment(moment()._d).format("DD-MM-YYYY") == datetime[0]) {

                                sessionToReturn.push(data[i]);
                                time = datetime[1].split(":");
                                if (moment()._d.getHours() <= time[0] && moment()._d.getMinutes() < time[1]) {

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

                            }

                        }
                        $scope.sessions = sessionToReturn;
                    }
                })
                .error(function () {
                    $ionicPopup.alert({title: "Error", template: "It's impossible to load the program."});

                });


        }, true)
        $interval(function () {
            $scope.moment = moment(new Date());
        }, 1000);


    })


    .controller('InfoCtrl', function ($scope, $http, $cordovaLocalNotifications, $ionicPlatform, $ionicPopup) {


        // registering notifications
        $http.get("http://" + scientificConferenceApp.serverIp + "/updater.php?program")
            .success(function (data) {

                $ionicPlatform.ready(function () {
                    $cordovaLocalNotifications.cancelAll();
                });
                for (var i = 0; i < data.length; i++) {
                    datetime = data[i].DataOra.split(" ");

                    time = datetime[1].split(":");
                    if (moment()._d.getHours() <= time[0] && moment()._d.getMinutes() < time[1]) {

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

                }
            })
            .error(function () {
                $ionicPopup.alert({title: "Error", template: "It's impossible to load the program."});

            });

        // just inserting app information in scope
        $scope.logo = scientificConferenceApp.logo;
        $scope.conferenceName = scientificConferenceApp.conferenceName;
        $scope.conferencePlace = scientificConferenceApp.conferencePlace;
        $scope.backgroundColour = scientificConferenceApp.backgroundColour;
        $scope.conferenceInfo = scientificConferenceApp.conferenceInfo;
        $scope.organizers = scientificConferenceApp.organizers;


    })
    .controller('ParticipantsCtrl', function ($scope, $state, $cordovaGeolocation) {


    })
    .controller('MapCtrl', function ($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $http, $compile) {

        $ionicPlatform.ready(function () {

            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            var posOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function () {

                $http.get("http://maps.google.com/maps/api/geocode/json?address=" + scientificConferenceApp.conferencePlace)
                    .success(function (data) {
                        lat = data.results[0].geometry.location.lat;
                        long = data.results[0].geometry.location.lng;
                        var myLatlng = new google.maps.LatLng(lat, long);

                        var mapOptions = {
                            center: myLatlng,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        var contentString = "<div>" + scientificConferenceApp.conferencePlace + "</div>";
                        var compiled = $compile(contentString)($scope);
                        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                        var infowindow = new google.maps.InfoWindow({
                            content: compiled[0]
                        });

                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: scientificConferenceApp.conferenceName
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });


                        $scope.map = map;
                        $ionicLoading.hide();

                    })
                    .error(function () {
                        $ionicPopup.alert({title: "Errore", template: "Non riesco a caricare le coordinate."});

                    });


            }, function (err) {
                $ionicLoading.hide();
                console.log(err);
            });
        });
    });