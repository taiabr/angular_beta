http://vizir.com.br/2013/09/introducao-ao-angularjs/
https://www.w3schools.com/angular/default.asp

Componentes:
1. Diretivas
2. Controller
3. Módulos
4. Services
5. Routes

<head>
	// O framework do AngularJS precisa ser carregado antes do <body>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	// O framework de animacoes do AngularJS
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>
</head>
<body>
	// ...
	<script src="script.js" type="text/javascript"></script>
	<script src="module_app.js" type="text/javascript"></script>
	<script src="controller.js" type="text/javascript"></script>
</body>


--------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------
API functions:
	angular.lowercase()	
	angular.uppercase()	
	angular.isString()	
	angular.isNumber()
	
Animation:
	Ex:	HTML	<body ng-app="ngAnimate">
		JS		var app = angular.module('myApp', ['ngAnimate']);
		CSS		transition: all linear 0.5s;
		CSS		animation: 0.5s myChange;
	Classes com animacao:
		ng-show
		ng-hide
		ng-class
		ng-view
		ng-include
		ng-repeat
		ng-if
		ng-switch
		
	
Expressao:
	Onde usa o valor da variavel varName ou uma expressao explicita 
	{{ varName }}
	{{ 5 + 5 }} 
	{{ firstName + " " + lastName }} 
	<p style="background-color:{{varName}}"> </p>
		
State (status):
	<span ng-show="myForm.myName.$touched && myForm.myName.$invalid">
	Input:
		$untouched	The field has not been touched yet
		$touched	The field has been touched
		$pristine	The field has not been modified yet
		$dirty		The field has been modified
		$invalid	The field content is not valid
		$valid		The field content is valid
	Form:
		$pristine	No fields have been modified yet
		$dirty		One or more have been modified
		$invalid	The form content is not valid
		$valid		The form content is valid
		$submitted	The form is submitted
	
Classes CSS:
	input.ng-invalid {
		background-color: pink;
	}
	ng-empty (Input)
	ng-not-empty (Input)
	ng-touched (Input)
	ng-untouched (Input)
	ng-pending (Input)
	ng-valid (ng-valid-key )
	ng-invalid (ng-invalid-key )
	ng-dirty
	ng-pristine
	
Events (triggers):
	ng-blur
	ng-change
	ng-click
	ng-copy
	ng-cut
	ng-dblclick
	ng-focus
	ng-keydown
	ng-keypress
	ng-keyup
	ng-mousedown
	ng-mouseenter
	ng-mouseleave
	ng-mousemove
	ng-mouseover
	ng-mouseup
	ng-paste
	ng-mouseenter
	ng-mouseover
	ng-mousemove
	ng-mouseleave
	ng-mousedown
	ng-mouseup
	ng-click
	
Routing:
	Routes your application to different pages without reloading the entire application.
	Ex:	<p><a href="#/!">Main</a></p>
		<a href="#!red">Red</a>
		<a href="#!green">Green</a>
		<a href="#!blue">Blue</a>			
		<div ng-view></div>			// onde o html do router vai aparecer (apenas um permitido por aplicacao)
		var app = angular.module("myApp", ["ngRoute"]);
		app.config(function($routeProvider) {
			$routeProvider
			.when("/london", {
				templateUrl : "london.html",			// html page
				controller : "londonCtrl"				// controller
				template : "<h1>Main</h1>"				// html code
			})
			.otherwise({								// default do switch
				template : "<p>Nothing has been selected</p>"
			});
		});
	
Filters:
	currency	Format a number to a currency format.
	date		Format a date to a specified format.
	filter		Select a subset of items from an array.
	json		Format an object to a JSON string.
	limitTo		Limits an array/string, into a specified number of elements/characters.
	number		Format a number to a string.
	orderBy		Orders an array by an expression.
	uppercase	Format a string to upper case.
	lowercase	Format a string to lower case.
	
	- Filters to Expressions
	<p>The name is {{ lastName | uppercase }}</p>
	- Filters to Directives
	<li ng-repeat="x in names | orderBy:'country'">
	- Currency Filter
	<h1>Price: {{ price | currency }}</h1>
	- Filter (retorna valores que contenham: caracter 'i' / valor de varName)
	<li ng-repeat="x in names | filter : 'i'">
	<li ng-repeat="x in names | filter : varName">
	- Sort an Array (name->campo a ser ordenado)
	<tr ng-repeat="x in names | orderBy:name">
