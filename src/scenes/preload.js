import Phaser from 'phaser'
import { getTranslations } from '../services/translations';
export  class preload extends Phaser.Scene {

	#language
	constructor() {
	  super("preload");
	}
  
	preload() {
	  this.load.image("Mainfondo", "assets/images/MainMenu.png");
	  this.load.image("pausa", "assets/images/intpause.png");
	  this.load.image("timer", "assets/images/inttimer.png");
	  this.load.image("energia", "assets/images/intenergia.png");
	  this.load.image("fondoPausa", "assets/images/Pausa.png");
	  this.load.image("sky", "assets/images/spritesheet.png");
	  this.load.image("luz", "assets/images/luz.png");
	  this.load.image("victoriaS", "assets/images/victoriaespiritus.png");
	  this.load.image("victoriaM", "assets/images/victoriamonstruo.png");
	
	  this.load.image("ayuda", "assets/images/pantallaayuda.png");
	  this.load.image("creditosP", "assets/images/pantallacreditos.png");
	  this.load.image("marca", "assets/images/Marca.png");
	  this.load.image("TutoMons", "assets/images/TutorialMonstruo1.png");
	  this.load.image("TutoSpi", "assets/images/TutorialEspíritu.png");
	  this.load.image("Turno", "assets/images/Pasarelteléfono.png");
	  this.load.image("Alerta", "assets/images/Alerta.png");

	  this.load.image("ARG", "assets/images/IconoArgentina.png");
	  this.load.image("EEUU", "assets/images/EEUUIcono.png");
	  this.load.spritesheet("espiritu", "assets/images/ConejoTileset.png", {frameWidth: 84, frameHeight: 116,})
	  this.load.spritesheet("espiritumuerto", "assets/images/ConejoCongelado.png", {frameWidth: 84, frameHeight: 116,})
	  this.load.spritesheet("monstruo", "assets/images/MonstruoTileset.png", {frameWidth: 84, frameHeight: 116,})
	  this.load.spritesheet("mama","assets/images/momSprite.png",{frameWidth: 84, frameHeight: 116,})
	  this.load.spritesheet("zorro","assets/images/zorroSprite.png",{frameWidth: 84, frameHeight: 116,})
	  this.load.audio("intro", "assets/sounds/menusong.mp3");
	  this.load.audio("pasos", "assets/sounds/pasos2.wav");
	  this.load.audio("select", "assets/sounds/select.wav");
	  this.load.audio("alert","assets/sounds/Alerta.mp3" )
	}
  
	create() {
	  this.anims.create({
			key: "monstruocamina",
			frames: this.anims.generateFrameNumbers("monstruo", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1,
	  	});
	  this.anims.create({
			key: "mamacamina",
			frames: this.anims.generateFrameNumbers("mama", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1,
	  	});
	  this.anims.create({
			key: "espiritumuerto",
			frames: this.anims.generateFrameNumbers("espiritumuerto", { start: 0, end: 0 }),
			frameRate: 10,
			repeat: -1,
	  	});
	  this.anims.create({
			key: "espiritucamina",
			frames: this.anims.generateFrameNumbers("espiritu", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1,
	  	});
	  this.anims.create({
			key: "zorrocamina",
			frames: this.anims.generateFrameNumbers("zorro", { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1,
	 	});
	  
	  getTranslations(
			this.#language,
			()=>this.scene.start("MainMenu",{ language: this.#language }),
	  	); 
	}

  }
  