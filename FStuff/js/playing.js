/*global game:true, Phaser:true */
/*jshint esversion: 6 */

var playingState = {
    score       : 0,
    labelScore  : null,
    lives       : 20,
    labelLives  : null,
    falling     : null,
    fallingColisionGroup: null,
    obstacles   : null,
    player      : null,
    playerCollisionGroup: null,
    
    create  : function () {
        game.fallingColisionGroup = game.physics.p2.createCollisionGroup();
        game.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        
        this.falling = this.initialiseStuffPool(20);
        this.obstacles = this.initialiseObstacles(2);
        this.player = this.initialisePlayer();
        //move player object with mouse
        game.input.addMoveCallback(this.movePlayer,this.player); // I might want to change this = this.payer here if i need access to other state objects later in this callback
        
        // display score
        this.labelScore = game.add.text(20, 20, "score: "+this.score, { font: "30px Arial", fill: "#ffffff" }); 
        this.labelLives = game.add.text(330, 20, "Lives: "+this.lives, { font: "30px Arial", fill: "#ffffff" });
    },
    
    render: function () {
        //show debug here if set
        this.falling.forEach(this.checkStuffBounds.bind(this));  // yes - we bind this in a callback function to get 'this' inside
        // coud've done that = this; if you're into 'that'
    },
    
    checkStuffBounds:  function(stuff){
        if(stuff.y > 600){
            stuff.kill();
            stuff.y = 0;
            this.updateLives();
        }
    },
    
    makeAStuff: function(){
        var item = this.falling.getFirstDead();
        if (item)
        {
            //  And bring it back to life
            var buffer = Math.floor(item.width/2);
            var newX = (Math.random()*(game.world.width-item.width))+buffer;
            item.reset(newX, 0);

            //  This just changes its frame
            item.frame = game.rnd.integerInRange(0, 36);
        }
    },  
    
    initialiseObstacles: function(count){
        var pool = Array(count).fill(0);
        var coords = [[100,350],[350,275]];
         
        pool.map(function(obs,i){
            obs = game.add.sprite(coords[i][0], coords[i][1], 'veg');
            game.physics.p2.enable(obs);
            obs.frame = 1;
            obs.body.setCircle(16);
            obs.body.static = true;
            obs.x = 100;
            obs.y = 400;            
        });
        
        return pool;
    },
    
    movePlayer: function(thePointer, px,py, wasClick){
        this.body.x = px;
        this.body.y = py;
    },
    
    initialiseStuffPool: function(count){
        //var pool = game.add.physicsGroup(Phaser.Physics.P2JS);
        var pool = game.add.group();
        //pool.createMultiple(count, 'veg', 0, false);
        pool.enableBody = true;
        pool.physicsBodyType = Phaser.Physics.P2JS;
        
        var blah = Array(count).fill().forEach(()=>{pool.create(0,0,'veg');});        
        
        pool.forEach(this.initialiseAStuff);
        // set up a creating timer
        game.time.events.repeat(Phaser.Timer.SECOND, 2000, this.makeAStuff, this);
        return pool;
    },
    
    initialiseAStuff: function(stuff){
        
                
        stuff.body.setCollisionGroup(game.fallingColisionGroup);
        stuff.body.setCircle(16);
        //ball.body.fixedRotation = true;
        stuff.frame = game.rnd.integerInRange(0, 36);
    },
    
    initialisePlayer: ()=>{
        var player = game.add.sprite(240, 600, 'veg');
        player.frame = 0;
        //game.physics.p2.enable([player]);
        player.body.kinematic = true;
        player.body.setCollisionGroup(game.playerCollisionGroup);
        //player.body.collides(game.fallingColisionGroup, game.stuffHit, this);
        return player;
    },
    
    updateLives: function(){
        this.lives -=1;
        // this doesn't work!!
        this.labelLives.setText( "Lives: "+this.lives);
    },
    
    stuffHit: function(body1, body2) { 
    // body1 is the body that owns the callback (the player) 
    // body2 is the body it impacted with (the stuff)
    // As body2 is a Phaser.Physics.P2.Body object, you access its owner (the sprite) via the sprite property: 
    body2.sprite.alpha *= 0.9;
    },
    
    repeat: (count, callback)=>{
    Array(count).fill().forEach(callback);
    }
    
};

// todo 
//      - end level.
//        - freeze lives and score, grey out, have text showing score & comment, menu button
//      - do menu (easy, med, hard, highscores?, quit?)
//      - do proper body shapes using framemaker etc
//      - fix the 'off left edge' new stuff problem
//      - do scoring
//      - do sounds / music
//      - do speed increase
//      - do hit points on objects
//      - do mini-points overlay (i.e. '1' floating up the screen)
//      - do change score/lives animation
//      - do destroyes stuff animation
