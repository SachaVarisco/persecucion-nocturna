export class Espiritu{
    scene;
    spirit;
    movimientos;
    casillaspirit;
    audio1;
    salida2;
    recTemp;
    constructor(scene){
        this.scene = scene;
        this.init();
        
    }
   
    init(){
        console.log(this.scene.turno);

        this.spirit = this.scene.physics.add
        .sprite(this.scene.spawnPoint.x, this.scene.spawnPoint.y, "espiritu")
        .setCircle(110, -60, -40)
        .setOrigin(0.25, 0.5);
        this.audio1 = this.scene.sound.add('pasos');
        this.audio1.volume -= 0.8
       
        this.recTemp = [];
        this.casillaspirit = [];

        this.scene.casillas.forEach((casilla) => {
            let salida = this.scene.add.rectangle(this.scene.cuevas.x, this.scene.cuevas.y, 85, 58);
            this.salida2 = this.scene.physics.add.existing(salida);
           
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);
            
            this.scene.physics.add.overlap(
                this.spirit,
                rectangulo2,
                (spirit, rectangulo) => {
                    if (this.casillaspirit.indexOf(rectangulo) === -1) {
                        this.casillaspirit.push(rectangulo);
                        this.comprobarCasillas();
                       
                    }
                    
                },
                null,
                this
            );
            
        },this);
    }
    update(){
        this.comprobarCasillas();
    }
    comprobarCasillas() {
        this.scene.casillas.forEach((casilla) => {
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            let casillaspiritIn = false
            this.casillaspirit.forEach(c => {
                if (c.x == casilla.x && c.y == casilla.y)
                {
                    casillaspiritIn = true;
                    
                }
            });


            rectangulo2.setInteractive().on("pointerdown", () => {
                console.log("aaaaa");
                if (casillaspiritIn) {
                    
                    if (!this.spirit.anims.isPlaying && this.scene.spiritmov > 0) {
                        
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
                                this.casillaspirit = [];
                                this.spirit.anims.pause();
                                this.scene.spiritmov --;
                                console.log(this.scene.spiritmov);
                                this.audio1.pause();  
                                this.recTemp.forEach(rectangulosTemp => {
                                    rectangulosTemp.destroy();
                                });
    
                            },
                            
                            onStart: () => {
                                this.spirit.anims.play("espiritucamina", true);
                                this.audio1.play();
                            },
                        });
                    }
                }
            });
            
            this.recTemp.push(rectangulo2);
            this.recTemp.push(rectangulo);

            this.scene.physics.add.overlap(
                this.spirit,
                this.salida2, 
                (spi) => { this.scene.victory = true
                    this.scene.audio3.pause()
                
            }, null, this)


        },this);

       
    
    }

}