var sprites ={
  frog: { sx: 0, sy: 0, w: 48, h: 48, frames: 3 },
  bg: { sx: 433, sy: 0, w: 320, h: 480, frames: 1 },
  car1: { sx: 143, sy: 0, w: 48, h: 48, frames: 1 },
  car2: { sx: 191, sy: 0, w: 48, h: 48, frames: 1 },  
  car3: { sx: 239, sy: 0, w: 96, h: 48, frames: 1 },
  car4: { sx: 335, sy: 0, w: 48, h: 48, frames: 1 },
  car5: { sx: 383, sy: 0, w: 48, h: 48, frames: 1 },
  trunk: { sx: 288, sy: 383, w: 142, h: 48, frames: 1 },
  death: { sx: 0, sy: 143, w: 48, h: 48, frames: 4 },
  snake: { sx: 0, sy: 384, w: 96, h: 48, frames: 3 },
  insect: { sx: 96, sy: 288, w: 48, h: 48, frames: 1 }
};

var randomPosiciones = (Math.floor(Math.random() * (1-7+1)) + 7);
var randomFrecuenciaInsectos = (Math.floor(Math.random() * (2-12+1)) + 12);
var randomFrecuenciaSerpiente = (Math.floor(Math.random() * (5-25+1)) + 25);

var objectTypesHard = {
	car1: { direccion: -1, velocidad: 110, fila: 1, frecuencia: 1.8},
	car2: { direccion: 1, velocidad: 90, fila: 2, frecuencia: 2.1},
	car3: { direccion: -1, velocidad: 60, fila: 3, frecuencia: 2.3},
	car4: { direccion: -1, velocidad: 100, fila: 3, frecuencia: 2.5},
	car5: { direccion: 1, velocidad: 100, fila: 4, frecuencia: 1.8},
	trunk1: { direccion: 1, velocidad: 150, fila: 6, frecuencia: 1.3},
	trunk2: { direccion: -1, velocidad: 100, fila: 7, frecuencia: 1.8},
	trunk3: { direccion: 1, velocidad: 100, fila: 8, frecuencia: 2.3},
	snake: { direccion: -1, velocidad: 70, fila: 5, frecuencia: randomFrecuenciaSerpiente},
	insect: { direccion: -1, velocidad: 20, fila: randomPosiciones, frecuencia: randomFrecuenciaInsectos}
};
var objectTypes = {
	car1: { direccion: -1, velocidad: 110, fila: 1, frecuencia: 3.8},
	car2: { direccion: 1, velocidad: 90, fila: 2, frecuencia: 3.1},
	car3: { direccion: -1, velocidad: 60, fila: 3, frecuencia: 4.3},
	car4: { direccion: -1, velocidad: 100, fila: 3, frecuencia: 3.5},
	car5: { direccion: 1, velocidad: 100, fila: 4, frecuencia: 2.8},
	trunk1: { direccion: 1, velocidad: 90, fila: 6, frecuencia: 4.3},
	trunk2: { direccion: -1, velocidad: 130, fila: 7, frecuencia: 4.8},
	trunk3: { direccion: 1, velocidad: 90, fila: 8, frecuencia: 3.3},
	snake: { direccion: -1, velocidad: 70, fila: 5, frecuencia: randomFrecuenciaSerpiente},
	insect: { direccion: -1, velocidad: 20, fila: randomPosiciones, frecuencia: randomFrecuenciaInsectos}
};

//Math.floor(Math.random() * (5-15+1)) + 15;

var FROG_TYPE = 1,
	CAR_TYPE = 2,
	TRUNK_TYPE = 4,
	WATER_TYPE = 8,
	SNAKE_TYPE = 16,
	INSECT_TYPE = 32;
	

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  Game.setBoard(3, new TitleScreen("Froggy",
								  "Press space to start",
								  playGame));
};



