/*global game:true, Phaser:true */

var bootState = {

    create: function () {

        //Initial GameSystem (Arcade, P2, Ninja)
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);
        // Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.gravity.y = 100;
        game.physics.p2.restitution = 1.0;

        //Initial Load State
        game.state.start('load');
    }
};
