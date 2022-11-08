import { sharedInstance as events } from '../scenes/EventCenter'
import {ALARM} from '../enums/data'

export class Espiritu{
    scene;
    spirit;
    movimientos;
    casillaspirit;

    audio1;

    salida2;
    recTemp;

    casillasMarcada;

    constructor(scene){
        this.scene = scene;
        this.init();
        
    }
   
    init(){
        
        //creo el espiritu
        this.spirit = this.scene.physics.add
        .sprite(this.scene.spawnPoint.x, this.scene.spawnPoint.y, "espiritu")
        .setCircle(110, -60, -40)
        .setDepth(2);
        this.audio1 = this.scene.sound.add('pasos');
        this.audio1.volume -= 0.8
       
        //creo arrays
        this.recTemp = [];
        this.casillaspirit = [];
        this.casillasMarcada = [];

        //Creo los rectangulos con los que va a interactuar el espiritu
        this.scene.casillas.forEach((casilla) => {
            let salida = this.scene.add.rectangle(this.scene.cuevas.x, this.scene.cuevas.y, 85, 58);
            this.salida2 = this.scene.physics.add.existing(salida);
           
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            //Overlap marca la interaccion entre el espiritu y las casillas
            this.scene.physics.add.overlap(
                this.spirit,
                rectangulo2,
                (spirit, rectangulo) => {
                    if (this.casillaspirit.indexOf(rectangulo) === -1) {
                        //Pusheo las casillas al array de casillasspirit
                        this.casillaspirit.push(rectangulo);
                        this.comprobarCasillas();
                       
                    }
                    
                },
                null,
                this
            );
            
        },this);
    }

    //Agrego una función que va a llamarse en el update del gameplay
    update(){
        this.casillasMarcada.forEach(casilla => {
            //Ternaria: es como un if pero de una sola linea
            casilla.alpha = (!this.spirit.anims.isPlaying) ? 1 : 0;
        });
    }

    //Funcion para obligar a que se guarden las casilas 
    comprobarCasillas() {
        this.casillasMarcada.forEach(marca => {
            marca.destroy();
        });
        this.scene.casillas.forEach((casilla) => {

            
            //le agrego hitbox a las casillas
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            //variable para corroborar la posicion de las casillas
            let casillaspiritIn = false
            this.casillaspirit.forEach(c => {
                if (c.x == casilla.x && c.y == casilla.y)
                {
                    casillaspiritIn = true;
                    
                }
            });
            if (casillaspiritIn) {
                this.casillasMarcada.push(
                    this.scene.add.image(casilla.x, casilla.y, "marca").setDepth(1).setOrigin(1.5,0.5)
                );
            }
            //le agrego la interactividad a las casillas
            rectangulo2.setInteractive().on("pointerdown", () => {
        
                
                if (casillaspiritIn) {
                   
                    // Movimiento de personaje
                    if (!this.spirit.anims.isPlaying && this.scene.spiritmov > 0) {
                        //si las casillas tienen una propiedad entra al if
                        if (casilla.properties) {
                            //especifico la propiedad que va a buscar
                            let soundProp = casilla.properties.find(p => p.name == "sound")
                            
                            //console.log("carga la alarma", ALARM[soundProp.value])                            
                            const alarma = ALARM[soundProp.value];
                            events.emit('alerta-activada', alarma)
                            
                            
                        }

                        this.scene.tweens.add({
                            targets: this.spirit,
                            alpha: 1,
                            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                            duration: 1000,
                            repeat: 0, // -1: infinity
                            yoyo: false,
                            x: rectangulo2.body.position.x+20,
                            y: rectangulo2.body.position.y,
    
                            //se ejecuta al final del movimiento
                            onComplete: () => {
                                this.casillaspirit = [];
                                this.spirit.anims.pause();
                                this.scene.spiritmov --;
                                this.scene.spiritmov1 --;
                                this.audio1.pause();  
                                //destruyo las casillas viejas
                                this.recTemp.forEach(rectangulosTemp => {
                                    rectangulosTemp.destroy();
                                });
    
                            },
                            //se ejecuta al pricipio del movimiento
                            onStart: () => {
                                this.spirit.anims.play("espiritucamina", true);
                                this.audio1.play();
                                
                            },
                        });
                    }
                }
            });
            //Pusheo las casillas al array de recTemp
            this.recTemp.push(rectangulo2);
            this.recTemp.push(rectangulo);

            //overlap entre el espiritu y la cueva
            this.scene.physics.add.overlap(
                this.spirit,
                this.salida2, 
                (spi) => { this.scene.victory = true
                    //this.scene.audio3.pause();
                }, null, this)


        },this);

       
    
    }

}