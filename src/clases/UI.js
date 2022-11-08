import { EN_US, ES_AR } from '../enums/lenguages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'

export class UI{
    

    constructor(scene){
        this.scene = scene;
        this.Inicio();
    }
    Inicio(){
        this.scene.add.image(1200, 70, "timer").setDepth(6);

        this.scene.add.image(600, 70, "energia").setDepth(6);
        if (this.scene.monstermov > 0) {
            this.energiaText = this.scene.add.text(650, 30, this.scene.monstermov, {
           
                fontSize: "90px",
                fill: "#000",
                fontFamily:'Prueba2',
            }).setDepth(7);
        }
        //Cartel de paso de turno
        this.cartel = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "Turno").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(4);
        this.cartel.visible = false;
        this.cartelTxt = this.scene.add.text(550, 320, getPhrase('Tu turno terminó. Pásale el teléfono al siguiente jugador.'),{fontSize: "80px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 1000 }, aling:'center'}).setDepth(5)
        this.cartelTxt.visible = false; 

        //Tutorial del monstruo
        this.tutomons = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "TutoMons").setInteractive().on("pointerdown", ()=> this.Quitar()).setDepth(8);
        this.tutomonsTag = this.scene.add.text(520, 340, getPhrase('Mamá Monstruo'), {fontSize: "70px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutomonsTxt = this.scene.add.text(550,525, getPhrase('Buenas noches querido, hoy toca cazar otra vez. Tu objetivo es encontrar a los espíritus que se esconden en la oscuridad y evitar que lleguen a la cueva.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold', wordWrap: { width: 1350 }}).setDepth(9);
        this.tutomonsBye = this.scene.add.text(550,930, getPhrase('Te di 20$ para la gaseosa, buena suerte.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutomonsMarca = this.scene.add.text(550, 750, getPhrase('Toca las casillas marcadas para moverte.'), {fontSize: "50px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutomonsEne = this.scene.add.text(550,830,getPhrase('Cada movimiento cuesta 1 de energía.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);

        //Tutorial del espiritu
        this.tutospi = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "TutoSpi").setInteractive().on("pointerdown", ()=> this.QuitarSpi()).setDepth(8);
        this.tutospi.visible = false;
        this.tutospiTag = this.scene.add.text(680, 290, getPhrase('Árbol Ancestral'),  {fontSize: "70px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutospiTag.visible = false;
        this.tutospiTxt = this.scene.add.text(100,450, getPhrase('Un monstruo esta cazando a los espíritus del bosque, ten cuidado de que no te atrape. Tu objetivo es llegar a la cueva, en la casilla superior izquierda del mapa.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold', wordWrap: { width: 1200 }}).setDepth(9);
        this.tutospiTxt.visible = false;
        this.tutospiBye = this.scene.add.text(100,950, getPhrase('Buena suerte, aléjate de los monstruos.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutospiBye.visible = false;
        this.tutospiMarca = this.scene.add.text(100, 770, getPhrase('Toca las casillas marcadas para moverte.'), {fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutospiMarca.visible = false;
        this.tutospiEne = this.scene.add.text(100,850,getPhrase('Cada movimiento cuesta 1 de energía.'),{fontSize: "55px", fill: "#000", fontFamily:'Prueba2',fontStyle: 'bold'}).setDepth(9);
        this.tutospiEne.visible = false;

        //Toca para continuar
        this.tocaTxt = this.scene.add.text(1100,20, getPhrase('Toca la pantalla para continuar.'), {fontSize: "60px", fill: "#fff", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 500 } }).setDepth(9)
        this.tocaspiTxt = this.scene.add.text(320,20, getPhrase('Toca la pantalla para continuar.'), {fontSize: "60px", fill: "#fff", fontFamily:'Prueba2',fontStyle: 'bold',wordWrap: { width: 500 } }).setDepth(9)
        this.tocaspiTxt.visible = false;

        //Boton y pantalla de pausa
        this.scene.add.image(1800, 70, "pausa").setInteractive().on("pointerdown", ()=>this.Pausa()).setDepth(3);
        this.pausar = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, "fondoPausa").setDepth(5);
        this.salir = this.scene.add.text(850, 470, getPhrase('Salir'),{ fontSize: "130px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(3).setInteractive().on("pointerdown", ()=>this.scene.scene.start("MainMenu", this.scene.audio3.pause())).setDepth(5);
        this.reanudar = this.scene.add.text(700, 260, getPhrase('Reanudar'),{ fontSize: "150px", fill: "#000", fontFamily:'Prueba',fontStyle: 'bold'}).setAngle(-5).setInteractive().on("pointerdown", ()=> this.QuitarPausa()).setDepth(5);
        this.pausar.visible = false;
        this.reanudar.visible = false;
        this.salir.visible = false;


    }
    update(){
        if (this.scene.turno == 0) {
            this.energiaText.text = this.scene.monstermov.toString();
        }else{
            this.energiaText.text = this.scene.spiritmov1.toString();
            this.scene.monster.romper();
        }
    }

   

    //Hace visible el tutorial del espiritu.
    Tutospi(){
        this.pausa = 0;
        this.tutospi.visible = true;
        this.tutospiTag.visible = true;
        this.tutospiTxt.visible = true;
        this.tocaspiTxt.visible = true;
        this.tutospiBye.visible = true;
        this.tutospiMarca.visible = true;
        this.tutospiEne.visible = true;

        this.cartel.visible = true;
        this.cartelTxt.visible = true;
    }

    Destruir(){
        this.tutospiBye.destroy();
        this.tutospi.destroy();
        this.tocaspiTxt.destroy();
        this.tutospiTag.destroy();
        this.tutospiTxt.destroy();
        this.tutospiMarca.destroy();
        this.tutospiEne.destroy();
    }

    //Funcion para quitar las imagenes del juego
    Quitar(){
        this.scene.pausa = 1;
        this.cartel.visible = false;
        this.cartelTxt.visible = false;

        this.tutomons.visible = false;
        this.tutomonsTag.visible = false;
        this.tutomonsTxt.visible = false;
        this.tutomonsBye.visible = false;
        this.tocaTxt.visible = false;
        this.tutomonsMarca.visible = false;
        this.tutomonsEne.visible = false;
        
    }

    //Funcion para pausar el juego
    Pausa(){
        this.scene.pausa = 0;
        this.reanudar.visible = true;
        this.pausar.visible = true;
        this.salir.visible = true;
    }

    QuitarPausa(){
        this.scene.pausa = 1;
        this.reanudar.visible = false;
        this.pausar.visible = false;
        this.salir.visible = false;
    }
    
    QuitarSpi(){
        this.scene.pausa = 1;
        
        this.cartel.visible = false;
        this.cartelTxt.visible = false;

        this.tutospi.visible = false;
        this.tutospiTag.visible = false;
        this.tutospiTxt.visible = false;
        this.tutospiBye.visible = false;
        this.tutospiMarca.visible = false;
        this.tutospiEne.visible = false;
        this.tocaspiTxt.visible = false;
    }
}
