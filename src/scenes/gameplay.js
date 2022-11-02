import Phaser from 'phaser'
import { EN_US, ES_AR, PT_BR } from '../enums/lenguages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'
import keys from '../enums/key'

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
    gameOver;
    victory;
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
    tutomonsTag;
    tutomonsTxt;
    tutospi;
    cartel;
    Alert;

    audio3;

    constructor()
	{
		super('gameplay')
        const{ mama } = keys.scenegameplay;
        this.mama = mama;
	}
	preload() {
        this.load.tilemapTiledJSON("map", "assets/tilemaps/mapa.json");
        this.load.image("fondo", "assets/images/spritesheet.png");
    }
    

    create() {
        this.victory = false;
        this.gameOver = false;
		this.turno = 0;
        this.monstermov = 12;
        this.spiritmov = 0;
        
        let audio2 = this.sound.add('select', {loop:false});
        this.audio3 = this.sound.add('intro', {loop:true});
        this.audio3.play();
        this.audio3.volume -= 0.7
    
    
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
        console.log(this.casillas)

        this.cuevas = map.findObject(
            "objetos", 
            (obj) => obj.type === "cueva"
        );

       

        this.spirit = new Espiritu(this);
		this.monster = new Monstruo(this);

        this.physics.add.overlap(
            this.monster.monster,
            this.spirit.spirit, 
             (mos) => { this.gameOver = true
                // this.audio3.pause()
        }, null, this)

        
		
     this.cartel = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Turno").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(4);
        this.cartel.visible = false
     this.pausar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "fondoPausa").setDepth(5);
        this.pausar.visible = false
     this.salir = this.add.image(this.cameras.main.centerX, 560, "salir").setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu", this.audio3.pause())).setDepth(5);
        this.salir.visible = false
     this.reanudar = this.add.image(this.cameras.main.centerX, 300, "reanudar").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(5);
        this.reanudar.visible = false
     
        


		this.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.Pausa()).setDepth(3);
        this.add.image(1200, 70, "timer").setDepth(6);
        

        this.scoreTime = 40;
        this.scoreTimeText = this.add.text(1165, 50, this.scoreTime, {
          fontSize: "70px",
          fill: "#000",
        }).setDepth(7);

        this.add.image(600, 70, "energia").setDepth(6);
        if (this.monstermov > 0) {
            this.energiaText = this.add.text(650, 40, this.monstermov, {
           
                fontSize: "90px",
                fill: "#000",
            }).setDepth(7);
        }

        this.tutomons = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "TutoMons").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(8);
        this.tutomonsTag = this.add.text(530, 350, getPhrase(this.mama), {fontSize: "60px", fill: "#000",}).setDepth(9)
        this.tutospi = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "TutoSpi").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(8);
        this.tutospi.visible = false;
        
        

        this.Alert = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Alerta").setScale(0.5).setDepth(3);
        this.Alert.visible = false;
    }
   
    update() {

        if (this.gameOver == true) {
            this.spirit.spirit.anims.play("espiritumuerto", true);
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
        //Llamo a los update de cada personaje
        this.monster.update();
        this.spirit.update();

        if (this.turno == 0) {
            this.energiaText.text = this.monstermov.toString();
        }else{
            this.energiaText.text = this.spiritmov1.toString();
            this.monster.romper();
        }

        if (this.monstermov == 0 && this.spiritmov == 0) {
            this.spirit.comprobarCasillas();

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
            }).setDepth(7);
            
            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, this.spiritmov1, {
                fontSize: "90px",
                fill: "#000",
            }).setDepth(7);
           
        }
        
        if (this.spiritmov == 1) { 
            this.tutospi.destroy();
            this.monster.comprobarCasillas();


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
            }).setDepth(7);


            this.energiaText.destroy();
            this.energiaText = this.add.text(650, 40, this.monstermov, {
                fontSize: "90px",
                fill: "#000",
            }).setDepth(7);

            if (this.spirit.bosque == true) {
                this.Alert.setX(1600).setY(800)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.bosque = false}, 5000);
            }else if(this.spirit.cuack == true){
                this.Alert.setX(800).setY(750)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.cuack = false}, 5000);
            }else if(this.spirit.craneo == true){
                this.Alert.setX(1400).setY(400)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.craneo = false}, 5000);
            }else if(this.spirit.tortuga == true){
                this.Alert.setX(800).setY(400)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.tortuga = false}, 5000);
            }else if(this.spirit.ojo == true){
                this.Alert.setX(400).setY(400)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.ojo = false}, 5000);
            }else if(this.spirit.tronco == true){
                this.Alert.setX(400).setY(840)
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false, this.spirit.tronco= false}, 5000);
            }

        }
        
        
       
        
    
        
    }


    //Funcion para restar tiempo y pasar el turno cuando se acabe
    onSecond() {
        if (! this.gameOver)
        {       
            this.scoreTime = this.scoreTime - this.pausa;
            this.scoreTimeText.setText(this.scoreTime).setDepth(7);
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
        this.tutomonsTag.visible = false;
    }
}