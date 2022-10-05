class Monstruo{
    monster;
    movimientos;
    constructor(scene){
        this.scene = scene;
        this.init();
    }

    init(){
        this.monster = this.scene.physics.add
        .sprite(this.scene.spawnPoint2.x, this.scene.spawnPoint2.y, "monstruo")
        .setCircle(120, -60, -40)
        

        this.oscuroFondo = this.scene.add
        .image(this.monster.x, this.monster.y, "luz")
        .setOrigin(0.495,0.5);

        let casillaDisponible = [];
        
        
       
        this.scene.casillas.forEach((casilla) => {
            let rectangulo = this.scene.add.rectangle(casilla.x, casilla.y, 85, 65);
            let rectangulo2 = this.scene.physics.add.existing(rectangulo);

            rectangulo2.setInteractive().on("pointerdown", () => {
                if (casillaDisponible.indexOf(rectangulo2) !== -1) {
                    if (!this.monster.anims.isPlaying && this.scene.oscuroFondo == 0) {
                        this.scene.tweens.add({
                            targets: this.monster,
                            alpha: 1,
                            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                            duration: 1000,
                            repeat: 0, // -1: infinity
                            yoyo: false,
                            x: rectangulo2.body.position.x,
                            y: rectangulo2.body.position.y,
                            onComplete: () => {
                                casillaDisponible = [];
                                this.monster.anims.pause();
                                this.scene.audio1.pause();
                            },
                            onUpdate: () =>{
                                this.oscuroFondo.setX(this.monster.x);
                                this.oscuroFondo.setY(this.monster.y);
                            }
                            onStart: () => {
                                this.monster.anims.play("monstruocamina", true);
                                this.scene.audio1.play();
                                
                            },
                            
                        });
                        
                    }
                }
            });

            this.scene.physics.add.overlap(
                this.monster,
                rectangulo2,
                (monster, rectangulo) => {
                    if (casillaDisponible.indexOf(rectangulo) === -1) {
                        casillaDisponible.push(rectangulo);
                        console.log(rectangulo);
                    }
                    
                },
                null,
                this
            );
           
            this.scene.physics.add.overlap(
                this.monster,
                this.scene.spirit, 
                 (mos) => { this.scene.gameOver = true
                    this.scene.audio3.pause()
                
            }, null, this)
        },this);

    }



    
}


