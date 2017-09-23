/*global game:true, Phaser:true, bootState:true, loadState:true, menuState:true, debugOptionsState:true, playingState:true */

var w = 480, h = 640;

/*
For Fullscreen put this code:

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('debugOptionsState', debugOptionsState);
game.state.add('playing', playingState);

game.state.start('boot');
