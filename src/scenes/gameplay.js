import Phaser from 'phaser'
import { Monstruo } from '../clases/monstruo';
import { Espiritu } from '../clases/espiritu';
import {UI} from '../clases/UI'
import { sharedInstance as events } from '../scenes/EventCenter'
import { pushData } from '../services/database'

export class gameplay extends Phaser.Scene{
	
    turno = 0;
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
        this.spiritMov1 = 0;

        this.isAlarmActive = false;
        this.dataAlarmActive = {};
        
        this.audio2 = this.sound.add('select', {loop:false});
        this.audio3 = this.sound.add('intro', {loop:true});
        this.audio3.play();
        this.audio3.volume -= 0.7
        
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

        //Imagen de Alerta
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
        this.monster.Update();
        this.spirit.Update();
        this.UI.Update();

        if (this.monsterMov == 0 && this.spiritMov == 0) {
            this.spirit.ComprobarCasillas();
            this.UI.Tutospi();
            this.turno = 1;
            this.spiritMov1 = 6; 
            this.spiritMov = 7;
            this.UI.scoreTime = 30;
            this.monster.oscuroFondo.visible = false;
        }
        
        if (this.spiritMov == 1) { 
            this.monster.ComprobarCasillas();
            this.UI.Destruir();
            this.UI.Tutospi();
            this.turno = 0;
            this.monsterMov = 10;
            this.spiritMov = 0;
            this.UI.scoreTime = 40;
            this.monster.oscuroFondo.visible = true;
            if (this.isAlarmActive) {
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