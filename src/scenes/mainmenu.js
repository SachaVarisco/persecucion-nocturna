
export class MainMenu extends Phaser.Scene {
	constructor() {
	  super("MainMenu");
	}
  
  
	create() {
	  let audio1 = this.sound.add('intro', {loop:true});
	  audio1.play();
	  let audio2 = this.sound.add('select', {loop:false});
	  
	  this.add
		.image(this.cameras.main.centerX, this.cameras.main.centerY, "Mainfondo")
		.setScale(1);
  
	  this.add.image(400, 460, "jugar").setInteractive().on("pointerdown",()=>this.scene.start("gameplay", 
	  audio1.pause(),
	  audio2.play(),
	  ));
	  
	  this.add.image(220, 980, "creditosmenu").setInteractive().setScale(0.8).on("pointerdown",()=>this.scene.start("creditos", 
	  audio1.pause(),
	  audio2.play(),
	  ));;
	  this.add.image(300,710, "ayudamenu").setInteractive().setScale(1.3).on("pointerdown",()=>this.scene.start("ayuda", 
	  audio1.pause(),
	  audio2.play(),
	  ));;
  
  
	}
  }