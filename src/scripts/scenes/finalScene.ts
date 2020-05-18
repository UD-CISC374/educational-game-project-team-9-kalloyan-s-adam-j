import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class FinalScene extends Phaser.Scene {
    private option: number;
    private box: InteractiveDialogBox;
    private stateOfScene: number;
    private done: boolean = true;

    constructor() {
        super({ key: 'FinalScene' });
      }

      init(data) {
        this.option = data.option;
      }

      create(){
          if(this.option === 1){
            let background = this.add.image(0, 0, "option1");
            background.setOrigin(0,0);
            background.setScale(.35);
          }else if(this.option === 2){
            let background = this.add.image(0, 0, "woodhouse");
            background.setOrigin(0,0);
            background.setScale(.35);
          }else if(this.option === 3){
            let background = this.add.image(0, 0, "option3");
            background.setOrigin(0,0);
            background.setScale(.35);
          }

          this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("After 7 long and grueling months, my family and I made it. Our journey was a success and with the money we earned, we happily settled down on a large plot of land.", true);
        this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
          this.stateOfScene = 1;
          this.box.destroy();// destroying the menu
        });
      }

      update(){
        if (this.stateOfScene === 1 && this.done) {
          this.done = false;
            this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
            this.box.setText("Thank you for listening to my story! Goodbye.", true);
            this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
                this.box.destroy();// destroying the menu
                this.scene.transition({
                    target: 'MenuScene',
                    duration: 1000
                });
            });
        }
      }

}