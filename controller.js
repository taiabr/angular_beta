// Aplication /////////////////////////////////////////////////////////////////////////////////////////
module.controller('8moonsController', function($scope){
});

// Header /////////////////////////////////////////////////////////////////////////////////////////////
module.controller('headerController', function($scope){
	// Abre menu
	$scope.toggleNav = function() { 
		if(document.getElementById("mySidenav").style.width === "250px"){
			document.getElementById("mySidenav").style.width = "0px";
		} else {
			document.getElementById("mySidenav").style.width = "250px"; 
		};
	};
	// Abre carrinho
	$scope.toggleKart = function(){
		if(document.getElementById("myKart").style.height === "500px"){
			document.getElementById("myKart").style.height = "0px";
		} else {
			document.getElementById("myKart").style.height = "500px"; 
			$scope.initKart();
		};	
	};
});

// Grid ///////////////////////////////////////////////////////////////////////////////////////////////
module.controller('gridController', function($scope){
	// Adiciona item ao carrinho
	$scope.addItem = function(id){
		// Item ja esta no carrinho
		if( $scope.kart.hasOwnProperty(id) ){			
			if( $scope.kart[id].qtd < $scope.grid[id].qtd){
				// Atualiza quantidade do item
				$scope.kart[id].qtd ++;
			} else {
				$scope.setMsg('E', 'Item com quantidade insuficiente.');
			};			
		// Insere item no carrinho
		} else {
			// Monta item		
			var item = Object.assign({}, $scope.grid[id]);
			item.qtd = 1;
			// Insere item
			$scope.kart[id] = item;
		};
	};
});

// Kart ///////////////////////////////////////////////////////////////////////////////////////////////
module.controller('kartController', function($scope){
	// Remove item do carrinho
	$scope.delItem = function(id){
		if($scope.kart[id].qtd <= 0){
			// Remove item
			delete $scope.kart[id];
		} else {
			// Atualiza quantidade no buffer
			$scope.kart[id].qtd --;
		};
	};
});