import Phaser from 'phaser'
export class ayuda extends Phaser.Scene{
    constructor()
	{
		super('ayuda')
	}
    create(){
        let audio2 = this.sound.add('select', {loop:false});
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "ayuda");
   
        this.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu", audio2.play()));
    }
}