angular.module("myApp.page2",['ngRoute','firebase','ngFileUpload'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/page2',{
			templateUrl:"page2/page2.html",
			controller:"page2Ctrl"
		});
}])
.controller('page2Ctrl', function($scope,$firebaseArray,$firebaseStorage){
	
	$scope.addEvent = function(){
		var ref = firebase.database().ref("EventbriteAPI");
		$firebaseArray(ref).$add($scope.event)
		.then(
			function(ref){
				$scope.event.name = {};
				$scope.event.date= "";
				$scope.event.price="";
				$scope.event.singleSelect="";
			},
			function(error){
				console.log('error');
			}
		)

	};

	$scope.tags = {};
	$scope.msg	= "No File is selected.Please Select";
	$scope.showMsg = true;

	$scope.selectFile = function(file){
		
		$scope.fileList = file;
		$scope.showMsg = false;
		console.log('Select');
		

	};

	$scope.uploadFile = function(file){
		var file = file;
		var tags = $scope.tags.name; 
		if(tags == undefined){
			tags = null;
		}
		var storageRef	= firebase.storage().ref('Photos/' + file.name);
		var storage = $firebaseStorage(storageRef);
		var uploadTask = storage.$put(file);

		uploadTask.$complete(function(snapshot){
			$scope.removeFile(file);
			$scope.msg = "Photo Upload successfull";
			
			var imageUrl = snapshot.downloadURL;		
			var imageName = snapshot.metadata.name;
			var ref = firebase.database().ref("EventbriteAPI");
			var myRef = $firebaseArray(ref);
			myRef.$add({
				imageUrl:imageUrl,
				imageName:imageName,
				tags:tags
			})
			.then(function(ref){
				var id = ref.key;
				console.log("image is saved.." + id);
				myRef.$indexFor(id);

			});
			uploadTask.$error(function(error){
				console.log('error');
			});	

		});
	};

	$scope.removeFile = function(file){
			var index = $scope.fileList.indexOf(file);
			$scope.fileList.splice(index,1);
			if($scope.fileList.length<1){
				$scope.displayMsg = true;

			};
			console.log('file removed');
			
		};

	console.log('page2');
});