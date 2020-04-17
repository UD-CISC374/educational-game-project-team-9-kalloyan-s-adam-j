export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("forest", "assets/beaver_game/BG.png");
    this.load.spritesheet("beaver", "assets/beaver_game/beaver-NESW.png", {frameWidth: 64, frameHeight: 64});
    this.load.image("deer", "assets/beaver_game/101-deer.png");
    this.load.image("skunk", "assets/beaver_game/101-skunk.png");
    this.load.image("menuscreenbg", "assets/images/menu_background.jpg");
    this.load.image("playButton", "./assets/images/playbutton.PNG");
    this.load.image("playButtonPress", "./assets/images/playbuttonpress.png");
    this.load.image("playButtonHover", "./assets/images/playbuttonhover.png");
  }

  create() {
    let frameNames= this.anims.generateFrameNumbers('beaver', {frames: [3, 4, 5]});
      this.anims.create({
        key: 'beaverEast',
        frames: frameNames,
        frameRate: 8,
        repeat: -1
    });
    let frameNames2= this.anims.generateFrameNumbers('beaver', {frames: [9, 10, 11]});
      this.anims.create({
        key: 'beaverWest',
        frames: frameNames2,
        frameRate: 8,
        repeat: -1
    });
    this.scene.start('MenuScene');

   
  }
}
