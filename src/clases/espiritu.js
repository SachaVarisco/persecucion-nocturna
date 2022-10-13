export class Espiritu{
    scene;
    spirit;
    movimientos;
    constructor(scene){
        this.scene = scene;
        this.init();
    }

    init(){
        this.spirit = this.scene.physics.add
        .sprite(this.scene.spawnPoint.x, this.scene.spawnPoint.y, "espiritu")
        .setCircle(110, -60, -40)
        .setOrigin(0.25, 0.5);
       
       

        let casillaspirit = [];

        this.scene.casillas.forEach((casilla) => {
            let salida = this.scene.add.rectangle(this.scene.cuevas.x, this.scene.cuevas.y, 85, 58);
            let salida2 = this.scene.physics.add.existing(salida);
           
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);
            
            rectangulo2.setInteractive().on("pointerdown", () => {
                if (casillaspirit.indexOf(rectangulo2) !== -1) {
                    if (!this.spirit.anims.isPlaying && this.scene.turno == 1) {
                    this.scene.tweens.add({
                            targets: this.spirit,
                            alpha: 1,
                            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                            duration: 1000,
                            repeat: 0, // -1: infinity
                            yoyo: false,
                            x: rectangulo2.body.position.x,
                            y: rectangulo2.body.position.y,

                        
                            onComplete: () => {
                                casillaspirit = [];
                                this.spirit.anims.pause();
                                this.scene.spiritmov --;
                                console.log(this.scene.spiritmov);
                               // this.scene.audio1.pause();  

                            },
                            
                            onStart: () => {
                                this.spirit.anims.play("espiritucamina", true);
                               // this.scene.audio1.play();
                            },
                        });
                    }
                }
            });
            
            this.scene.physics.add.overlap(
                this.spirit,
                rectangulo2,
                (spirit, rectangulo) => {
                    if (casillaspirit.indexOf(rectangulo) === -1) {
                        casillaspirit.push(rectangulo);
                        console.log(rectangulo);
                    }
                    
                },
                null,
                this
            );
            this.scene.physics.add.overlap(
                this.spirit,
                salida2, 
                (spi) => { this.scene.victory = true
                    //this.scene.audio3.pause()
                
            }, null, this)
        },this);


    }


}