import { Button } from "../objects/button";

export default class MapScene extends Phaser.Scene {
    background: Phaser.GameObjects.Image;
    pointer: Phaser.Input.Pointer;
    label: Phaser.GameObjects.Text;
    

    constructor() {
        super({key: 'MapScene'});
    }

    create() {
        
        //we could look into when they click in certain of the map, the map will shift that direction and show more of the surrounding area
        //it would give the game a "bigger" feel to it. Possibly a custom tileSprite?

        this.background = this.add.image(0,0,'usmap'); //find a map background. 
        this.background.setOrigin(0,0); 
        this.background.setScale(.31);


        /**
         * we are using historical locations for our game so when creating our nodes
         * we set them to setInteractive so that we can drag them around and the mouse
         * coordinate is displayed in the top left so that we can easily find where
         * to set the buttons x and y locations in the final dev.
         */

        let nodeNY = new Button(this, 515, 100, 'reddot1')
        //this.input.setDraggable(nodeNY);
        nodeNY.onInputUp = () => {
          this.scene.start('HouseScene');
        }
        
        let nodeMI = new Button(this, 365,175, 'reddot1')
        //this.input.setDraggable(nodeMI);
        nodeMI.onInputUp = () => {
            this.scene.start('BoatScene');
        }

        let nodeCO = new Button(this, 263, 174, 'reddot1')//.setInteractive();
        //this.input.setDraggable(nodeCO);
        nodeCO.onInputUp = () => {
            this.scene.start('WagonScene');
        }

        let nodeCA = new Button(this, 35, 195, 'reddot1')//.setInteractive();
        //this.input.setDraggable(nodeCA);
        nodeCA.onInputUp = () => {
            this.scene.start('CaliScene');
        }

        

        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
    
        // });
        

        //Displays x and y position of the mouse. this is for development purposes.
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"'});
        this.label.setFill(255);
        this.pointer = this.input.activePointer;

    }

    update() {
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        //Could we store user information and update their score/progress/whatever to be displayed on the map screen?
    }

}