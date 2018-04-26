angular.module("myApp.page3",['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/page3/:id',{
			templateUrl:"page3/page3.html",
			controller:"page3Ctrl"
		});
}])
.controller('page3Ctrl', function($scope,$firebaseArray,$firebaseObject,$routeParams){
	var id = $routeParams.id;
	var ref = firebase.database().ref("EventbriteAPI/"+ id);
	$scope.event = $firebaseObject(ref);
	
	$scope.editEvent = function(id){
		console.log(id);

		var ref = firebase.database().ref("EventbriteAPI/"+ id);
		ref.update({
			name: $scope.event.name,
			date: $scope.event.date,
		   price: $scope.event.price,
	singleSelect: $scope.event.singleSelect
		})
		.then(
			function(){
				$scope.event.name = "";
				$scope.event.date= "";
				$scope.event.price="";
				$scope.event.singleSelect="";
			}, 
			function (error){
				console.log(error);
			}
	);
		
	}


});