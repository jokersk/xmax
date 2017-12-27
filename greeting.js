var greeting = function(game){}
 
greeting.prototype = {
	content : [
        "聖誕快樂啊！！ 好開心聖誕前可以遇到你",
        "雖然今個聖誕冇得同你一齊過", 
        "但係好多謝你同我過生日",
        "希望下年聖誕同生日都一齊過啦",
        "其實你開朗既性格令到我同埋成個office氣氛都活躍曬,開心曬",
        "不過你都會有叫悶同眼訓既時候",
        "甘我就特登整左呢個專有王子game比你解下悶",
        "(雖然整得好雞，下年預多D時間再整只勁既)",
        "仲有多謝你教左我甘多同女仔相處之道",
        "我真係學左好多野",
        "最後一條問題",
        "你今日開唔開心啊"
    ],
    happyContent:[
        "太好啦! 希望你每次都唔會㩒隔離粒制。",
        "今日有咩開心事呢，同司徒分享下，等佢都開心下",
        "佢聽到你把聲個人都開心D噶",
        "你真係好易笑，笑點低，笑得又好睇",
        "一笑個梨渦就走出來",
        "諗起你整蠱我(最細化我D野)",
        "跟住系度偷笑",
        "其實都幾好玩，哈哈"
    ],
    unhappyContent:[
        "哎喲，你唔開心啊？",
        "發生咩事啊，有人蝦你啊？",
        "同司徒講下發生咩事",
        "雖然佢可能幫唔到D咩",
        "不過佢好樂意借只耳仔比你",
        "娘D講句，希望在明天啊嘛",
        "聽日就冇事噶啦",
        "希望你第日都唔會來呢版啦"
    ],
    line : [],
    wordIndex : 0,
    lineIndex : 0,
    wordDelay : 120,
    lineDelay : 400,
    lineIndex : 0,
    timer : "",
    preload: function (){
        this.game.load.image('bgsec',"bgsec.jpeg");
        this.game.load.image('happy',"happy.png");
        this.game.load.image('unhappy',"unhappy.png");
    },
    create: function()
    {
        bg = this.game.add.sprite( window.innerWidth / 2,  window.innerHeight / 2, "bgsec");
		bg.scale.set(0.9);
        bg.anchor.setTo(0.5);
        
        this.text = this.game.add.text(30, 30, '', { font: "18px Arial", fill: "#ffffff" , wordWrap: true, wordWrapWidth: 330});
        this.text.setShadow(0, 0, 'rgba(255, 255, 255, 0.5)', 0);

        this.nextLine();

       

        

    },
    addbutton:function(){
        this.happy = this.game.add.button( 35, 600, 'happy', this.happyOnClick, this, 2, 1, 0);
        this.happy.scale.set(0.5)
        
        this.unhappy = this.game.add.button(this.game.world.width - 125, 600, 'unhappy', this.unhappyOnClick, this, 2, 1, 0);
        this.unhappy.scale.set(0.5)
    },
    happyOnClick : function(){
        this.game.time.events.stop()
        this.text.text = ""
        this.line = [],
        this.wordIndex = 0,
        this.lineIndex = 0,
        this.wordDelay = 120,
        this.lineDelay = 400,
        this.lineIndex = 0,
        this.content = this.happyContent
        this.nextLine();
    },
    unhappyOnClick : function(){
        this.game.time.events.stop()
        this.text.text = ""
        this.line = [],
        this.wordIndex = 0,
        this.lineIndex = 0,
        this.wordDelay = 120,
        this.lineDelay = 400,
        this.lineIndex = 0,
        this.content = this.unhappyContent
        this.nextLine();
    },
    nextLine : function() {
        if (this.lineIndex === this.content.length)
        {
            this.addbutton();
            return;
        }
        line = this.content[this.lineIndex].split('');
        wordIndex = 0;
        this.game.time.events.repeat(this.wordDelay, line.length, this.nextWord, this);
        this.game.time.events.start();
        this.lineIndex++;
        
    },
    nextWord : function() 
    {
        
        this.text.text = this.text.text.concat(line[wordIndex] + " ");
        wordIndex++;
        if (wordIndex === line.length)
        {
            this.text.text = this.text.text.concat("\n");
            this.game.time.events.add(this.lineDelay, this.nextLine, this);
        }
        
    }
	
}