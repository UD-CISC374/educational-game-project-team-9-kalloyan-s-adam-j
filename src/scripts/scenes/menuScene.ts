export default class MenuScene extends Phaser.Scene {
    background: Phaser.GameObjects.Image;
    
  
    constructor() {
      super({ key: 'MenuScene' });
    }
  
    create() {
        //adding menu screen background
        this.background = this.add.image(0,0,"menuscreenbg");
        this.background.setOrigin(0,0);
        
    }
  
    update() {
    }
  }