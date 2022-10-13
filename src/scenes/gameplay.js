import Phaser from 'phaser'
import { victoria } from './victory';
import { gameover } from './gameover';
import { Monstruo } from '../clases/monstruo';
import { Espiritu } from '../clases/espiritu';





export class gameplay extends Phaser.Scene{
	
    turno = 0;
    spawnPoint;
    spawnPoint2;
    casillas;
    cuevas;
    gameOver = false;
    victory = false;
    monstermov = 12;
    spiritmov = 0;
    
    scoreTime;
    scoreTimeText;
    timedEvent;
    energiaText;
    energiaSText;
    energiaSpirit = 5;
    oscuroFondo;

    constructor()
	{
		super('gameplay')
	}
	preload() {
        this.load.tilemapTiledJSON("map", "assets/tilemaps/mapa.json");
        this.load.image("fondo", "assets/images/spritesheet.png");
    }
    

    create() {
		
        let audio1 = this.sound.add('pasos');
        audio1.volume -= 0.8
        let audio2 = this.sound.add('select', {loop:false});
        let audio3 = this.sound.add('intro', {loop:true});
        audio3.play();
        audio3.volume -= 0.7
    
    
        this.timedEvent = this.time.addEvent({ 
            delay: 1000, 
            callback: this.onSecond, 
            callbackScope: this, 
            loop: true 
        });
        

        
        const map = this.make.tilemap({ key: "map" });
        const tilesetBelow = map.addTilesetImage("spritesheet", "fondo");
        

        const belowLayer = map.createLayer("mapa", tilesetBelow, 0, 0);
        const objectsLayer = map.getObjectLayer("objetos");
        

        this.spawnPoint = map.findObject(
            "objetos",
            (obj) => obj.name === "espiritu"
        );
        this.spawnPoint2 = map.findObject(
            "objetos",
            (obj) => obj.name === "monstruo"
        );
    
        

        this.casillas = map.filterObjects(
            "objetos",
            (obj) => obj.type === "casilla"
        );

        this.cuevas = map.findObject(
            "objetos", 
            (obj) => obj.type === "cueva"
        );

       

        const spirit = new Espiritu(this);
		const monster = new Monstruo(this);

        this.oscuroFondo = this.add
        .image(monster.x, monster.y, "luz")
        .setOrigin(0.495,0.5); 
		
    
		this.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu",audio3.pause(),
        audio2.play()));
        this.add.image(1200, 70, "timer");
        

        this.scoreTime = 180;
        this.scoreTimeText = this.add.text(1140, 50, this.scoreTime, {
          fontSize: "70px",
          fill: "#000",
        });
        this.add.image(600, 70, "energia");
       
		if (this.monstermov > 0) {
            this.energiaText = this.add.text(650, 40, this.monstermov, {
           
                fontSize: "90px",
                fill: "#000",
            });
        }
       
       

    }
   
    update() {
        if (this.gameOver == true) {
            spirit.anims.play("espiritumuerto", true);
            setTimeout(() => {
                this.scene.start("gameover")
              }, 2000);
            return
        }
        if (this.victory == true) {
            setTimeout(() => {
                this.scene.start("victory")
              }, 1000);
            return
        }


        if (this.monstermov == 0 && this.spiritmov == 0) {
			this.turno = 1;
           // this.oscuroFondo.visible = false;
            this.spiritmov = 7;  
            this.energiaSpirit = 5;
            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, "6", {
                fontSize: "90px",
                fill: "#000",
            });
           
        }
        
        if (this.spiritmov == 1) {
			this.turno = 0;
            //this.oscuroFondo.visible = true;

            this.monstermov = 12;
            this.spiritmov = 0;   
            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, this.monstermov, {
                fontSize: "90px",
                fill: "#000",
            });
        }
        
        this.oscuroFondo = (this.turno == 0);
       

    
        
    }
    onSecond() {
        if (! this.gameOver)
        {       
            this.scoreTime = this.scoreTime - 1; // One second
            this.scoreTimeText.setText(this.scoreTime);
            if (this.scoreTime == 0) {
                this.timedEvent.paused = true;
                this.scene.start(
                  "gameover",
                );
         }            
        }
    }
}