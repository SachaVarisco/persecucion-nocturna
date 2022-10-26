import Phaser from 'phaser'
export  class preload extends Phaser.Scene {
	constructor() {
  
	  super("preload");
	}
  
	preload() {
	  this.load.image("Mainfondo", "assets/images/MainMenu.png");
	  this.load.image("jugar", "assets/images/jugarboton.png");
	  this.load.image("pausa", "assets/images/intpause.png");
	  this.load.image("timer", "assets/images/inttimer.png");
	  this.load.image("energia", "assets/images/intenergia.png");
	  this.load.image("reanudar", "assets/images/reanudar.png");
	  this.load.image("salir", "assets/images/salir.png");
	  this.load.image("creditos", "assets/images/pausacreditos.png");
	 this.load.image("fondoPausa", "assets/images/fondopausa.png");
	  this.load.image("sky", "assets/images/spritesheet.png");
	  this.load.image("luz", "assets/images/luz.png");
	  this.load.image("victoriaS", "assets/images/victoriaespiritus.png");
	  this.load.image("victoriaM", "assets/images/victoriamonstruo.png");
	  this.load.image("creditosmenu", "assets/images/botoncreditos.png");
	  this.load.image("ayudamenu", "assets/images/botonayuda.png");
	  this.load.image("volvermenu", "assets/images/botonvolveralmenu.png");
	  this.load.image("ayuda", "assets/images/pantallaayuda.png");
	  this.load.image("creditosP", "assets/images/pantallacreditos.png");
	  this.load.image("marca", "assets/images/Marca.png");
	  this.load.image("TutoMons", "assets/images/TutorialMonstruo.png");
	  this.load.image("TutoSpi", "assets/images/TutorialEspíritu.png");
	  this.load.image("Turno", "assets/images/turnos.png");
	  this.load.spritesheet("espiritu", "assets/images/ConejoTileset.png", {frameWidth: 84,
		frameHeight: 116,})
		this.load.spritesheet("espiritumuerto", "assets/images/ConejoCongelado.png", {frameWidth: 84,
		  frameHeight: 116,})
	  this.load.spritesheet("monstruo", "assets/images/MonstruoTileset.png", {frameWidth: 84,
		frameHeight: 116,})
	  this.load.audio("intro", "assets/sounds/menusong.mp3");
	  this.load.audio("pasos", "assets/sounds/pasos2.wav");
	  this.load.audio("select", "assets/sounds/select.wav");
	}
  
	create() {
	  this.anims.create({
		key: "monstruocamina",
		frames: this.anims.generateFrameNumbers("monstruo", { start: 0, end: 4 }),
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
	  
	 
	  this.scene.start("MainMenu");
	}
  }
  