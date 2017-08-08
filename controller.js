// Header /////////////////////////////////////////////////////////////////////////////////////////////
module.controller('headerController', function($scope){
	// $scope.pageDeparts = [];
	
	// Carrega os departamentos no menu lateral
	// loadDeparts = function(products){
		// $scope.pageDeparts = []		
		// for(var id in products){
			// if( !$scope.pageDeparts.includes( products[id].dept ) ){ $scope.pageDeparts.push(products[id].dept) };
		// };
	// };
	
	// Abre menu
	$scope.toggleNav = function() { 
		if(document.getElementById("mySidenav").style.width === "250px"){
			angular.element( document.querySelector( '#main' ) ).removeClass('disableClass');
			angular.element( document.querySelector( '#header' ) ).removeClass('disableClass');
			document.getElementById("mySidenav").style.width = "0px";
		} else {
			angular.element( document.querySelector( '#main' ) ).addClass('disableClass');
			angular.element( document.querySelector( '#header' ) ).addClass('disableClass');
			document.getElementById("mySidenav").style.width = "250px"; 
		};
	};
	// Abre carrinho
	$scope.toggleKart = function(){
		if(document.getElementById("myKart").style.height === "97%"){
			angular.element( document.querySelector( '#main' ) ).removeClass('disableClass');
			angular.element( document.querySelector( '#header' ) ).removeClass('disableClass');
			document.getElementById("myKart").style.height = "0px";
		} else {
			angular.element( document.querySelector( '#main' ) ).addClass('disableClass');
			angular.element( document.querySelector( '#header' ) ).addClass('disableClass');
			document.getElementById("myKart").style.height = "97%"; 
		};	
	};

	// Trigger para atualizacao automatica da tela
	// $scope.$watch( 'grid', function(newValue, oldValue) {
		// if(newValue != oldValue){ loadDeparts(newValue); };
	// }, true);
});

// Grid ///////////////////////////////////////////////////////////////////////////////////////////////
module.controller('gridController', function($scope){
	$scope.pageGrid = [];
	
	// Carrega o grid
	loadGrid = function(products){	
		var departments = [];
		$scope.pageGrid = []; 	
		
		for(var id in products){
			if( !departments.includes( products[id].dept )){	
				departments.push(products[id].dept);	

				// Busca produtos do departamento
				var deptProducts = getProducts(products[id].dept, products);
				
				// Monta departamento
				var dept = {
					name: products[id].dept,
					products: deptProducts,
				};				
				
				// Insere departamento com seus produtos em tela
				var gridIndex = $scope.pageGrid.push(dept);		
				
				// Carrega imagens dos produtos		
				for( prodIndex in deptProducts ){
					setImg( deptProducts[prodIndex].img, gridIndex - 1, prodIndex );
				};
			};
		};
	};	
	// Busca produtos
	getProducts = function(dept, products){
		var screenProducts = [];
			
		// Seta produtos em tela
		for(var id in products){
			if(products[id].dept === dept){		
				// Monta item
				var item = Object.assign({}, products[id]);				
				item.id  = id;
				
				// Insere na tela
				screenProducts.push(item);	
			};
		};
		return screenProducts;
	};	
	// Seta imagem na tela
	setImg = function(imgPath, gridIndex, prodIndex){				
		var imagesRef = $scope.storage.child('products');
		imagesRef.child(imgPath).getDownloadURL().then(function(url) {
			$scope.pageGrid[gridIndex].products[prodIndex].img = url;
			$scope.$digest();
		})
		.catch( function(erro) {
			console.log(erro.message);
		});				
	};
	
	// Adiciona item ao carrinho
	$scope.buy = function(id){
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

	// Trigger para atualizacao automatica da tela
	$scope.$watch( 'grid', function(newValue, oldValue) {
		if(newValue != oldValue){ loadGrid(newValue); };
	}, true);	
});

// Kart ///////////////////////////////////////////////////////////////////////////////////////////////
module.controller('kartController', function($scope){
	$scope.pageKart = [];
	
	// Inicializacao do Carrinho
	loadKart = function(kartItens){	
		$scope.pageKart = [];
		for(var id in kartItens){
			// Monta item
			var item = Object.assign({}, kartItens[id]);
			item.id  = id;			
			// Insere informacoes em tela
			$scope.pageKart.push(item);	
		};			
	};
	
	// Diminui quantidade
	$scope.minus = function(id){ 
		if ($scope.kart[id].qtd > 1){ 
			$scope.kart[id].qtd --;
		} else { 
			delete $scope.kart[id] 
		};
	};
	// Adiciona quantidade
	$scope.plus = function(id){
		if( $scope.kart[id].qtd < $scope.grid[id].qtd){
			$scope.kart[id].qtd ++;
		} else {
			$scope.setMsg('E', 'Item com quantidade insuficiente.');
		};	
	};
	
	// Trigger para atualizacao automatica da tela
	$scope.$watch( 'kart', function(newValue, oldValue) {
		if(newValue != oldValue){ loadKart(newValue); };
	}, true);
});