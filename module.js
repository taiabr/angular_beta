var module = angular.module('8moons', []);

module.run(function($rootScope) {
	$rootScope.grid = {};
	$rootScope.pageGrid = [];
	$rootScope.kart = {};
	$rootScope.pageKart = [];
	$rootScope.mailInfo = {
		mail: '',
		password: '',
		smtp: '',
	};	
	$rootScope.msg = {
		type: '',
		text: [],
	};	
	
	// Firebase ///////////////////////////////////////////////////////////////////////////////////////////
	var firebaseConfig = {
		apiKey: "AIzaSyCKNcEvx2LnTQNxV0oAvcMsi4hyKRTIas0",
		authDomain: "moonsbazaar.firebaseapp.com",
		databaseURL: "https://moonsbazaar.firebaseio.com",
		projectId: "moonsbazaar",
		storageBucket: "moonsbazaar.appspot.com",
		messagingSenderId: "220986707501"
	};
	firebase.initializeApp(firebaseConfig);
	// Busca referencia do database
	$rootScope.database = firebase.database().ref();
	// Busca referencia do storage
	var storage = firebase.storage();
	$rootScope.storage = storage.ref();
	
	// Funcoes ////////////////////////////////////////////////////////////////////////////////////////////
	// Carrega o grid
	loadGrid = function(products){		
		var departments = [];
		
		for(id in products){
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
				var gridIndex = $rootScope.pageGrid.push(dept);				
				for( prodIndex in deptProducts ){
					// Carrega imagens dos produtos
					setImg( 'products', deptProducts[prodIndex].img, gridIndex - 1, prodIndex );
				};
			};
		};
	};	
	// Busca produtos
	getProducts = function(dept, products){
		var screenProducts = [];
			
		// Seta produtos em tela
		for(id in products){
			if(products[id].dept === dept){		
				// Monta item
				var item = Object.assign({}, products[id]);
		
				// Insere no buffer
				$rootScope.grid[id] = item;
				
				// Insere na tela
				item.id  = id;
				screenProducts.push(item);	
			};
		};
		return screenProducts;
	};	
	// Seta imagem na tela
	setImg = function(imgForlder, imgPath, gridIndex, prodIndex){				
		var imagesRef = $rootScope.storage.child(imgForlder);
		imagesRef.child(imgPath).getDownloadURL().then(function(url) {
			if(imgForlder === 'logo'){
				$rootScope.logo = url;
			} else {
				$rootScope.pageGrid[gridIndex].products[prodIndex].img = url;
			};
			$rootScope.$apply();
		})
		.catch( function(erro) {
			console.log(erro.message);
		});				
	};	

	// Mensagens //////////////////////////////////////////////////////////////////////////////////////////
	$rootScope.setMsg = function(type, text){
		$rootScope.msg.text = text;		
		$rootScope.msg.type = type;
	};	
	$rootScope.clearMsg = function(){
		$rootScope.msg.text = [];
		$rootScope.msg.type = '';
	};
	
	// Inicializa a tela do carrinho
	$rootScope.initKart = function(){	
		$rootScope.pageKart = [];
		for(id in $rootScope.kart){
			// Monta item
			var item = Object.assign({}, $rootScope.kart[id]);
			item.id  = id;
			
			// Insere informacoes do produto
			$rootScope.pageKart.push(item);	
		};			
	};	
	
	// Inicializacao //////////////////////////////////////////////////////////////////////////////////////			
	$rootScope.database.once("value").then( function(snapshot) {		
		// Seta logo
		setImg('logo', 'logo-compact.png');	
		
		// Inicializa pageGrid com dados do firebase
		loadGrid( snapshot.child('productsAng').val() );
		
		// Busca configuracoes de email do firebase
		$rootScope.mailInfo = snapshot.child('mailInfoAng').val();
	})
	.catch( function(erro) {
		console.log(erro.message);
	});		
});