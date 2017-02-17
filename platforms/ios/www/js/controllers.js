angular.module('scientificConference.controllers', [])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup,$cordovaLocalNotification) {
    $http.get("http://localhost:8888/htdocs/ScientificConference/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];

            for(var i=0; i<data.length;i++)
            {
                datetime=data[i].DataOra.split(" ");
                if(moment(moment()._d).format("DD-MM-YYYY")==datetime[0]){

                    sessionToReturn.push(data[i]);
                    time=datetime.split(":");
                    var alarmTime = new Date();
                    alarmTime.setHours(time[0])
                    alarmTime.setMinutes(time[1]-1);
                    $cordovaLocalNotification.add({
                        id: data[i].DataOra,
                        date: alarmTime,
                        message: data[i].Info,
                        title: data[i].DataOra,
                        autoCancel: true,
                        sound: true
                    })
                }


            }
            $scope.sessioni =sessionToReturn;
        })
        .error(function() {
            $ionicPopup.alert({ title: "Errore", template:"Il programma non può essere caricato dal server."});

        });



})




.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
