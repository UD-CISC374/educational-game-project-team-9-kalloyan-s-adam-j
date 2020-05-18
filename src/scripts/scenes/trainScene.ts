import DialogBox from "../objects/dialogBox";
import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class TrainScene extends Phaser.Scene {
    private box: InteractiveDialogBox;
  private stateOfScene: number = 0;
  private done: boolean = true;   


    constructor() {
        super({ key: 'TrainScene' });
      }

    create(){
        let background = this.add.image(0, 0, "train");
        background.setOrigin(0,0);
        background.setScale(0.35);

        //this.box = new DialogBox(this, "Our next move was to get to Illinios. So we took the train. Boy was I excited!");
        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("We traveled about 700 miles in order to get to Illinios. Part of the trip was on a train and boy was that exciting! I had never been on a train before.", true);
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