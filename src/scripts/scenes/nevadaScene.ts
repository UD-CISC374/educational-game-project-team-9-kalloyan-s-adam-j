import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class NevadaScene extends Phaser.Scene {
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;

    constructor() {
        super({ key: 'NevadaScene' });
      }

      create(){
        let background = this.add.image(0, 0, "desert");
        background.setOrigin(0,0);
        background.setScale(1.3);

        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("...and the scorching desert of Neveda.", true);
        this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
          this.stateOfScene = 1;
          this.box.destroy();// destroying the menu
        });
      }

      update(){
        if(this.stateOfScene === 1)
            this.scene.transition({
                target: 'MapScene',
                duration: 1000
            });
    }

}