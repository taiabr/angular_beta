module.controller('myCtrl', function($scope){
	// Inicializa array
	$scope.products = ["item1","item2","item3"];
	// Adiciona item
	$scope.addItem = function(){
		var finded = $scope.products.find(function(value){return value === $scope.addMe});		
		if (finded === undefined){
			$scope.products.push($scope.addMe);
			$scope.addMe = '';
		} else { alert("Ja inserido") };
	};
	// Remove item
	$scope.removeItem = function(index){
		$scope.products.splice(index, 1);
	};
});