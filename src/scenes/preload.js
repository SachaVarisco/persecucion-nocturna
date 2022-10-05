import Phaser from 'phaser'
export class preload extends Phaser.Scene {
	constructor() {
  
	  super("preload");
	}
  
	preload() {
	  this.load.image("Mainfondo", "public/assets/images/MainMenu.png");
	  this.load.image("jugar", "public/assets/images/jugarboton.png");
	  this.load.image("pausa", "public/assets/images/intsalir.png");
	  this.load.image("timer", "public/assets/images/inttimer.png");
	  this.load.image("energia", "public/assets/images/intenergia.png");
	  this.load.image("reanudar", "public/assets/images/reanudar.png");
	  this.load.image("salir", "public/assets/images/salir.png");
	  this.load.image("creditos", "public/assets/images/pausacreditos.png");
	 // this.load.image("fondoPausa", "public/assets/images/fondopausa.png");
	  this.load.image("sky", "public/assets/images/spritesheet.png");
	  this.load.image("luz", "public/assets/images/luz.png");
	  this.load.image("victoriaS", "public/assets/images/victoriaespiritus.png");
	  this.load.image("victoriaM", "public/assets/images/victoriamonstruo.png");
	  this.load.image("creditosmenu", "public/assets/images/botoncreditos.png");
	  this.load.image("ayudamenu", "public/assets/images/botonayuda.png");
	  this.load.image("volvermenu", "public/assets/images/botonvolveralmenu.png");
	  this.load.image("ayuda", "public/assets/images/pantallaayuda.png");
	  this.load.image("creditosP", "public/assets/images/pantallacreditos.png");
	  this.load.spritesheet("espiritu", "public/assets/images/ConejoTileset.png", {frameWidth: 84,
		frameHeight: 116,})
		this.load.spritesheet("espiritumuerto", "public/assets/images/ConejoCongelado.png", {frameWidth: 84,
		  frameHeight: 116,})
	  this.load.spritesheet("monstruo", "public/assets/images/MonstruoTileset.png", {frameWidth: 84,
		frameHeight: 116,})
	  this.load.audio("intro", "public/assets/sounds/menusong.mp3");
	  this.load.audio("pasos", "public/assets/sounds/pasos2.wav");
	  this.load.audio("select", "public/assets/sounds/select.wav");
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
  