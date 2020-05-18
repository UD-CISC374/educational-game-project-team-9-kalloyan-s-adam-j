import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class WagonScene extends Phaser.Scene {
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;
  private done: boolean = true; 

    constructor() {
        super({ key: 'WagonScene' });
      }

      create(){
        let background = this.add.image(0, 0, "woodhouse");
        background.setOrigin(0,0);
        background.setScale(0.35);

        let wagon = this.add.sprite(350, 300, "wagon");
        wagon.setScale(.5);

        //adding the dad character
        let dad = this.physics.add.sprite(275, 340, "dad");
        dad.setScale(.25);

        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("Fortunately for us, after about 3 weeks, we came across a squatter named Thomas. A squatter is someone who doesn't legally own the land, but still occupies it.", true);
        this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
          this.stateOfScene = 1;
          this.box.destroy();// destroying the menu
        });
      }

      update(){
        if (this.stateOfScene === 1 && this.done) {
          this.done = false;
            this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
            this.box.setText("The wheel on Thomas' wagon was broken, so my dad helped him repair it. Feeling the need to repay us, Thomas gave us 2 of his finest horses for our journey.", true);
            this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
                this.box.destroy();// destroying the menu
                this.scene.transition({
                    target: 'ColoradoScene',
                    duration: 1000
                });
            });
        }
      }



}