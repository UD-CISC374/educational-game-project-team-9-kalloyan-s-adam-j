export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("menuscreenbg", "c:/Users/User/Documents/CISC374/educational-game-project-team-9-kalloyan-s-adam-j/src/assets/images/menu_background.jpg");
  }

  create() {
    this.scene.start('MenuScene');
    this.scene.start('MainScene');
  }
}
