import Phaser from 'phaser'
import { victoria } from './victory';
import { gameover } from './gameover';
import { Monstruo } from '../clases/monstruo';
import { Espiritu } from '../clases/espiritu';
import {UI} from '../clases/UI'
import { sharedInstance as events } from '../scenes/EventCenter'
import { getData, pushData } from '../services/database'

export class gameplay extends Phaser.Scene{
	
    turno = 0;
    pausa = 0;

    spiritMov1 = 0;
    
    spirit;
    monster;


    constructor()
	{
		super('gameplay')

	}

    init(data){
        this.victory = data.victory1;
    }
	preload() {
        this.load.tilemapTiledJSON("map", "assets/tilemaps/mapa.json");
        this.load.image("fondo", "assets/images/spritesheet.png");
    }
    

    create() {
        
		this.turno = 0;
        this.monsterMov = 10;
        this.spiritMov = 0;

        this.isAlarmActive = false;
        this.dataAlarmActive = {};
        
        this.audio2 = this.sound.add('select', {loop:false});
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

        this.cuevas = map.findObject(
            "objetos", 
            (obj) => obj.type === "cueva"
        );
        
        //Creo los elementos llamando las clases
        this.spirit = new Espiritu(this);
		this.monster = new Monstruo(this);
        this.UI = new UI(this);

        //Interacción entre espiritu y monstruo
        this.physics.add.overlap(
            this.monster.monster,
            this.spirit.spirit, 
             (mos) => { this.gameOver()     
        }, null, this)

        //overlap entre el espiritu y la cueva
        this.physics.add.overlap(
            this.spirit.spirit,
            this.spirit.salida2, 
            (spi) => {
            this.game.sound.stopAll();
            this.victory = "spirit";
            pushData(this.victory);
            setTimeout(() => {
                this.scene.start("victoria");
                }, 1000);
            return
        }, null, this)

        //Variable y texto del timer
        this.scoreTime = 40;
        this.scoreTimeText = this.add.text(1165, 30, this.scoreTime, {
          fontSize: "70px",
          fill: "#000",
          fontFamily:'Prueba2',
        }).setDepth(7);

        //Imagen de
        this.Alert = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "Alerta").setScale(0.5).setDepth(3);
        this.Alert.visible = false;

        events.on('alerta-activada', this.sonarAlarma, this)
    }

    sonarAlarma(alarma){
        this.isAlarmActive = true
        this.dataAlarmActive = alarma
    }
    
   
    update() {
        //Llamo a los update de cada clase
        this.monster.update();
        this.spirit.update();
        this.UI.update();

       

        if (this.monsterMov == 0 && this.spiritMov == 0) {
            this.spirit.comprobarCasillas();

            this.UI.Tutospi();

            this.turno = 1;
            this.spiritMov = 7;
            this.spiritMov1 = 6; 

            this.monster.oscuroFondo.visible = false;

            this.scoreTimeText.destroy();
            this.scoreTime = 30;
            this.scoreTimeText = this.add.text(1165, 30, this.UI.scoreTime, {
                fontSize: "70px",
                fill: "#000",
                fontFamily:'Prueba2',
            }).setDepth(7);
            
            this.UI.energiaText.destroy();
            this.UI.energiaText = this.add.text(650, 30, this.spiritMov1, {
                fontSize: "90px",
                fill: "#000",
                fontFamily:'Prueba2',
            }).setDepth(7);
           
        }
        
        if (this.spiritMov == 1) { 
            this.monster.comprobarCasillas();
            this.UI.Destruir();

            this.pausa = 0;
            this.turno = 0;
            this.monsterMov = 10;
            this.spiritMov = 0;

            this.UI.cartel.visible = true;
            this.UI.cartelTxt.visible = true;
            this.monster.oscuroFondo.visible = true;
            
            this.scoreTimeText.destroy();
            this.scoreTime = 40;
            this.scoreTimeText = this.add.text(1165, 30, this.UI.scoreTime, {
                fontSize: "70px",
                fill: "#000",
                fontFamily:'Prueba2',
            }).setDepth(7);


            this.UI.energiaText.destroy();
            this.UI.energiaText = this.add.text(650, 30, this.monsterMov, {
                fontSize: "90px",
                fill: "#000",
                fontFamily:'Prueba2',
            }).setDepth(7);

            if ( this.isAlarmActive) {
                console.log("entro al evento ", this.dataAlarmActive)
                const xAlarm = this.dataAlarmActive.x
                const yAlarm = this.dataAlarmActive.y
        
                this.Alert.setX(xAlarm).setY(yAlarm)
                this.sound.play(this.dataAlarmActive.sound);
                this.Alert.visible = true
                setTimeout(() => {this.Alert.visible = false}, 10000);
    
                this.isAlarmActive = false
            }
            

        }
        
        
       
    }
    //Funcion para restar tiempo y pasar el turno cuando se acabe
    onSecond(){
              
        this.scoreTime = this.scoreTime - this.pausa;
        this.scoreTimeText.setText(this.scoreTime).setDepth(7);
        if (this.scoreTime == 0 && this.monsterMov > 0) {
            this.monsterMov = 0;
        } else if (this.scoreTime == 0 && this.spiritMov > 1) {
            this.spiritMov = 1;
        }          
        
    }
  
    gameOver(){
        this.game.sound.stopAll();
        this.monster.oscuroFondo.visible = false;
        this.spirit.spirit.anims.play("espiritumuerto", true);
        this.victory = "monster";
            pushData(this.victory);
        setTimeout(() => {
            this.scene.start("gameover")
            }, 2000);
        return
    }

}