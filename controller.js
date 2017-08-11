// Header & Sidebar ///////////////////////////////////////////////////////////////////////////////////
module.controller('myController', function($scope){
	
	// Abre menu
	$scope.toggleNav = function() { 
		if(document.getElementById("mySidenav").style.width === "250px"){
			angular.element( document.getElementById( 'main' ) ).removeClass('disableClass');
			angular.element( document.getElementsByClassName('openBtn') ).removeClass('disableClass');
			document.getElementById("mySidenav").style.width = "0px";
		} else {
			angular.element( document.getElementById( 'main' ) ).addClass('disableClass');
			angular.element( document.getElementsByClassName('openBtn') ).addClass('disableClass');
			document.getElementById("mySidenav").style.width = "250px"; 
		};
	};
	// Abre carrinho
	$scope.toggleKart = function(){
		if(document.getElementById("myKart").style.height === "97%"){
			angular.element( document.getElementById( 'main' ) ).removeClass('disableClass');
			angular.element( document.getElementsByClassName('openBtn') ).removeClass('disableClass');
			document.getElementById("myKart").style.height = "0px";
		} else {
			angular.element( document.getElementById( 'main' ) ).addClass('disableClass');
			angular.element( document.getElementsByClassName('openBtn') ).addClass('disableClass');
			document.getElementById("myKart").style.height = "97%";
		};	
	};	
	// Abre Check Out
	$scope.toggleCO = function(){
		if($scope.showCO){ 
			$scope.showCO = false; 
		} else { 
			$scope.showCO = true; 
		}
	};

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
	$scope.clear = function(){
		$scope.kart = [];
	}
	$scope.checkOut = function(){
		$scope.toggleCO();
	}
	
	// Trigger para atualizacao automatica da tela
	$scope.$watch( 'kart', function(newValue, oldValue) {
		if(newValue != oldValue){ loadKart(newValue); };
	}, true);
});

// Check Out //////////////////////////////////////////////////////////////////////////////////////////
module.controller('coController', function($scope){
	$scope.mail = {
		user = {
			name = "",
			address = "",
			phone = "",			
		},
		subject = '',
		kart = "",
		value = 0.00,
		obs = "",
	};
	
	loadMail = function(){		
		for(var id in kartItens){
			if (kartItens[id].qtd > 0) {
				// Calcula valor total
				$scope.mail.value += (kartItens[id].qtd * kartItens[id].value);
				
				// Monta texto do carrinho
				$scope.mail.kart += "\t" + "Produto:" + "\n" 
					+ "\t" + "\t" + "Nome: " + kartItens[id].name + "\n" 
					+ "\t" + "\t" + "Tamanho: " + kartItens[id].size + "\n" 
					+ "\t" + "\t" + "Qtd: " + kartItens[id].qtd + "\n" 
					+ "\t" + "\t" + "Valor(un.): " + kartItens[id].value + "\n";
			}
		};
	};
	
	$scope.sendMail = function(){	
		var body = '';
		var provider = {
				smtp = '',
				address = '',
				password = '',
			};
	
		// Limpa campos
		
		// Monta email	
		var buyer = $scope.mail.user;
		var header = buyer.name + ", obrigado por comprar conosco!" + "\n" + "\n";
		var kart = $scope.mail.kart;
		var obs = $scope.mail.obs;
		var footer = "Total(R$): " + $scope.mail.value;
		
		body = header + "\n" + kart + "\n" + obs + "\n" + footer;
		
		// Envia email
		if (confirm("Enviar pedido?")) {
			provider = getProvider();
			Email.send( provider.address, 		//from
				$scope.mail.user.address, 		//to
				$scope.mail.subject, 			//subject
				body, 							//body
				provider.smtp, 					//smtp
				provider.address, 				//login
				provider.password ); 			//password
			alert("Pedido enviado!");
		}
	};
	
	// Trigger para atualizacao automatica da tela
	$scope.$watch( 'showCO', function(newValue, oldValue) {
		if(newValue){ loadMail() };
	}, true);
});