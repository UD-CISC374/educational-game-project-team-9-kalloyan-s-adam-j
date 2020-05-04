import DialogBox from "../objects/dialogBox";

export default class TrainScene extends Phaser.Scene {
    private box: DialogBox;   


    constructor() {
        super({ key: 'TrainScene' });
      }

    create(){
        let background = this.add.image(0, 0, "train");
        background.setOrigin(0,0);
        background.setScale(0.35);

        this.box = new DialogBox(this, "Our next move was to get to Illinios. So we took the train. Boy was I excited!");

        //this.scene.switch('MapScene');
        /*this.scene.transition({
            target:  'MapScene',
            duration: 10000
          });*/
    }

    update(){
        if(this.box.completedDialog())
            this.scene.transition({
                target: 'MapScene',
                duration: 1500
            });
    }
}