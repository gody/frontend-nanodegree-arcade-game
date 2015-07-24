// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 60 + 83*Math.floor(Math.random() * 3);; // random number between 0 and 2
    this.speed = Math.floor((Math.random() * 150) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=this.speed*dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.col = 2;  // player position in grid column initial position
    this.row = 5;  // player position in grid row initial position

    this.x = 202;  // where to draw the player in X, initial position
    this.y = 402;  // where to draw the player in Y, initial position

    this.lives = 5; // number of lives the player has
    this.level = 1; // current level of player

    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.x = this.col*101;  //where to draw the player in X
    this.y = -13 + this.row*83;   //where to draw the player in Y, adjust to center image
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(dir) {
    // Switch-case control flow to move player in grid
    switch(dir){
        case "left":
            this.col--;
            break;
        case "up":
            this.row--;
            break;
        case "right":
            this.col++;
            break;
        case "down":
            this.row++;
            break;
        default:
            console.log("Don't move!!!")
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy, new Enemy];
var player = new Player;

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
