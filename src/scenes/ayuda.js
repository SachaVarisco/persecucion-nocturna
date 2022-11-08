import Phaser from 'phaser'
import { getTranslations, getPhrase } from '../services/translations'
export class ayuda extends Phaser.Scene{
    constructor()
	{
		super('ayuda')
	}
    create(){
        let audio2 = this.sound.add('select', {loop:false});
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "ayuda");

        this.add.text(800,230, getPhrase("Cada movimiento cuesta 1 de energía."), {fontSize: "50px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 600 }} );
        this.add.text(800,350, getPhrase("Toca las casillas marcadas para moverte."), {fontSize: "50px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 600 }} );
        this.add.text(600,565, getPhrase("MONSTRUO"), {fontSize: "70px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'} );
        this.add.text(1180,565, getPhrase("ESPÍRITU"), {fontSize: "70px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'} );
        this.add.text(565,660, getPhrase("Busca al espíritu y tócalo con tu luz"), {fontSize: "45px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold',wordWrap: { width: 350 } });
        this.add.text(1140,645, getPhrase("Llega a la cueva sin que el monstruo te vea"), {fontSize: "45px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold',wordWrap: { width: 350 } });
        this.add.text(740, 910, getPhrase('Volver al menú'), {fontSize: "90px", fill: "#000", fontFamily:'Prueba', fontStyle: 'bold'}).setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu"))
    }
}