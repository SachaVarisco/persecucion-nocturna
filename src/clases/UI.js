
import { getTranslations, getPhrase } from '../services/translations'

export class UI{
    pausa;
    energiaText;

    constructor(scene){
        this.scene = scene;
        this.Inicio();
    }
    
    Inicio(){
        this.pausa = 0;
        this.scene.add.image(1200, 70, "timer").setDepth(6);
        this.scene.add.image(600, 70, "energia").setDepth(6);
        this.energiaText = this.scene.add.text(650, 30, this.scene.monsterMov, {
        
            fontSize: "90px",
            fill: "#000",
            fontFamily:'Prueba2',
        }).setDepth(7);
    
        this.timedEvent = this.scene.time.addEvent({ 
            delay: 1000, 
            callback: this.onSecond, 
            callbackScope: this, 
            loop: true 
        });

        //Variable y texto del timer
        this.scoreTime = 40;
        this.scoreTimeText = this.scene.add.text(1165, 30, this.scoreTime, {
            fontSize: "70px",
            fill: "#000",
            fontFamily:'Prueba2',
        }).setDepth(7);

        //Cartel de paso de turno
        this.cartel = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "Turno").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(4);
        this.cartel.visible = false;
        this.cartelTxt = this.scene.add.text(550, 320, getPhrase('Tu turno terminó. Pásale el teléfono al siguiente jugador.'),{fontSize: "80px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 1000 }, aling:'center'}).setDepth(5)
        this.cartelTxt.visible = false; 

        //Tutorial del monstruo
        this.tutoMons = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "TutoMons").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(8);
        this.tutoMonsTag = this.scene.add.text(520, 340, getPhrase('Mamá Monstruo'), {fontSize: "70px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoMonsTxt = this.scene.add.text(550,525, getPhrase('Buenas noches querido, hoy toca cazar otra vez. Tu objetivo es encontrar a los espíritus que se esconden en la oscuridad y evitar que lleguen a la cueva.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold', wordWrap: { width: 1350 }}).setDepth(9);
        this.tutoMonsBye = this.scene.add.text(550,930, getPhrase('Te di 20$ para la gaseosa, buena suerte.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoMonsMarca = this.scene.add.text(550, 750, getPhrase('Toca las casillas marcadas para moverte.'), {fontSize: "50px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoMonsEne = this.scene.add.text(550,830,getPhrase('Cada movimiento cuesta 1 de energía.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoMonsAlert = this.scene.add.image(1710,770,"Alerta").setScale(0.7).setDepth(9);
        this.tutoAlerTxt = this.scene.add.text(1580,810,"(" + getPhrase("Este símbolo te mostrará donde esta el espíritu.") + ")", {fontSize: "40px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 320 }}).setDepth(9);

        //Tutorial del espiritu
        this.tutoSpi = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "TutoSpi").setInteractive().on("pointerdown", ()=> this.QuitarSpi()).setDepth(8);
        this.tutoSpi.visible = false;
        this.tutoSpiTag = this.scene.add.text(680, 290, getPhrase('Árbol Ancestral'),  {fontSize: "70px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoSpiTag.visible = false;
        this.tutoSpiTxt = this.scene.add.text(100,450, getPhrase('Un monstruo esta cazando a los espíritus del bosque, ten cuidado de que no te atrape. Tu objetivo es llegar a la cueva, en la casilla superior izquierda del mapa.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold', wordWrap: { width: 1200 }}).setDepth(9);
        this.tutoSpiTxt.visible = false;
        this.tutoSpiBye = this.scene.add.text(100,950, getPhrase('Buena suerte, aléjate de los monstruos.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoSpiBye.visible = false;
        this.tutoSpiMarca = this.scene.add.text(100, 770, getPhrase('Toca las casillas marcadas para moverte.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoSpiMarca.visible = false;
        this.tutoSpiEne = this.scene.add.text(100,850,getPhrase('Cada movimiento cuesta 1 de energía.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutoSpiEne.visible = false;

        //Toca para continuar
        this.tocaTxt = this.scene.add.text(1100,20, getPhrase('Toca la pantalla para continuar.'), {fontSize: "60px", fill: "#fff", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 500 } }).setDepth(9)
        this.tocaSpiTxt = this.scene.add.text(320,20, getPhrase('Toca la pantalla para continuar.'), {fontSize: "60px", fill: "#fff", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 500 } }).setDepth(9)
        this.tocaSpiTxt.visible = false;

        //Boton y pantalla de pausa
        this.scene.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.Pausa()).setDepth(3);
        this.pausar = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "fondoPausa").setDepth(5);
        this.salir = this.scene.add.text(850, 470, getPhrase('Salir'),{ fontSize: "130px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(3).setInteractive().on("pointerdown", ()=>this.scene.scene.start("MainMenu", this.scene.audio3.pause())).setDepth(5);
        this.reanudar = this.scene.add.text(700, 260, getPhrase('Reanudar'),{ fontSize: "150px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(-5).setInteractive().on("pointerdown", ()=> this.QuitarPausa()).setDepth(5);
        this.pausar.visible = false;
        this.reanudar.visible = false;
        this.salir.visible = false;
    }
    
    Update(){
        if (this.scene.turno == 0) {
           
            this.energiaText.text = this.scene.monsterMov.toString();
        }else{
            
            this.energiaText.text = this.scene.spiritMov1.toString();
            this.scene.monster.Romper();
        }
    }

    //Hace visible el tutorial del espiritu.
    Tutospi(){
        this.pausa = 0;
        this.tutoSpi.visible = true;
        this.tutoSpiTag.visible = true;
        this.tutoSpiTxt.visible = true;
        this.tocaSpiTxt.visible = true;
        this.tutoSpiBye.visible = true;
        this.tutoSpiMarca.visible = true;
        this.tutoSpiEne.visible = true;

        this.cartel.visible = true;
        this.cartelTxt.visible = true;
    }

    Destruir(){
        this.tutoSpiBye.destroy();
        this.tutoSpi.destroy();
        this.tocaSpiTxt.destroy();
        this.tutoSpiTag.destroy();
        this.tutoSpiTxt.destroy();
        this.tutoSpiMarca.destroy();
        this.tutoSpiEne.destroy();
    }

    //Funcion para quitar las imagenes del juego
    Quitar(){
        this.pausa = 1;
        this.cartel.visible = false;
        this.cartelTxt.visible = false;
        this.tutoMons.visible = false;
        this.tutoMonsTag.visible = false;
        this.tutoMonsTxt.visible = false;
        this.tutoMonsBye.visible = false;
        this.tocaTxt.visible = false;
        this.tutoMonsMarca.visible = false;
        this.tutoMonsEne.visible = false;
        this.tutoMonsAlert.visible = false;
        this.tutoAlerTxt.visible = false;    
    }

    //Funcion para pausar el juego
    Pausa(){
        this.pausa = 0;
        this.reanudar.visible = true;
        this.pausar.visible = true;
        this.salir.visible = true;
    }

    QuitarPausa(){
        this.pausa = 1;
        this.reanudar.visible = false;
        this.pausar.visible = false;
        this.salir.visible = false;
    }
    
    QuitarSpi(){
        this.pausa = 1;
        this.cartel.visible = false;
        this.cartelTxt.visible = false;
        this.tutoSpi.visible = false;
        this.tutoSpiTag.visible = false;
        this.tutoSpiTxt.visible = false;
        this.tutoSpiBye.visible = false;
        this.tutoSpiMarca.visible = false;
        this.tutoSpiEne.visible = false;
        this.tocaSpiTxt.visible = false;
    }

    //Funcion para restar tiempo y pasar el turno cuando se acabe
    onSecond(){
        this.scoreTime = this.scoreTime - this.pausa;
        this.scoreTimeText.setText(this.scoreTime);
        if (this.scoreTime == 0 && this.scene.monsterMov > 0) {
            this.scene.monsterMov = 0;
        } else if (this.scoreTime == 0 && this.scene.spiritMov > 1) {
            this.scene.spiritMov = 1;
        } 
    }
}