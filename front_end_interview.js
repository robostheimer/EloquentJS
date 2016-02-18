		var form = elt('form');
			var input = elt('input', [{
				placeholder : 'Search Frontend Tech'
			}, {
				type : 'search'
			}, {
				id : 'search_tech'
			}, {
				onkeyup : 'searchQuery()',
				value : ''
			}, {
				results : 5
			}]);
			var suggestions = elt('div', [{
				style : 'color:blue'
			}, {
				id : 'suggestion'
			}]);
			form.appendChild(input);
			document.querySelector('.overlay').appendChild(form);
			document.querySelector('.overlay').appendChild(suggestions)
			var frontend_tech = [{
				'type' : 'AngularJS'
			}, {
				'type' : 'CSS'
			}, {
				'type' : 'HTML'
			}, {
				'type' : 'PHP'
			}, {
				'type' : 'Javascript'
			}, {
				'type' : 'jQuery'
			}, {
				'type' : 'SASS'
			}, {
				'type' : 'CSS3'
			}, {
				'type' : 'HTML5'
			}, {
				'type' : 'ActionScript'
			}, {
				'type' : 'CoffeeScript'
			}];
			var main = document.getElementsByTagName('main')[0]
			main.setAttribute('style', 'margin-top:' + ((window.innerHeight / 2) - (main.offsetHeight / 2)) + 'px; margin-left:' + ((window.innerWidth / 2) - (main.offsetWidth / 2)) + 'px');
			function searchQuery() {
				var search = document.getElementById('search_tech')

				setTimeout(function() {
					if (search.value != '') {
						console.log(search.value);
						var result = (frontend_tech.searchDataMatch(search.value, 'type', true));
						console.log(search.value);
						var tmp = [];
						var str = ''
						result.fullArr.forEach(function(item) {
							console.log(item)
							tmp.push(item.type);
							tmp = tmp.removeDuplicatesArr(tmp);
							str = '';
							tmp.forEach(function(item) {
								str += '<div>' + item + '</div>';
							});

							document.getElementById('suggestion').innerHTML = (str)
						});
					} else {
						console.log(search.value)
						document.getElementById('suggestion').innerHTML = '';
					}
				}, 500);

			}
			function log() {
				//////////Can't use forEach bc argument is not an array only looks like an array so doesn't have prototype methods like forEach, filter, etc.
				var args = Array.prototype.slice.call(arguments);
				args.unshift('(app)');
				console.log.bind(console, args);

			};
			
			log('test', 'test2', 'test2');
			
			
			function buildIt(){
				console.log(arguments);
				var args=Array.prototype.join.call(arguments, (','));
				console.log(args)
				args = '(app)'+args;
				console.log.call(console,args);
			}
			
			buildIt('suz', 'rob', 'elvis');
			
			//////////////Scope Example
			var User = {
				count : 1,

				getCount : function() {
					return this.count;
				}
			};
			///outputs 1 calls the function so inside of user scope
			console.log(User.getCount());
			/////////outputs undefined becasue it is not bound or called, but just containing User.getCount, which doesn't exist on the Global scope
			var func = User.getCount;
			console.log(func());
			////outputs 1 because it is in the bind moves it from the Global Scope back to the User scope.
			var func2 = User.getCount.bind(User);
			for (var x = 1; x < 100; x++) {
				console.log(x)
				if (x % 3 == 0 && x % 15 != 0) {
					console.log(x + ':Fizz')
				}
				if (x % 5 == 0 && x % 15 != 0) {
					console.log(x + ':Buzz')
				}
				if (x % 15 == 0 && x != 0) {
					console.log('FizzBuzz')
				};

			}

			////////////Closure//////////////
			//////////////////Closure////////////////////

			function showName(firstName, lastName) {

				var nameIntro = "Your name is ";

				function makeFullName() {

					return nameIntro + firstName + " " + lastName;

				}

			return makeFullName();
			};
			var beardawg = showName('Elvis', "BearDawg");
			console.log(beardawg);
			///////////==Performs type conversion///////////
			console.log(8 == '8');
			//////////=== does not perform type conversion///////////
			console.log(8 === '8')

			////Classes

			function Vehicle(wheels, engine, pedals, speed) {
				this.wheels = 4;
				this.engine = true;
				this.pedals = false;
				this.speed = 'fast';
				this.description = 'This vehicle is fast.';
			}


			Vehicle.prototype.hasWheels = true;
			//////////Inherits all properties including prototype properties/////////////
			var car = new Vehicle(4, true, false, 'fast');
			console.log(car)

			///////////Call inherits only the properties that you explicitly pull out in the function call/////////////
			///////////ie. bike1 does not inherit the hasWheels property (but does have the brakes property), bike2 does inherit Vehicle protorype properties( but doesn't have the brakes property)///////////////////////
			function Bike(brakes) {
				Vehicle.call(this);
				this.wheels = 2
				this.engine = false;
				this.pedals = true;
				this.speed = 'slow'
				this.brakes = brakes
			}

			var bike = new Bike('hand');
			var bike2 = new Vehicle(2, false, true, 'slow')

			console.log(bike);
			console.log(bike2);

			///////////Object using Constructor and Prototype Pattern
			function Animal(name, type, sound) {
				this.Name = name;
				this.sound = sound;
				this.type = type;

			}


			Animal.prototype.name = '';
			Animal.prototype.type = '';
			Animal.prototype.sound = 'talk';

			function Dog() {
				Animal.call(Dog);
				this.sound = 'bark';
				this.makeSound = function() {
					return (this.sound);
				};
				this.clickHandler = function() {
					console.log('is clicking from dog with a bind, dog');
					return 'is clicking from dog with a bind, dog'
				};

			};

			Dog.prototype.type = 'dog';
			Dog.prototype.sound = 'bark';

			function Human() {
				Animal.call(Human);

			}


			Human.prototype.type = 'human';
			Human.prototype.sound = 'talk';

			///End Classes
			//Instantiation of Classes
			var suzie = new Human();
			var elvis = new Dog();
			var rob = new Animal('rob', 'human', 'click clack');
			console.log(elvis);
			console.log(suzie);
			console.log(rob)

			suzie.Name = 'Suzie';
			elvis.Name = 'Elvis';
			//suzie.clickHandler= elvis.clickHandler.bind(suzie);
			//console.log(suzie.clickHandler())
			//elvis.clickHandler()
			/////////Binds the function from the Dog Class to the suzie instance of the Human Class///////////////

			var consoleData = elvis.makeSound.bind(suzie);

			///////////////binds a button////////////////////
			$('#clickme').click(elvis.clickHandler.bind(suzie));

			document.getElementById('clickmetoo').addEventListener('click', function(event) {
				var consoleData2 = elvis.clickHandler.bind(suzie);
				/////////stops this on the first bubble, i.e. the div clicked - will not go down to button//////////
				event.stopPropagation
				console.log(event.target)
				//console.log(consoleData2());
			}, false);

			//////////////Apply and Call "Borrow" a function//////////////
			///////////Bind adds a function to an object////////////////
			bike.clickHandler = elvis.clickHandler.bind(bike);
			console.log(bike.clickHandler());
			bike.description = bike.clickHandler();
			console.log(bike);

			function describeAnimal(type, color, name) {
				if (type == 'bear') {
					return name + ' stay away from me';
				} else if (type == 'dog') {
					return name + ' can i pet you, friend';
				} else {
					return 'I\'d rather be with an Animal!';
				}
			}

			var greetBear = describeAnimal.bind(null, 'bear', 'brown');
			console.log(greetBear('Davy'));
			var greetDog = describeAnimal.bind(null, 'dog', 'white');
			console.log(greetDog('Elvis'));
			var greetOther = describeAnimal(null, 'other', 'purple');
			console.log(greetOther)

			function testParamsArr(type, name, gender) {
				var args = Array.prototype.slice.call(arguments);
				console.log(arguments);
			}

			testParamsArr('dog', 'Elvis', 'male')

			/////////////////Apply and Call/////////////////
			var string_obj = {
				str : 'Test',
				alerter : function() {
					var str = 'Alert:' + this.str;
					console.log(str)
				}
			};
			var alertme = {
				str : 'This is my string, dammit!'
			};
			///calls have to be made to a object; will not work on a plain string.
			//easiest way to get around this is to add string to an object with a key of str
			string_obj.alerter.call(alertme);

			var starting_five = {
				center : 'bill russell',
				shooting_guard : 'michael jordan',
				power_forward : 'charles barkley',
				small_forward : 'lebron james',
				point_guard : 'steph curry',
				subIn : function(property, name) {

					this[property] = name;
					console.log(this);

					return this;

				}
			};

			var second_five = {
				center : 'hakim olajuwan',
				shooting_guard : 'klay thompson',
				power_forward : 'tim duncan',
				small_forward : 'draymond green',
				point_guard : 'chris paul',
				subIn : function(props) {

					this[props[0]] = props[1];
					return this;
				}
			};
			var third_five = {
				center : 'marc gasol',
				shooting_guard : 'kobe bryant',
				power_forward : 'blake griffin',
				small_forward : 'kevin durant',
				point_guard : 'russell westbrook',

			};

			starting_five.subIn('power_forward', second_five['power_forward']);

			///////////////use call because args are strings////////////////
			starting_five.subIn.call(second_five, 'power_forward', third_five['power_forward']);

			/////////////use apply because args are an array i.e ['power_forward', 'Mookie Blaylock']/////////////////
			second_five.subIn.apply(third_five, ['power_forward', 'Mookie Blaylock']);

			console.log(starting_five);
			console.log(second_five);
			console.log(third_five)

			var startingFive = ['Hakim', 'Steph', 'Draymond', 'MJ', 'Nique'];

			function heresYourFive() {

				return 'Heres Your Starting Five: ' + startingFive.join(', ');
			}


			console.log(heresYourFive());
			var items = document.getElementsByClassName('item')

			//////////////Shows how items trickle/capture and bubble
			//////////////For Demo only
			/////////////Note the recommended way to do it
			/////////////Adds event listeners to all dom nodes so you can see the bubbling
			for (var i = 0; i < items.length; i++) {
				var el = items[i];

				//capturing phase
				el.addEventListener("click", function(event) {
					console.log(event.currentTarget.id)
					if (event.currentTarget.id == 'bubbler')
						starting_five.subIn('power_forward', third_five['power_forward']);
					console.log(starting_five)

				}, true);

				//bubbling phase
				el.addEventListener("click", function(event) {
					console.log(event.currentTarget.id)
					starting_five.subIn('power_forward', third_five['power_forward']);
				}, false);
			}

			//////////////Better way to handle events; it adds the event to the outermost div in which
			/////////////the link/button  is contained and is meaningful and takes advantage of bubbling to make sure event leads to right action (via function)

			document.getElementById('bubbles').addEventListener('click', function(event) {

				console.log(event.target.id);
				if (event.target.id != 'bubbles' && event.target.id != 'l_bubbles' && event.target.id != 'ul_bubbles') {
					document.getElementById(event.target.id).innerHTML = 'Clicked id ' + event.target.id;
				}
				starting_five.subIn('power_forward', third_five['power_forward']);
			});

			/////////for...in loop////////////

			var scores = {
				suzie : 88,
				rob : 85,
				elvis : 75
			};
			for (prop in scores) {
				if (scores.hasOwnProperty(prop)) {
					console.log(prop + ':' + scores[prop]);
				}
			}

			///////////HTML node Creator////////////////
			function elt(name, attributes, str) {
				var node = document.createElement(name);
				if (attributes) {
					attributes.forEach(function(item) {
						for (var attr in item) {

							if (item.hasOwnProperty(attr)) {

								node.setAttribute(attr, item[attr]);

							}
						}
					});
				}
				for (var i = 2; i < arguments.length; i++) {
					var child = arguments[i];
					console.log(child)
					if ( typeof child == "string") {

						child = document.createTextNode(child);
						node.appendChild(child);
					}
				}

				return node;
			}


			console.log(elt('section', [{
				'id' : 'test'
			}, {
				'class' : 'test'
			}], 'test'));
			//document.body.appendChild(elt('section', [{'id':'test'}], 'test'));