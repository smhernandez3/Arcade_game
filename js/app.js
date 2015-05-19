var randomizer = function(num){
  return Math.floor(Math.random()* num);
};

//***************************************** Enemy ************************************************

var enemyPosY = [0, 83, 249, 332, 415];

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.y = enemyPosY[randomizer(5)];
    this.x = -100;
    this.speed = Math.floor(Math.random()*(190-50+1)+50);
};

Enemy.prototype.update = function(dt) {
  this.x = this.x + (this.speed * dt);
  if (this.x > 808) {
    this.x = -100;
    this.y = enemyPosY[randomizer(5)];
    this.speed = Math.floor(Math.random()*(190-50+1)+50);
  }
  if(player.y === this.y && this.x >= player.x - 50 && this.x <= player.x + 50){
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

Player.prototype.life_increase = function(){
    this.lives += 1;
};

Player.prototype.update = function(dt) {
  if( this.y === 166){
    this.x = this.x + (this.speed * dt);
    if(this.x > 808){
      this.home();
      this.life_decrease();
    }
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

var gemImgs = ['images/Gem_Blue.png', 'images/Gem_Green.png', 'images/Gem_Orange.png'];
var gemPosX = [0, 101, 202, 303, 404, 505];
var gemPosY = [0, 83, 249, 332, 415];

var Gem = function(){
  this.Img = gemImgs[randomizer(3)];
  this.x = gemPosX[randomizer(6)];
  this.y = gemPosY[randomizer(5)];
};

Gem.prototype.update = function(){
  if(player.y === this.y && player.x > this.x - 50 && player.x < this.x + 50){
    this.Img = gemImgs[randomizer(3)];
    this.x = gemPosX[randomizer(6)];
    this.y = gemPosY[randomizer(5)];
    score += 10;
    for(var i = 0; i < 10000; i+=100){
      if(i === score){
        player.life_increase();
      }
    }
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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});