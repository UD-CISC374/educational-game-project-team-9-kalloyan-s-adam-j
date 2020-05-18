import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class WoodsScene extends Phaser.Scene {
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;
  private done: boolean = true; 

    constructor() {
        super({ key: 'WoodsScene' });
      }

      create(){
        let background = this.add.image(0, 0, "woodsScene");
        background.setOrigin(0,0);
        background.setScale(0.35);

        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("After we crossed the Mississippi River, we traveled for days with nothing but the wilderness surrounding us.", true);
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