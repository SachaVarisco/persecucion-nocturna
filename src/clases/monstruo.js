export class Monstruo{
    scene;
    monster;
    movimientos;
    casillaDisponible;
    oscuroFondo;
    audio1;
    recTemp;
    casillasMarcada;
    mar;
    constructor(scene){
        this.scene = scene;
        this.init();
    }
    

    init(){
        
        this.monster = this.scene.physics.add
        .sprite(this.scene.spawnPoint2.x, this.scene.spawnPoint2.y, "monstruo")
        .setCircle(120, -60, -40)
        .setDepth(2);

        this.oscuroFondo = this.scene.add
        .image(this.monster.x, this.monster.y, "luz")
        .setOrigin(0.495,0.5)
        .setDepth(2);

        
        this.audio1 = this.scene.sound.add('pasos');
        this.audio1.volume -= 0.5
        

        this.recTemp = [];
        this.casillaDisponible = [];
        this.casillasMarcada = [];

    

        this.scene.casillas.forEach((casilla) => {
            
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            this.scene.physics.add.overlap(
                this.monster,
                rectangulo2,
                (monster, rectangulo) => {
                    if (this.casillaDisponible.indexOf(rectangulo) === -1) {
                        this.casillaDisponible.push(rectangulo);
                        this.comprobarCasillas();
                    }
                    
                },
                null,
                this
            );
        });
    }

    update(){
        this.casillasMarcada.forEach(casilla => {
            //ternaria: es como un if pero de una sola linea
            casilla.alpha = (!this.monster.anims.isPlaying) ? 1 : 0;
        });
    }
    comprobarCasillas()
    {
        this.casillasMarcada.forEach(marca => {
            marca.destroy();
        });
        this.scene.casillas.forEach((casilla) => {
            
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65).setOrigin(1,.5);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            let casillaDisponibleIn = false
            this.casillaDisponible.forEach(c => {
                if (c.x == casilla.x && c.y == casilla.y)
                {
                    casillaDisponibleIn = true;
                }
            });
            if (casillaDisponibleIn) {
                this.casillasMarcada.push(
                    this.mar = this.scene.add.image(casilla.x, casilla.y, "marca").setDepth(1).setOrigin(1.5,0.5)
                );
            }

            rectangulo2.setInteractive().on("pointerdown", () => {    
                if (casillaDisponibleIn) {
                    this.scene.add.image()
                    if (!this.monster.anims.isPlaying && this.scene.monstermov > 0) {
                        this.scene.tweens.add({
                            targets: this.monster,
                            alpha: 1,
                            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                            duration: 1000,
                            repeat: 0, // -1: infinity
                            yoyo: false,
                            x: rectangulo2.body.position.x + rectangulo2.body.width/2,
                            y: rectangulo2.body.position.y,
                            onComplete: () => {
                                this.scene.monstermov --;
                                
                                this.casillaDisponible = [];
                                this.monster.anims.pause();
                                this.audio1.pause();
                                this.recTemp.forEach(rectangulosTemp => {
                                    rectangulosTemp.destroy();
                                });
                               // this.mar.visible = true;
                            },

                            //Se ejecuta durante el movimiento
                            onUpdate: () =>{
                                this.oscuroFondo.setX(this.monster.x);
                                this.oscuroFondo.setY(this.monster.y);
                            },
                            onStart: () => {
                                this.monster.anims.play("monstruocamina", true);
                                this.audio1.play();
                                
                               // this.mar.visible = false;
                                
                            },
                            
                        });
                        
                    }
                }
            });

            this.recTemp.push(rectangulo2);
            this.recTemp.push(rectangulo);

            
           

        },this);
    }
    romper(){
        this.casillasMarcada.forEach(marca => {
            marca.destroy();
        });
    }
    
}


