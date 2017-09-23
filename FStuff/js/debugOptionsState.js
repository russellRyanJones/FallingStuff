/*global game:true, Phaser:true */

var debugOptionsState = {

    create: function () {
        //game.add.plugin(Phaser.Plugin.Debug);
        //game.add.plugin(Phaser.Plugin.Inspector);
        //game.russDebugOn = true;
        
        game.state.start('playing');
    }
};