Custom Filters:
	Criação:
		// Filtro normal
		app.filter('myFormat', function() {
			return function() {
				// ...
			};
		});
		// Filtro dentro de um service
		app.filter('myFormat',['serviceName', function(serviceName) {
			return function() {
				return serviceName.myFunc();
			};
		}]);
	Uso: 
		<li ng-repeat="x in names">{{x | myFormat}}</li>
	
--------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------

>>> 1. Diretiva (manipulacao de HTML):
	Utilizadas para que a manipulação do DOM;

Diretivas standards:
	-ng-app (ng-app='appName'):
		Declara aplicacao/modulo;
		Inicializa a aplicação e define onde será o elemento root;
	-ng-model (ng-model='varName'):
		Declaracao de variavel;
	-ng-init (ng-init="arrayName=['value', 'value', 'value', 'value']")
		Executa algumas tarefas antes do início da aplicação (no caso, inicializacao do arrayName);
	-ng-controller (ng-controller='controllerName')
		Declara controler;
		Definir em qual parte do documento HTML esse controler será utilizado;
	-ng-click (ng-click='funcName()')
		Semelhante ao onClick;
		Ex.:	<input ng-model='fName'></input><input ng-model='lName'></input>
				<p>{{myName}}</p>
				<button ng-click="changeName()"></button>
				var app = angular.module('myApp', []);
				app.controller('myCtrl', function($scope) {
					$scope.changeName = function() {
						$scope.myName = $scope.fName + $scope.lName;
					}
				});
	-ng-show (ng-show="varName")
		Validacao de exibicao (true->visivel)
	-ng-hide (ng-show="varName")
		Validacao de exibicao (true->invisivel)
	-ng-disabled (ng-disabled="varName")
		Validacao de habilitacao (true->desabilitado)	
	-ng-if (ng-if="$odd" / ng-if="$even")
		Validação para: odd->impar / even->par	
	-ng-switch (ng-switch="myVar") / ng-switch-when (ng-switch-when="varValue")
		Ex:	<div ng-switch="myVar">
				<div ng-switch-when="dogs">
					 <h1>Dogs</h1>
					 <p>Welcome to a world of dogs.</p>
				</div>
				<div ng-switch-when="tuts">
					 <h1>Tutorials</h1>
					 <p>Learn from examples.</p>
				</div>
			</div>
		
	-ng-bind (ng-bind="varName")
		Onde usa o valor da variavel varName;
	-ng-repeat (ng-repeat="varName in arrayName")
		Itera sobre um Array e renderiza a tela para cada elemento;
		{{varName}} usa o valor da variavel varName;
	-ng-options (<select ng-model="selectedName" ng-options="x for x in names"></select>)
		Para criacao de dropdowns ddks ddk
	-ng-include
		Inclui codigo HTML por arquivo do mesmo dominio
		Ex: <div ng-include="'myFile.htm'"></div>
		Inclui codigo HTML por arquivo de um dominio externo (l cross domain file access)
		Ex:	<div ng-include="'https://tryit.w3schools.com/angular_include.php'"></div>
			// Adiciona dominio da URL nas configuracoes da aplicacao
			app.config(function($sceDelegateProvider) {
				$sceDelegateProvider.resourceUrlWhitelist([
					'https://tryit.w3schools.com/**'
				]);
			});

Criando:
	module.directive("DiretivaTeste", function() {
		return {
			require: 'expressao',						// Necessário possuir a expressao para ser válido
			restrict : "A",								// Restricao [E-Element, A-Attribute, C-Class, M-Comment / default = EA]
			template : "template da DiretivaTeste",		// Valor
			link: function(scope, element, attr, mCtrl) {}
		};
	});	

Usando:
	<w3-test-directive></w3-test-directive>
	<div w3-test-directive></div>
	<div class="w3-test-directive"></div>
	<!-- directive: w3-test-directive -->		
	
