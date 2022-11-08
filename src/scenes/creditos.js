import Phaser from 'phaser'
import { getTranslations, getPhrase } from '../services/translations'
export class creditos extends Phaser.Scene {
    constructor() {
      super("creditos");
    }
    create() {
      let audio2 = this.sound.add('select', {loop:false});
      
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "creditosP");
        this.add.text(193, 760, 'Sacha Varisco', {fontSize: "80px", fill: "#000", fontFamily:'Prueba', fontStyle: 'bold'})
        this.add.text(1365, 760, 'Agustin Hilal', {fontSize: "80px", fill: "#000", fontFamily:'Prueba', fontStyle: 'bold'})
        this.add.text(260, 860, getPhrase('Programación y Diseño'), {fontSize: "48px", fill: "#000", fontFamily:'Prueba',wordWrap: { width: 400 }, align : "center" })
        this.add.text(1410, 860, getPhrase('Arte y Diseño'), {fontSize: "60px", fill: "#000", fontFamily:'Prueba'})
        this.add.text(710, 920, getPhrase('Volver al menú'), {fontSize: "90px", fill: "#000", fontFamily:'Prueba', fontStyle: 'bold'}).setInteractive().on("pointerdown", ()=>this.scene.start("MainMenu"))
        
    }


}