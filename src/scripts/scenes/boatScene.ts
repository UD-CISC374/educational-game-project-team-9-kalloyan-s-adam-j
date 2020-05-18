import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class BoatScene extends Phaser.Scene {
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;
  private done: boolean = true;  

    constructor() {
        super({ key: 'BoatScene' });
      }

      create(){
        let background = this.add.image(0, 0, "boatscene");
        background.setOrigin(0,0);
        background.setScale(0.35);

        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("In order to continue our journey, we had to cross the Mississippi River.", true);
        this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
          this.stateOfScene = 1;
          this.box.destroy();// destroying the menu
        });
      }

      update(){
        if(this.stateOfScene === 1)
            this.scene.transition({
                target: 'Mississippi',
                duration: 1000
            });
    }

}