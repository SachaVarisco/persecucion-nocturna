import Phaser from 'phaser'
import { EN_US, ES_AR, PT_BR } from '../enums/lenguages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'
import keys from '../enums/key'

export class MainMenu extends Phaser.Scene {

	#textSpanish;
    #textGerman;
    #textEnglish;
    #textPortuguese;

	#updatedTextInScene;
	#updatedString = 'Siguiente'
    #wasChangedLanguage = TODO

	constructor() {
	  super("MainMenu");
		const { next } = keys.sceneInitialMenu;
		this.#updatedString = next;

	}
	
	init({ language }){
        this.language = language;
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

		const BotonEspañol = this.add.image(700, 1000, "ARG")
		.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			this.getTranslations(ES_AR)
		})
		.setScale(0.3);
		
		const BotonBrasil = this.add.image(850, 1000, "BRS")
		.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			this.getTranslations(PT_BR)
		})
		.setScale(0.27);

		const BotonEEUU = this.add.image(1000, 1000, "EEUU")
		.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			  this.getTranslations(EN_US)
		  })
		  .setScale(0.3);
  
	}
  }