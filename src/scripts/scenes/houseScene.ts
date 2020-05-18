import DialogBox from "../objects/dialogBox";
import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class HouseScene extends Phaser.Scene {
    private box: InteractiveDialogBox;
    private stateOfScene: number = 0;
    private done: boolean = true;

    constructor() {
        super({ key: 'HouseScene' });
    }

    create() {
        let background = this.add.image(0, 0, "house");
        background.setOrigin(0, 0);
        background.setScale(0.35);

        this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
        this.box.setText("Hi, my name is Alex. In 1848, when I was only 7 years old, my family's home in New York burned down. My dad sold furs for a living, but with his work in decline, money was tight.", true);
        this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
            this.stateOfScene = 1;
            this.box.destroy();// destroying the menu
        });
    }

    update() {
        if (this.stateOfScene === 1 && this.done) {
            this.done = false;
            this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
            this.box.setText("We needed a new opportunity and heard there was gold in the newly acquired state, California, but we had to move fast.", true);
            this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
                this.stateOfScene = 2;
                this.done = true;
                this.box.destroy();// destroying the menu
                this.scene.transition({
                    target: 'HuntingScene',
                    duration: 1000
                });
            });
        }
    }
}