var playGame = function() {
	
  //Creamos el gameBoard  y añadimos el fondo
  var boardBackground = new GameBoard();
  
  //borro otras capas
  Game.setBoard(0, new GameBoard());
  Game.setBoard(1, new GameBoard());
  Game.setBoard(2, new GameBoard());
  Game.setBoard(3, new GameBoard());
  Game.setBoard(4,new GamePoints(0));
  
  boardBackground.add(new Background());
  Game.setBoard(1,boardBackground);
  Game.Stop = false;
  Game.vidas = 5;
  
  Game.Tiempo = 30;
  

  
  Game.setBoard(0,new TitleScreen("vidas: ", Frog.vidas ));
  
  
  var board = new GameBoard();
  board.add(new Frog());
  board.add(new Water());
  board.add(new Vidas());
  board.add(new Tiempo());
  
  board.add(new Spawner('car1'));
  board.add(new Spawner('car2'));
  board.add(new Spawner('car3'));
  board.add(new Spawner('car5'));
  board.add(new Spawner('trunk1'));
  board.add(new Spawner('trunk2'));
  board.add(new Spawner('trunk3'));
  board.add(new Spawner('snake'));
  
  board.add(new Spawner('insect'));
  

  var haGanadoYa = false; 
  Game.setBoard(2,board);
  
};

var Background = function() {
	this.setup('bg', { });
	this.x = 0;
	this.y = 0; 
};
Background.prototype = new Sprite();
Background.prototype.step = function(dt) {
};


var winGame = function(haGanadoYa) {
 // Game.setBoard(0, new GameBoard());
 // Game.setBoard(1, new GameBoard());
 // Game.setBoard(2, new GameBoard());
 if(!haGanadoYa){
	haGanadoYa = true;
	Game.points +=1000;
	Game.Stop = true;
	Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));
    return haGanadoYa;                             
 }
};

var loseGame = function(muerto) {
 // Game.setBoard(0, new GameBoard());
 // Game.setBoard(1, new GameBoard());
  //Game.setBoard(2, new GameBoard());
  if(muerto){
	  Game.setBoard(3,new TitleScreen("You lose!", 
									"Press space to play again",
									playGame));
  }
  else{
	  Game.setBoard(3,new TitleScreen("You lose a life!", 
									"Press space to play again",
									funcionMuerto));
  }
};



var timeOut = function() {
 // Game.setBoard(0, new GameBoard());
 // Game.setBoard(1, new GameBoard());
  //Game.setBoard(2, new GameBoard());
	  Game.setBoard(3,new TitleScreen("Time out!", 
									"Press space to play again",
									funcionMuerto));
  
};



var funcionMuerto = function(){
  Game.Stop = false;
  Game.Tiempo = 30;
  Game.setBoard(3, new GameBoard());
  var board = new GameBoard();
  board.add(new Frog());
  board.add(new Water());
  board.add(new Vidas());
  board.add(new Tiempo());
  
  board.add(new Spawner('car1'));
  board.add(new Spawner('car2'));
  board.add(new Spawner('car3'));
  board.add(new Spawner('car5'));
  board.add(new Spawner('trunk1'));
  board.add(new Spawner('trunk2'));
  board.add(new Spawner('trunk3'));
  board.add(new Spawner('snake'));
  
  board.add(new Spawner('insect'));
  

   Game.setBoard(2,board);
};


