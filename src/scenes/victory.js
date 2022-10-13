import Phaser from 'phaser'
export class victoria extends Phaser.Scene{
    constructor()
	{
		super('victoria')
	}
	create(){
		let audio2 = this.sound.add('select', {loop:false});
		
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "victoriaS");
		this.add.image(500, 800, "volvermenu").setScale(1.2).setInteractive().on("pointerdown",()=>this.scene.start("MainMenu",
		/*audio2.play()*/));
	  }
}