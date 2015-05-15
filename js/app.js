

//***************************************** Enemy ************************************************

enemyPosY = [0, 83, 249, 332, 415];

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.y = enemyPosY[Math.floor(Math.random() * 5)];
    this.x = -100;
    this.speed = Math.floor(Math.random()*(190-50+1)+50);
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 808) {
        this.x = -100;
        this.y = enemyPosY[Math.floor(Math.random() * 5)];
        this.speed = Math.floor(Math.random()*(190-50+1)+50);
    }
    if (this.x > -50 && this.x < 50) {
        this.tileX = 0;
    } else if (this.x > 50 && this.x < 150) {
        this.tileX = 101;
    } else if (this.x > 150 && this.x < 250) {
        this.tileX = 202;
    } else if (this.x > 250 && this.x < 350) {
        this.tileX = 303;
    } else if (this.x > 350 && this.x < 450) {
        this.tileX = 404;
    } else if (this.x > 450 && this.x < 550) {
        this.tileX = 505;
    } else if (this.x > 550 && this.x < 650) {
        this.tileX = 606;
    } else if (this.x > 650 && this.x < 750) {
        this.tileX = 707;
    } else if (this.x > 750 && this.x < 850) {
        this.tileX = 808;
    } else if (this.x > 850) {
        this.tileX = 1;
    }

    if (player.x === this.tileX && player.y === this.y) {
        player.home();
        player.life_decrease();
  }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//************************************ Player ****************************************************


var Player = function() {
    this.x = 0;
    this.y = 166;
    this.sprite = 'images/char-boy.png';
    this.speed = 300;
    this.life_img = 'images/Heart.png';
    this.lives = 4;
    this.game_ove = 'images/game_over.png';
};

Player.prototype.home = function(){
    this.x = 0;
    this.y = 166;
};

Player.prototype.life_decrease = function(){
  if(this.lives > 0){
    this.lives -= 1;
  }
};


// River Action

Player.prototype.update = function(dt) {
  if( this.y === 166){
    this.x = this.x + (this.speed * dt);
    if(this.x > 808){
      this.home();
      this.life_decrease();
    }
  }

//If player comes out above river

  else if (this.y === 83 && this.x > 0 && this.x <= 101){
    this.x = 101;
  }
  else if (this.y === 83 && this.x > 101 && this.x <= 202){
    this.x = 202;
  }
  else if (this.y === 83 && this.x > 202 && this.x <= 303){
    this.x = 303;
  }
  else if (this.y === 83 && this.x > 303 && this.x <= 404){
    this.x = 404;
  }
  else if (this.y === 83 && this.x > 404 && this.x <= 505){
    this.x = 505;
  }
  else if (this.y === 83 && this.x > 505 && this.x <= 606){
    this.x = 606;
  }
  else if (this.y === 83 && this.x > 606 && this.x <= 707){
    this.x = 707;
  }
  else if (this.y === 83 && this.x > 707 && this.x <= 808){
    this.x = 808;
  }

//If player comes out below river

  else if (this.y === 249 && this.x > 0 && this.x <= 101){
    this.x = 101;
  }
  else if (this.y === 249 && this.x > 101 && this.x <= 202){
    this.x = 202;
  }
  else if (this.y === 249 && this.x > 202 && this.x <= 303){
    this.x = 303;
  }
  else if (this.y === 249 && this.x > 303 && this.x <= 404){
    this.x = 404;
  }
  else if (this.y === 249 && this.x > 404 && this.x <= 505){
    this.x = 505;
  }
  else if (this.y === 249 && this.x > 505 && this.x <= 606){
    this.x = 606;
  }
  else if (this.y === 249 && this.x > 606 && this.x <= 707){
    this.x = 707;
  }
  else if (this.y === 249 && this.x > 707 && this.x <= 808){
    this.x = 808;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  var x = 0;
  for(var i =0; i < this.lives; i++){
    ctx.drawImage(Resources.get(this.life_img), x, 37);
    x += 30;
  }
  if(this.lives === 0){
    ctx.drawImage(Resources.get(this.game_ove), 0, 0);
    ctx.font = '40px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + score, 300, 420);
  }
};

Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
    this.x = this.x - 101;
  } else if (key === 'right' && this.x < 700) {
    this.x = this.x + 101;
  } else if (key === 'up' && this.y > 0) {
    this.y = this.y - 83;
  } else if (key === 'down' && this.y < 415) {
    this.y = this.y + 83;
  }
  key = null;
};



//********************************************************** Gem *******************************************************

gemImgs = ['images/Gem_Blue.png', 'images/Gem_Green.png', 'images/Gem_Orange.png'];
gemPosX = [0, 101, 202, 303, 404, 505];
gemPosY = [0, 83, 249, 332, 415];

var Gem = function(){
  this.Img = gemImgs[Math.floor(Math.random() * 3)];
  this.x = gemPosX[Math.floor(Math.random() * 6)];
  this.y = gemPosY[Math.floor(Math.random() * 5)];
};

Gem.prototype.update = function(){
  if(player.x === this.x && player.y === this.y){
    this.Img = gemImgs[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 6)];
    this.y = gemPosY[Math.floor(Math.random() * 5)];
    score += 10;
  }
};

Gem.prototype.render = function() {
  ctx.font = '30px Arial';
  ctx.fillText('Score: ' + score, 660, 80);
  ctx.drawImage(Resources.get(this.Img), this.x, this.y);
};

var score = 0;

//********************************************************** Initiation ********************************************

var allEnemies = [];


for (var i = 0; i < 14; i++){
    allEnemies[i] = new Enemy();
}




var player = new Player();
var gem = new Gem();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
