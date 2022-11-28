import Phaser from 'phaser'
import { getPhrase } from '../services/translations';
export class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }
  create(){
    let audio2 = this.sound.add('select', {loop:false});
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "victoriaM");
    this.add.text(90, 100, getPhrase("El monstruo cazó a todos los espíritus"), {fontSize: "130px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold',wordWrap: { width: 1100 }, align : "center" })
    this.add.text(350, 740, getPhrase('Volver al menú'),{fontSize: "80px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setInteractive().on("pointerdown",()=>this.scene.start("MainMenu"));
  }
};