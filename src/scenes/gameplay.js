import Phaser from 'phaser'
import { victoria } from './victory';
import { gameover } from './gameover';
import { Monstruo } from '../clases/monstruo';
import { Espiritu } from '../clases/espiritu';





export class gameplay extends Phaser.Scene{
	
    turno = 0;
    pausa = 0;

    spawnPoint;
    spawnPoint2;
    casillas;
    cuevas;
    gameOver = false;
    victory = false;
    monstermov;
    spiritmov;
    spiritmov1 = 0;
    
    scoreTime;
    scoreTimeText;
    timedEvent;
    energiaText;
    energiaSText;

    spirit;
    monster;

    reanudar;
    salir;
    pausar;

    tutomons;
    tutospi;
    cartel;

    constructor()
	{
		super('gameplay')
	}
	preload() {
        this.load.tilemapTiledJSON("map", "assets/tilemaps/mapa.json");
        this.load.image("fondo", "assets/images/spritesheet.png");
    }
    

    create() {
		this.turno = 0;
        this.monstermov = 12;
        this.spiritmov = 0;
        
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

       

        this.spirit = new Espiritu(this);
		this.monster = new Monstruo(this);

        this.physics.add.overlap(
            this.monster,
            this.spirit, 
             (mos) => { this.gameOver = true
                console.log("anda")
                // this.audio3.pause()
        }, null, this)

        
		
     this.cartel = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Turno").setInteractive().on("pointerdown", ()=> this.Quitar());
        this.cartel.visible = false
     this.pausar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "fondoPausa");
        this.pausar.visible = false
     this.salir = this.add.image(this.cameras.main.centerX, 560, "salir").setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu"), /*audio3.pause()*/);
        this.salir.visible = false
     this.reanudar = this.add.image(this.cameras.main.centerX, 300, "reanudar").setInteractive().on("pointerdown", ()=> this.Quitar());
        this.reanudar.visible = false
     
        


		this.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.Pausa());
        this.add.image(1200, 70, "timer");
        

        this.scoreTime = 40;
        this.scoreTimeText = this.add.text(1165, 50, this.scoreTime, {
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

        this.tutomons = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "TutoMons").setInteractive().on("pointerdown", ()=> this.Quitar());
        this.tutospi = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "TutoSpi").setInteractive().on("pointerdown", ()=> this.Quitar());
        this.tutospi.visible = false;

    }
   
    update() {

        if (this.gameOver == true) {
            this.spirit.anims.play("espiritumuerto", true);
            setTimeout(() => {
                this.scene.start("gameover")
              }, 2000);
            return
        }

        if (this.victory == true) {
            setTimeout(() => {
                this.scene.start("victoria")
              }, 1000);
            return
        }

        if (this.turno == 0) {
            this.energiaText.text = this.monstermov.toString();
        }else{
            this.energiaText.text = this.spiritmov1.toString();
        }

        if (this.monstermov == 0 && this.spiritmov == 0) {
            this.spirit.update();

            this.pausa = 0;
            this.tutospi.visible = true;

            this.cartel.visible = true;

            this.turno = 1;
            this.spiritmov = 7;
            this.spiritmov1 = 6; 

            this.monster.oscuroFondo.visible = false;

            this.scoreTimeText.destroy();
            this.scoreTime = 30;
            this.scoreTimeText = this.add.text(1165, 50, this.scoreTime, {
                fontSize: "70px",
                fill: "#000",
            });
            
            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, this.spiritmov1, {
                fontSize: "90px",
                fill: "#000",
            });
           
        }
        
        if (this.spiritmov == 1) { 
            this.tutospi.destroy();
            this.monster.update();

            this.pausa = 0;
            this.cartel.visible = true;

            this.turno = 0;
            this.monstermov = 12;
            this.spiritmov = 0; 

            this.monster.oscuroFondo.visible = true;
            
            this.scoreTimeText.destroy();
            this.scoreTime = 40;
            this.scoreTimeText = this.add.text(1165, 50, this.scoreTime, {
                fontSize: "70px",
                fill: "#000",
            });


            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, this.monstermov, {
                fontSize: "90px",
                fill: "#000",
            });
        }
        
        
       
        
    
        
    }


    //Funcion para restar tiempo y pasar el turno cuando se acabe
    onSecond() {
        if (! this.gameOver)
        {       
            this.scoreTime = this.scoreTime - this.pausa;
            this.scoreTimeText.setText(this.scoreTime);
            if (this.scoreTime == 0 && this.monstermov > 0) {
                this.monstermov = 0;
            } else if (this.scoreTime == 0 && this.spiritmov > 1) {
                this.spiritmov = 1;
            }          
        }
    }

    //Funcion para pausar el juego
    Pausa(){
        this.pausa = 0;
        this.reanudar.visible = true;
        this.pausar.visible = true;
        this.salir.visible = true;
    }

    //Funcion para despausar el juego
    Quitar(){
        this.pausa = 1;
        this.cartel.visible = false;
        this.tutomons.visible = false;
        this.tutospi.visible = false;
        this.reanudar.visible = false;
        this.pausar.visible = false;
        this.salir.visible = false;
    }
}