import Phaser from 'phaser'


var monstermov;
var spiritmov;

var scoreTime;
var scoreTimeText;
var timedEvent;
var energiaText;
var energiaSText;
var energiaSpirit = 5;

export class gameplay extends Phaser.Scene{
	turno = 0;

    constructor()
	{
		super('gameplay')
	}
	preload() {
        this.load.tilemapTiledJSON("map", "public/assets/tilemaps/mapa.json");
        this.load.image("fondo", "public/assets/images/spritesheet.png");
    }
    onSecond() {
        if (! gameOver)
        {       
            scoreTime = scoreTime - 1; // One second
            scoreTimeText.setText(scoreTime);
            if (scoreTime == 0) {
                timedEvent.paused = true;
                this.scene.start(
                  "gameover",
                );
         }            
        }
    }

    create() {
		let gameOver = false
        let victory = false
        let audio1 = this.sound.add('pasos');
        audio1.volume -= 0.8
        let audio2 = this.sound.add('select', {loop:false});
        let audio3 = this.sound.add('intro', {loop:true});
        audio3.play();
        audio3.volume -= 0.7
    
    
        timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: this.onSecond, 
            callbackScope: this, 
            loop: true 
        });
        

        
        const map = this.make.tilemap({ key: "map" });
        const tilesetBelow = map.addTilesetImage("spritesheet", "fondo");
        

        const belowLayer = map.createLayer("mapa", tilesetBelow, 0, 0);
        const objectsLayer = map.getObjectLayer("objetos");
        

        const spawnPoint = map.findObject(
            "objetos",
            (obj) => obj.name === "espiritu"
        );
        const spawnPoint2 = map.findObject(
            "objetos",
            (obj) => obj.name === "monstruo"
        );
    
        

        const casillas = map.filterObjects(
            "objetos",
            (obj) => obj.type === "casilla"
        );

        const cuevas = map.findObject(
            "objetos", 
            (obj) => obj.type === "cueva"
        );

		const monster = new Monstruo;
		const spirit = new Espiritu;
    
		this.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu",audio3.pause(),
        audio2.play()));
        this.add.image(1200, 70, "timer");
        

        scoreTime = 180;
        scoreTimeText = this.add.text(1140, 50, scoreTime, {
          fontSize: "70px",
          fill: "#000",
        });
        this.add.image(600, 70, "energia");
       
		if (monstermov > 0) {
            energiaText = this.add.text(650, 40, monstermov, {
           
                fontSize: "90px",
                fill: "#000",
            });
        }
       
       

    }
   
    update() {
        if (gameOver == true) {
            spirit.anims.play("espiritumuerto", true);
            setTimeout(() => {
                this.scene.start("gameover")
              }, 2000);
            return
        }
        if (victory == true) {
            setTimeout(() => {
                this.scene.start("victory")
              }, 1000);
            return
        }

		

        if (monstermov == 0 && spiritmov == 0) {
			this.turno = 1;
            //oscuroFondo.visible = false;
            spiritmov = 7;  
            energiaSpirit = 5;
            energiaText.destroy();
            energiaText = this.add.text(650, 40, "6", {
                fontSize: "90px",
                fill: "#000",
            });
           
        }
        
        if (spiritmov == 1) {
			this.turno = 0;
            //oscuroFondo.visible = true;

            monstermov = 12;
            spiritmov = 0;   
            energiaText.destroy();
            energiaText = this.add.text(650, 40, monstermov, {
                fontSize: "90px",
                fill: "#000",
            });
        }

		oscuroFondo.visible = (this.turno == 0);
       

    
        
    }
}