var Frog = function(){
	
	this.setup('frog', { vx: 0, vy: 0, reloadTime: 0.25, maxVel: 190, frame:0 });
	this.x = (Game.width - this.w)/2;
	this.y = Game.height - this.h;
	this.haGanadoYa = false;
	this.movimientoActual;
	this.movimientoAMover = 0;
	this.cont=0;

	this.step = function(dt) {
		
		
		//si ha ganado ya, que no se mueva
		if(this.haGanadoYa){
			return;
		}
		else{
			
			//si se esta moviendo ya, que se siga moviendo e ignore las teclas
			if(this.movimientoAMover > 0){
				
				var movimientoPendiente = this.maxVel * dt;
				
				//movemos la parte porcentual si cabe a mover
				if(Math.abs(movimientoPendiente) > this.movimientoAMover )
					movimientoPendiente = this.movimientoAMover;
				
				if(this.movimientoActual == 'left'){
					
					this.x -= movimientoPendiente;
				}
				else if(this.movimientoActual == 'right'){
					
					this.x += movimientoPendiente;
				}
				else if(this.movimientoActual == 'up'){
					
					this.y -= movimientoPendiente;
				}
				else if(this.movimientoActual == 'down'){
					
					this.y += movimientoPendiente;
				}
				
				//actuializamos lo que queda pendiente
				this.movimientoAMover -= movimientoPendiente;
				this.cont++;
				if((this.cont%7) == 0){
					this.frame++;						
					if(this.frame >= 3) {
						this.frame=0;
					}
				}
		
			}
			else{//no se mueve => que haga caso a las teclas
				if(Game.keys['left']){
					
					this.movimientoActual = 'left';
					this.movimientoAMover = this.w;
				}
				else if(Game.keys['right']){
					
					this.movimientoActual = 'right';
					this.movimientoAMover = this.w;
				}
				else if(Game.keys['up']){
					
					this.movimientoActual = 'up';
					this.movimientoAMover = this.w;
				}
				else if(Game.keys['down']) {
					
					this.movimientoActual = 'down';
					this.movimientoAMover = this.w;
				}
				else { 
						this.vx = 0; 
						this.vy = 0;
					 }
			}	
		}
		
		var collisionTrunk = this.board.collide(this,TRUNK_TYPE);
		//nos movemos con el tronco
		if(collisionTrunk)
			this.x += collisionTrunk.direccion * collisionTrunk.velocidad * dt;
		else{
			//hay que mirar si se choca con el water
			var collisionWater = this.board.collide(this,WATER_TYPE);
			if(collisionWater)
				this.hit(this.damage);
		}
		
		
		//comprobamos si se sale del escenario
		if(this.x < 0) { this.x = 0; }
		else if(this.x > Game.width - this.w) { 
		  this.x = Game.width - this.w;
		}
		
		if(this.y < 0) { this.y = 0; }
		else if(this.y > Game.height - this.h) { 
		  this.y = Game.height - this.h;
		}	
		
		//Comprobamos si hemos llegado a la meta
		if(this.y < 5)
			this.haGanadoYa = winGame(this.haGanadoYa);	


		//this.reload-=dt;
	};
};
Frog.prototype = new Sprite();
Frog.prototype.type =  FROG_TYPE;

//impacto con la rana
Frog.prototype.hit = function(damage) {
  this.muerto = false;
  if(this.board.remove(this)) {
    this.board.add(new Death(this.x + this.w/2, 
                                   this.y + this.h/2));
					Game.Stop = true;
					Game.vidas --;
					if(Game.vidas == 0)
						this.muerto = true;
					if(damage==111 && Game.vidas != 0)
						timeOut();
					else
						loseGame(this.muerto);
	
  }
};




// clase coche
var Car = function(tipo) {
	this.direccion = objectTypes[tipo].direccion;
	this.velocidad = objectTypes[tipo].velocidad;
	this.fila = objectTypes[tipo].fila;
	this.y = Game.height - 48 - 48 * this.fila;
	this.setup(tipo,{});
	
	if(this.direccion == 1)
		this.x = 0 - this.w;
	else
		this.x = Game.width;
};
Car.prototype = new Sprite();
Car.prototype.type = CAR_TYPE;
Car.prototype.step = function(dt) {

	this.x += this.direccion * this.velocidad * dt;
	//si se sale del escenario se borra
	if(this.x < 0 - this.w|| this.x > Game.width) {
		this.board.remove(this);
	}
	var collision = this.board.collide(this,FROG_TYPE);
	if(collision)
		collision.hit(this.damage);
};




// clase tronco
var Trunk = function(tipo) {
	this.direccion = objectTypes[tipo].direccion;
	this.velocidad = objectTypes[tipo].velocidad;
	this.fila = objectTypes[tipo].fila;
	this.y = Game.height - 48 - 48 * this.fila;
	this.setup('trunk',{});
	
	if(this.direccion == 1)
		this.x = 0 - this.w;
	else
		this.x = Game.width;
};
Trunk.prototype = new Sprite();
Trunk.prototype.type = TRUNK_TYPE;

Trunk.prototype.step = function(dt){
    this.x += this.direccion * this.velocidad * dt;
	//si se sale del escenario se borra
	if(this.x < 0 - this.w|| this.x > Game.width) {
		this.board.remove(this);
	}
};




