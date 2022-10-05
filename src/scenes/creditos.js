import Phaser from 'phaser'
export class creditos extends Phaser.Scene {
    constructor() {
      super("creditos");
    }
    create() {
      let audio2 = this.sound.add('select', {loop:false});
      
        this.add
        .image(this.cameras.main.centerX, this.cameras.main.centerY, "creditosP");
       
        this.add.image(1000, 1000, "volvermenu").setScale(0.8).setInteractive().on("pointerdown",()=>this.scene.start("MainMenu",
        audio2.play()));
    }


}