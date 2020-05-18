import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class CaliScene extends Phaser.Scene {
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;

  constructor() {
    super({ key: 'CaliScene' });
  }

  create() {
    let background = this.add.image(0, 0, "cali");
    background.setOrigin(0, 0);
    background.setScale(.35);

    this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
    this.box.setText("Before finally reaching the beautiful state of California. The journey was about 2500 miles and took nearly 7 months, but we made it. All that was left was to find gold.", true);
    this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
      this.stateOfScene = 1;
      this.box.destroy();// destroying the menu
    });
  }

  update() {
    if (this.stateOfScene === 1)
      this.scene.transition({
        target: 'GoldScene',
        duration: 1000
      });
  }

}