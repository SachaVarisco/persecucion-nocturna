import Phaser from 'phaser'
import { EN_US, ES_AR } from '../enums/lenguages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'

export class MainMenu extends Phaser.Scene {
	#language
	#updatedTextInScene;
	#updatedString = 'Siguiente'
    #wasChangedLanguage = TODO

	constructor() {
	  super("MainMenu");
	}
	
	init(data){
        this.#language = data.language;
    }
  
	create() {
	

	  let audio1 = this.sound.add('intro', {loop:true});
	  audio1.play();
	  let audio2 = this.sound.add('select', {loop:false});
	  
	  this.add
		.image(this.cameras.main.centerX, this.cameras.main.centerY, "Mainfondo");
  
	  this.jugar = this.add.text(220, 320, getPhrase('Jugar'),{ fontSize: "160px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(18).setInteractive().on("pointerdown",()=>this.scene.start('gameplay', 
	  audio1.pause(),
	  audio2.play(),
	  ));
	  
	  this. creditos = this.add.text(60, 910, getPhrase("Créditos"), { fontSize: "100px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setInteractive().on("pointerdown",()=>this.scene.start("creditos", 
	  audio1.pause(),
	  audio2.play(),
	  ));;
	  this.ayuda = this.add.text(150,620, getPhrase("Ayuda"), { fontSize: "120px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(12).setInteractive().on("pointerdown",()=>this.scene.start("ayuda", 
	  audio1.pause(),
	  audio2.play(),
	  ));;

		const BotonEspañol = this.add.image(1850, 1000, "ARG")
		.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			this.getTranslations(ES_AR)
		})
		
		const BotonEEUU = this.add.image(1730, 1000, "EEUU")
		.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
			  this.getTranslations(EN_US)
		  })

  
	}
	updateWasChangedLanguage = () => {
		this.#wasChangedLanguage = FETCHED;
	}
	async getTranslations(lang){
		this.#language = lang;
		this.#wasChangedLanguage = FETCHING;
		await getTranslations(lang, this.updateWasChangedLanguage)
	}

	update(){

		if(this.#wasChangedLanguage === FETCHED){
			this.#wasChangedLanguage = READY;
			this.jugar.setText(getPhrase('Jugar'));
			this.ayuda.setText(getPhrase("Ayuda"));
			this.creditos.setText(getPhrase("Créditos"));
		}
	};
  }