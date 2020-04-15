export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
<<<<<<< HEAD
    this.load.image("forest", "assets/beaver_game/BG.png");
    this.load.spritesheet("beaver", "assets/beaver_game/beaver-NESW.png", {frameWidth: 64, frameHeight: 64});
=======
    this.load.image("menuscreenbg", "c:/Users/User/Documents/CISC374/educational-game-project-team-9-kalloyan-s-adam-j/src/assets/images/menu_background.jpg");
>>>>>>> b5494a1d72da7565f51903d0c10bf91ac28d98b7
  }

  create() {
    this.scene.start('MenuScene');
    this.scene.start('MainScene');
  }
}
