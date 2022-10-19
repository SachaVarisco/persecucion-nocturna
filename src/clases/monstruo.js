export class Monstruo{
    scene;
    monster;
    movimientos;
    casillaDisponible;
    oscuroFondo;
    audio1;
    constructor(scene){
        this.scene = scene;
        this.init();
    }
    
    update(){
        if (this.scene.turno == 0) {
            this.oscuroFondo.visible = true;
        } else {
            this.oscuroFondo.visible = false;
        }
    }

    init(){
        
        this.monster = this.scene.physics.add
        .sprite(this.scene.spawnPoint2.x, this.scene.spawnPoint2.y, "monstruo")
        .setCircle(120, -60, -40);

        this.oscuroFondo = this.scene.add
        .image(this.monster.x, this.monster.y, "luz")
        .setOrigin(0.495,0.5);

        
        this.audio1 = this.scene.sound.add('pasos');
        this.audio1.volume -= 0.5
        

        
        this.casillaDisponible = [];
    

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


    comprobarCasillas()
    {
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

            rectangulo2.setInteractive().on("pointerdown", () => {    
                if (casillaDisponibleIn) {
                    
                    if (!this.monster.anims.isPlaying && this.scene.turno == 0) {
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
                            },
                            onUpdate: () =>{
                                this.oscuroFondo.setX(this.monster.x);
                                this.oscuroFondo.setY(this.monster.y);
                            },
                            onStart: () => {
                                this.monster.anims.play("monstruocamina", true);
                                this.audio1.play();
                                
                            },
                            
                        });
                        
                    }
                }
            });

            

            
           
            this.scene.physics.add.overlap(
                this.monster,
                this.scene.spirit, 
                 (mos) => { this.scene.gameOver = true
                    this.scene.audio3.pause()
                
            }, null, this)
        },this);
    }
    
}


