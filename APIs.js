var App = angular.module('MarvelApp', []);
      App.controller('MainController', function($scope,$window, $http) {
          $scope.charlist = [];
          $scope.limit = 10;
          $scope.startswith = 'a';
          $scope.GetSeries = function(){
            $http.get('http://gateway.marvel.com/v1/public/series?ts=1&apikey=580ec40a7f1d18e71b191f04a401d704&hash=4ae65965f96b46fcdf6425f23f5198d7&titleStartsWith=' + $scope.startswith)
            .then(function(response){
            $scope.serieslist = response.data.data.results;
            });
          };
        $scope.GetComics = function(){
          $http.get('http://gateway.marvel.com/v1/public/series/' + $scope.selectedseries + '/comics?ts=1&apikey=580ec40a7f1d18e71b191f04a401d704&hash=4ae65965f96b46fcdf6425f23f5198d7&limit=' + $scope.limit + '&orderBy=title')
          .then(function(response){
              $scope.comiclist = response.data.data.results;
          })
          .then(function(){
              for (comic in $scope.comiclist){
                $scope.ShowCharacters(comic.id);
              }
          });
        }
        $scope.ShowCharacters = function(comicid){
          $http.get('http://gateway.marvel.com/v1/public/comics/' + comicid + '/characters?ts=1&apikey=580ec40a7f1d18e71b191f04a401d704&hash=4ae65965f96b46fcdf6425f23f5198d7')
          .then(function(response){
              $scope.charlist[comicid]  = response.data.data.results;
          });
        };
      });
      