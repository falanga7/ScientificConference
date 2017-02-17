angular.module('scientificConference.controllers', [])

.controller('ProgramCtrl', function($scope,$http,$ionicPopup) {
    $http.get("http://localhost:8888/htdocs/ScientificConference/updater.php?program")
        .success(function(data) {
            sessionToReturn=[];

            for(var i=0; i<data.length;i++)
            {
                if(moment(moment()._d).format("DD-MM-YYYY")==data[i].DataOra.split(" ")[0]){
                    sessionToReturn.push(data[i]);
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
