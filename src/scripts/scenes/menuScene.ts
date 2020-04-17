import { Button } from "../objects/button";

export default class MenuScene extends Phaser.Scene {
    background: Phaser.GameObjects.Image;
    
  
    constructor() {
      super({ key: 'MenuScene' });
    }
  
    create() {
        //adding menu screen background
        this.background = this.add.image(0,0,"menuscreenbg");
        this.background.setOrigin(0,0);

        const actionOnClick = () => {
          console.log('click')
        }

        let btn1 = new Button(this, 200, 250, 'playButton', actionOnClick)
        btn1.onInputUp = () => {
          this.scene.start('MainScene');
        }
        btn1.setOrigin(0)

        //Create a title image

        //any animation for title?

        //any sound for menu?
    }
  
    update() {
    }
  }