// clase que genera todos los objetos del juego
var Spawner = function(tipo) {
	this.tipo = tipo;
	this.acum = 0;
	this.frecuenciaObjeto = objectTypes[tipo].frecuencia;

};

Spawner.prototype = new Sprite();
Spawner.prototype.setup = function(tipo,args) {};
Spawner.prototype.draw = function() {};
Spawner.prototype.step = function(dt) {
	this.acum -= dt;
	if(this.acum < 0) {
		this.acum += this.frecuenciaObjeto;
		if(this.tipo.search('car') != -1)
			this.board.add(new Car(this.tipo));
		else if(this.tipo.search('trunk') != -1)
			this.board.add(new Trunk(this.tipo));
		else if(this.tipo.search('insect') != -1)
			this.board.add(new Insect(this.tipo));
		else
			this.board.add(new Snake(this.tipo));
	}
};




//clase agua
var Water = function() {
	//medidas del agua
	this.x = 0;
	this.y = 48;
	this.w = Game.width;
	this.h = 48 * 3;

};

Water.prototype.type = WATER_TYPE;

Water.prototype.draw = function() {};
Water.prototype.step = function(dt) {

};
	


	
//clase serpiente
var Snake = function(tipo) {
	this.direccion = objectTypes[tipo].direccion;
	this.velocidad = objectTypes[tipo].velocidad;
	this.fila = objectTypes[tipo].fila;
	this.y = Game.height - 48 - 48 * this.fila;
	this.setup('snake', { frame: 0 });
	this.cont = 0;
	if(this.direccion == 1)
		this.x = 0 - this.w;
	else
		this.x = Game.width;
};
Snake.prototype = new Sprite();
Snake.prototype.type = SNAKE_TYPE;

Snake.prototype.step = function(dt){
    this.x += this.direccion * this.velocidad * dt;
	
	this.cont++;
	if((this.cont%7) == 0){
		this.frame++;						
		if(this.frame >= 3) {
			this.frame=0;
		}
	}
	//si se sale del escenario se borra
	if(this.x < 0 - this.w|| this.x > Game.width) {
		this.board.remove(this);
	}
	var collision = this.board.collide(this,FROG_TYPE);
	if(collision)
		collision.hit(this.damage);
};




//clase insecto	
var Insect = function(tipo) {
	this.direccion = objectTypes[tipo].direccion;
	this.velocidad = objectTypes[tipo].velocidad;
	this.fila = objectTypes[tipo].fila;
	this.y = Game.height - 48 - 48 * this.fila;
	this.setup('insect',{});
	
	if(this.direccion == 1)
		this.x = 0 - this.w;
	else
		this.x = Game.width;
};
Insect.prototype = new Sprite();
Insect.prototype.type = INSECT_TYPE;

Insect.prototype.step = function(dt){
    this.x += this.direccion * this.velocidad * dt;
	//si se sale del escenario se borra
	if(this.x < 0 - this.w|| this.x > Game.width) {
		this.board.remove(this);
	}
	var collision = this.board.collide(this,FROG_TYPE);
	if(collision)
	{
		this.board.remove(this)
		Game.vidas++;
		Game.points +=100;
	}
};



var Death = function(centerX,centerY) {
  this.setup('death', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Death.prototype = new Sprite();
Death.prototype.step = function(dt) {
  
	this.frame++;						
  if(this.frame >= 4) {
    this.board.remove(this);
  }
};



var Vidas = function() {};

Vidas.prototype.draw = function(ctx) {	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "bold 20px arial";
	ctx.fillText("Vidas: " + Game.vidas,10,40);
};

Vidas.prototype.step = function() {};




var Tiempo = function() {};

Tiempo.prototype.draw = function(ctx) {	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "bold 20px arial";
	ctx.fillText("Tiempo: " + Game.Tiempo,200,40);
};

Tiempo.prototype.step = function(dt) {
	
	//restarle segundos, como?
	var redondeo = dt.toFixed(2);
	//la rana pierde una vida, y empieza de nuevo
	if(!Game.Stop){
		if( Game.Tiempo <= 0){
			Game.Tiempo=0;
			var collision = this.board.collide(this,FROG_TYPE);
			if(collision)
				collision.hit(111);
		}
		else
			Game.Tiempo -= redondeo;
	}
};




window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});


