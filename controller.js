// Body ///////////////////////////////////////////////////////////////////////////////////////////////
module.controller('myController', function($scope){
	// Habilita/Desabilita tela principal
	setMain = function(mode){
		switch(mode){
			case 'D':
				angular.element( document.getElementById( 'main' ) ).addClass('disableClass');
				angular.element( document.getElementsByClassName('openBtn') ).addClass('disableClass');
				break;
			case 'E':
				angular.element( document.getElementById( 'main' ) ).removeClass('disableClass');
				angular.element( document.getElementsByClassName('openBtn') ).removeClass('disableClass');
				break;
		};
	};
	
	// Abre/fecha menu
	$scope.toggleNav = function() { 
		if(document.getElementById("mySidenav").style.width === "250px"){
			setMain('E');
			document.getElementById("mySidenav").style.width = "0px";
		} else {
			setMain('D');
			document.getElementById("mySidenav").style.width = "250px"; 
			document.getElementById("myKart").style.height = "0px";
			document.getElementById("myCO").style.width = "0px";
		};
	};
	// Abre/fecha carrinho
	$scope.toggleKart = function(){
		if(document.getElementById("myKart").style.height === "97%"){
			setMain('E');
			document.getElementById("myKart").style.height = "0px";
		} else {
			setMain('D');
			document.getElementById("mySidenav").style.width = "0px";
			document.getElementById("myKart").style.height = "97%";
			document.getElementById("myCO").style.width = "0px";
		};	
	};	
	// Abre/fecha Check Out
	$scope.toggleCO = function(){
		if(document.getElementById("myCO").style.width === "97%"){
			setMain('E');
			document.getElementById("myCO").style.width = "0px";
		} else {
			if ( angular.equals( $scope.kart, {} ) && !confirm("O carrinho se encontra vazio." + "\n" + "Deseja continuar?") ){ return false };
			setMain('D');
			document.getElementById("mySidenav").style.width = "0px";
			document.getElementById("myKart").style.height = "0px";
			document.getElementById("myCO").style.width = "97%";
		};	
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
	$scope.mail = {};
	$scope.mail.subject = '';
	$scope.mail.kart = '';
	$scope.mail.value = 0.00;
	$scope.mail.obs = '';
	$scope.mail.user = {};
	$scope.mail.user.name = '';
	$scope.mail.user.mail = '';
	$scope.mail.user.phone = '';
	$scope.mail.user.address = '';
	
	validateMail = function(mail){
		var ok = true;
		if(mail.user.name){};
		if(mail.user.mail){};
		if(mail.user.phone){};
		if(mail.user.address){};
		return ok;
	};
		
	loadMail = function(kartItens){		
		$scope.mail.kart = '';
		for(var id in kartItens){
			if (kartItens[id].qtd > 0) {
				// Calcula valor total
				$scope.mail.value += (kartItens[id].qtd * kartItens[id].value);				
				// Monta texto do carrinho
				$scope.mail.kart += "\t" + kartItens[id].name + "\n" 
					+ "\t" + "\t" + "Tamanho:    " + kartItens[id].size + "\n" 
					+ "\t" + "\t" + "Quantidade: " + kartItens[id].qtd + "\n" 
					+ "\t" + "\t" + "Valor(un.): " + kartItens[id].value + "\n";
			}
		};
	};
	
	$scope.sendMail = function(){	
	
		if( !validateMail($scope.mail) ){
			alert("Preencha os campos corretamente e tente de novo."); 
			return false;
		};
		
		if( $scope.mail.obs != '' ){ $scope.mail.obs += "\n" };
		
		// Monta email	
		var body = $scope.mail.user.name + ", obrigado por comprar conosco!" + "\n" + "\n" 
			+ "Carrinho:" + "\n" + $scope.mail.kart + "\n" 
			+ "Observacoes do pedido:" + "\n" + "\t" + $scope.mail.obs + "\n" 
			+ "Informacoes do usuario:" + "\n" 
				+ "\t" + "Nome:     " + $scope.mail.user.name + "\n" 
				+ "\t" + "E-mail  : " + $scope.mail.user.mail + "\n" 
				+ "\t" + "Telefone: " + $scope.mail.user.phone + "\n" 
				+ "\t" + "Endereco: " + $scope.mail.user.address + "\n" + "\n" 
			+ "Total(R$): " + $scope.mail.value;
		
		// Envia email
		if (confirm("Enviar pedido?")) {
			Email.send( $scope.provider.address, 	//from
				$scope.mail.user.address, 			//to
				$scope.mail.subject, 				//subject
				body, 								//body
				$scope.provider.smtp, 				//smtp
				$scope.provider.address, 			//login
				$scope.provider.password ); 		//password
			alert("Pedido enviado!");
		}
	};
	
	// Trigger para atualizacao automatica da tela
	$scope.$watch( 'kart', function(newValue, oldValue) {
		if(newValue != oldValue){ loadMail(newValue); };
	}, true);
});