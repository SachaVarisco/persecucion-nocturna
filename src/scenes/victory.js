import Phaser from 'phaser'
import { getTranslations, getPhrase } from '../services/translations'
export class victoria extends Phaser.Scene{
    constructor()
	{
		super('victoria')
	}
	create(){
		let audio2 = this.sound.add('select', {loop:false});
		
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "victoriaS");
		this.add.text(100, 100, getPhrase('Los espíritus escaparon'), {fontSize: "170px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold',wordWrap: { width: 1200 }, align : "center" })
		this.add.text(300, 740, getPhrase('Volver al menú'), {fontSize: "90px", fill: "#000", fontFamily:'Prueba', fontStyle: 'bold'}).setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu"))
	  }
}