--------------------------------------------------------------------------------------------------------------------------------------------------------

>>> 2. Controller (ex: ng-controller='controllerName'):
	Controla comportamento por trás do DOM e é também responsável por inicializar e/ou adicionar comportamentos ao objeto $scope, o qual permite a comunicação entre a View e o seu Controller;
	
Ex.:
	function controllerName($scope){
		// Funcao do controller
		$scope.funcName = function(){
			// ...
		}		
	};

--------------------------------------------------------------------------------------------------------------------------------------------------------

>>> 3. Módulos (ex: ng-app='appName')
	Realizam a inicialização e encapsulam os controllers, diretivas, services e routes;
	
Módulos standards:
	ngRoute
	ngAnimate
Ex.:
	// Inicializa modulo (app)
	var module = angular.module('appName', ['ngRoute', 'ngAnimate'])
	// Avisa sobre a existência do controller
	module.controller('controllerName', function($scope){
		// ...
	});

--------------------------------------------------------------------------------------------------------------------------------------------------------

>>> 4. Services
	Podem ser utilizados para compartilhar informações entre controllers, comunicação com o servidor e como camada que contém a lógica de negócio;
	
Services standards:
	$scope		
		- snapshot		
	$event
		- Objeto de evento do browser
		Ex:
			ng-mousemove="myFunc($event)"		
	$routeProvider
		- Define oq inserir na ng-view (Routing)
		Ex:
			app.config(function($routeProvider) {
				$routeProvider
				.when("/london", {
					templateUrl : "london.html",			// html page
					controller : "londonCtrl"				// controller
					template : "<h1>Main</h1>"				// html code
				})
				.otherwise({								// default do switch
					template : "<p>Nothing has been selected</p>"
				});
			});
	$index
		- index do repeat		
	$watch
		- trigger para alteracao de variavel (model)
		Ex:
			$scope.$watch('modelName',function(){});
	$location	
		- information about the location of the current web page
		Ex:
			app.controller('controllerName', function($scope, $location) { 
				$scope.myUrl = $location.absUrl();
			});			
	$http			
		- makes a request to the server, and lets your application handle the response (JSON object)
		- metodos: .delete() .get() .head() .jsonp() .patch() .post() .put()
		- propriedades do retorno: 
			.config		- the object used to generate the request.
			.data		- a string, or an object, carrying the response from the server.
			.headers	- a function to use to get header information.
			.status		- a number defining the HTTP status.
			.statusText	- a string defining the HTTP status.
		Ex:
			$http({
				method : "GET",
				url : "welcome.html"
			}).then(function mySuccess(response) {
				$scope.content = response.data;
				$scope.statuscode = response.status;
				$scope.statustext = response.statustext; 
			}, function myError(response) {
				// ...
			});			
	$timeout	
		- disparado qdo ocorre timeout (window.setTimeout)
		Ex:
			$timeout(function () {
				// ... [2s]
			}, 2000);			
	$interval	
		- disparado qdo passa do tempo parametrizado (window.setInterval)
		Ex:
			$interval(function () {
				// ... [1s]
			}, 1000);
	
Criando:
	app.service('serviceName', function() {
		this.myFunc = function() {
			// ...
		}
	});
	
Usando:
	app.controller('myCtrl', function($scope, serviceName) {
		serviceName.myFunc();
	});
	
	
	
Ex.:
	// Inicializa modulo (app)
	var module = angular.module('appName', ['array', 'de', 'dependencias']);	
	// Avisa sobre a existência do service	  
	module.factory('serviceName', function(){
		var service = {};
		service.nameList = ['value', 'value', 'value', 'value']; 

		// Funcao do service
		service.addName = function(name){
			if(service.nameList.indexOf(name) == -1){
				service.nameList.push(name); 				
			}
		}
		return service;
	})

	// Avisa sobre a existência do service	  
	module.controller('controllerName', function($scope, simpleService){
		$scope.bairroDoLimoeiro = simpleService.nameList; 
		// Funcao do controller
		$scope.addName = function(){
			simpleService.addName($scope.name);
			$scope.name = '';
		}
	});










