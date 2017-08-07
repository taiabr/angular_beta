var module = angular.module('8moons', []);

module.run(function($rootScope) {
	$rootScope.grid = {};
	$rootScope.kart = {};
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

	// Mensagens //////////////////////////////////////////////////////////////////////////////////////////
	$rootScope.setMsg = function(type, text){
		$rootScope.msg.text = text;		
		$rootScope.msg.type = type;
	};	
	$rootScope.clearMsg = function(){
		$rootScope.msg.text = '';
		$rootScope.msg.type = '';
	};
	
	// Inicializacao do Grid //////////////////////////////////////////////////////////////////////////////			
	$rootScope.database.once("value").then( function(snapshot) {		
		// Seta logo				
		// var imagesRef = $rootScope.storage.child('logo');
		// imagesRef.child('logo-compact.png').getDownloadURL()
		$rootScope.storage.child('logo').child('logo-compact.png').getDownloadURL()
		.then( function(url) {
			$rootScope.logo = url;
		}).catch( function(erro) { console.log(erro.message) });				
		
		// Inicializa pageGrid com dados do firebase
		$rootScope.grid = snapshot.child('productsAng').val();
		
		// Busca configuracoes de email do firebase
		$rootScope.mailInfo = snapshot.child('mailInfoAng').val();
		
		$rootScope.$digest()
	})
	.catch( function(erro) {
		console.log(erro.message);
	});		
});