export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("menuscreenbg", "./assets/images/menu_background.jpg");
  }

  create() {
    this.scene.start('MenuScene');
    //this.scene.start('MainScene');
  }
}
