var theGame = function(game) {
	console.log("%cStarting my awesome game", "color:white; background:red");
}

theGame.prototype  = {
	playerSpeed : 300,
	player : "",
	gift : "",
	count : 0,
	text : "",
	giftmoving : false,
	preload:function() {
		this.game.load.image("prince","prince.png");
		this.game.load.image("ground","ground.png");
		this.game.load.image('bg',"b2.jpeg");
		this.game.load.image('gift',"gift.png");
		this.game.load.audio('xmas', 'xmas.mp3');
		this.game.load.audio('coin',"coin.mp3");
		this.game.load.image('happy',"happy.png");
		this.game.load.image('pass',"pass.png");
	},
	create : function () {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		fx = this.game.add.audio('xmas');
		fx.play();


		this.coin = this.game.add.audio('coin');
		this.coin.volume = 0.1;


		platformgroup = this.game.add.group();
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		
		bg = this.game.add.sprite( window.innerWidth / 2,  window.innerHeight / 2, "bg");
		bg.scale.set(0.4);
		bg.anchor.setTo(0.5);

		this.player = this.game.add.sprite( 150 , 600, "prince");
		this.player.anchor.setTo(0.5);
		this.player.scale.set(0.5);
		
		this.go = this.game.add.button( this.game.world.centerX, this.game.world.centerY, 'pass', this.goOnClick, this, 2, 1, 0);
		this.go.scale.set(0.5)
		this.go.anchor.set(0.5)
		this.go.alpha = 0;
		this.go.inputEnabled = false;
		
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.immovable = true;

		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		this.text = this.game.add.text(this.game.world.centerX, 0, this.count, style);


		this.game.input.onDown.add(this.dropgift, this);	
	
	},
	goOnClick:function(){
		this.game.state.start("greeting");
	},
	update:function(){
		this.player.body.velocity.x = this.playerSpeed * ( 0.2 +  Math.random() * 0.8 )  ;
		
		// this.player.body.gravity.x = this.playerSpeed 
		this.game.physics.arcade.collide(this.player, this.gift, this.getgift, "", this);
		
		if(this.player.x<0)
		{
			this.player.x=0;
			this.playerSpeed*=-1
		}

		if(this.player.x>365)
		{
			
			this.player.x=365;
			this.playerSpeed*=-1
		}

		if(this.gift && this.gift.y > 667)
		{  this.giftmoving = false;  }
	},
	getgift: function(){
		this.coin.play()
		if(this.gift) this.gift.destroy();
		this.coin.play()
		this.count ++;
		this.text.text = this.count;
		this.giftmoving = false;
		
		if(this.count == 10){
			this.go.inputEnabled = true;
			this.go.alpha = 1
		}
	},
	dropgift:function(){
		x = this.game.input.x
		y = 50
		
		if(!this.giftmoving)
		{
			this.giftmoving = true;
			this.gift =  this.game.add.sprite( x,  y, "gift");
			this.gift.scale.set(0.5);
			this.gift.anchor.setTo(0.5);
			this.game.physics.enable(this.gift, Phaser.Physics.ARCADE);
			this.gift.body.gravity.y = 500
		}
			
		
		
		
	}

}

