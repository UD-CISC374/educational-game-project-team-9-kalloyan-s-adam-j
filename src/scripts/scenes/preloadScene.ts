export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("menuscreenbg", "./assets/images/menu_background.jpg");
    this.load.image("playButton", "./assets/images/playbutton.PNG");
    this.load.image("playButtonPress", "./assets/images/playbuttonpress.png");
    this.load.image("playButtonHover", "./assets/images/playbuttonhover.png");
  }

  create() {
    this.scene.start('MenuScene');
  }
}
