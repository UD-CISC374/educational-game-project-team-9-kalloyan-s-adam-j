export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    this.load.image("menuscreenbg", "./assets/images/menu_background.jpg");
<<<<<<< HEAD
    this.load.image("playButton", "./assets/images/playbutton.PNG");
    this.load.image("playButtonPress", "./assets/images/playbuttonpress.png");
    this.load.image("playButtonHover", "./assets/images/playbuttonhover.png");
=======
    this.load.image("forest", "assets/beaver_game/BG.png");
    this.load.spritesheet("beaver", "assets/beaver_game/beaver-NESW.png", {frameWidth: 64, frameHeight: 64});
    this.load.image("menuscreenbg", "c:/Users/User/Documents/CISC374/educational-game-project-team-9-kalloyan-s-adam-j/src/assets/images/menu_background.jpg");

>>>>>>> ead6df98db18a610050662fe64298a1b927b7896
  }

  create() {
    this.scene.start('MenuScene');
  }
}
