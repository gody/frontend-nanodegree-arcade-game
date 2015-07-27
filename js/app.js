// Enemies our player must avoid
var Enemy = function() {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // No column value because enemys move continuesly in this direction
    this.row = Math.floor(Math.random() * 3 + 1); // random number between 1 and 3

    this.x = -101; // Start point just before the canvas visible area
    this.y = 60 + 83 * (this.row - 1); // Center position for the row the enemy is in
    this.speed = Math.floor((Math.random() * 101) + 1); // Different enemys have different speed
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) this.x = -101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    "use strict";
    this.col = 2; // player position in grid column initial position
    this.row = 5; // player position in grid row initial position

    this.x = 202; // where to draw the player in X, initial position
    this.y = 402; // where to draw the player in Y, initial position

    this.lives = 5; // number of lives the player has
    this.level = 1; // current level of player

    this.points = 0; // amount of points a player has

    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    "use strict";
    this.x = this.col * 101; //where to draw the player in X
    this.y = -13 + this.row * 83; //where to draw the player in Y, adjust to center image
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var heart = 'images/Heart.png';
    // Draw the amount of life of the player
    for (var i = 0; i < this.lives; i++) {
        ctx.drawImage(Resources.get(heart), i * 101 / 2.5, 530, 101 / 2.5, 171 / 2.5);
    }

    // Draw text in Canvas
    ctx.clearRect(0, 0, 505, 40); // Clear to rewrite text
    ctx.font = "30px Arial";
    ctx.fillText("Points: " + this.points, 0, 40);
    ctx.fillText("Level: " + this.level, 380, 40);
};

Player.prototype.handleInput = function(dir) {
    "use strict";
    // Switch-case control flow to move player in grid
    switch (dir) {
        case "left":
            this.col--;
            if (this.col < 0) this.col = 0;
            break;
        case "up":
            this.row--;
            if (this.row < 1) { // Player fell into the water and lose one life
                this.row = 5;
                this.col = 2;
                this.lives--;
            }
            break;
        case "right":
            this.col++;
            if (this.col > 4) this.col = 4;
            break;
        case "down":
            this.row++;
            if (this.row > 5) this.row = 5;
            break;
    }
};

// Collectibles are player must collect for points.
var Collectible = function() {
    "use strict";
    // No column value because enemys move continuesly in this direction
    this.row = Math.floor(Math.random() * 3 + 1); // random number between 1 and 3
    this.col = Math.floor(Math.random() * 5); // random number between 0 and 4

    this.x = 101 * this.col + 55 / 2; // Collectible x position
    this.y = 110 + 83 * (this.row - 1); // Collectible y position

    this.type = Math.floor(Math.random() * 3 + 1); // Which type of collectible is, 3 different types
    this.points = this.type * 100; // How much points has this collectible

    // The image/sprite for our collectible depends on the type
    switch (this.type) {
        case 1:
            this.sprite = 'images/Gem Blue.png';
            break;
        case 2:
            this.sprite = 'images/Gem Green.png';
            break;
        case 3:
            this.sprite = 'images/Gem Orange.png';
            break;
    }
};

// Draw the enemy on the screen, required method for game
Collectible.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 / 2, 171 / 2);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy()];
var player = new Player();
var collectibles = new Collectible();

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