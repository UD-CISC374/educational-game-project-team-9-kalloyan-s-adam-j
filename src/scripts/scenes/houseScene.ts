import DialogBox from "../objects/dialogBox";

export default class HouseScene extends Phaser.Scene {
    private box: DialogBox;   


    constructor() {
        super({ key: 'HouseScene' });
      }

    create(){
        let background = this.add.image(0, 0, "house");
        background.setOrigin(0,0);
        background.setScale(0.35);

        this.box = new DialogBox(this, "Hi, my name is Alex. I was only 7 years old when my family's home burned down. You see, my dad sold furs for a living, but with his work in decline, money was tight. filler");

        //this.scene.switch('MapScene');
        /*this.scene.transition({
            target:  'MapScene',
            duration: 10000
          });*/
    }

    update(){
        if(this.box.completedDialog() && this.box.getDialogCount() == 1){
            this.box.setText(this, "Our best hope was to search for a new opportunity. Word was there was gold in California, but we had to move fast.")
        }

        console.log("dialog num: " + this.box.getDialogCount());
        if(this.box.completedDialog() && this.box.getDialogCount() == 2)
            this.scene.transition({
                target: 'HuntingScene',
                duration: 1500
            });
    }
}