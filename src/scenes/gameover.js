import Phaser from 'phaser'
export class gameover extends Phaser.Scene {
    constructor() {
      super("gameover");
    }
    create(){
      let audio2 = this.sound.add('select', {loop:false});
      
      this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "victoriaM");
      this.add.image(550, 800, "volvermenu").setScale(1.2).setInteractive().on("pointerdown",()=>this.scene.start("MainMenu",
      audio2.play()));
    }
  }