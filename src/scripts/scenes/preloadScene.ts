export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    this.load.image("menuscreenbg", "./assets/images/startscreen.jpg");
    this.load.image("playButton", "./assets/images/playbutton.PNG");
    this.load.image("forest", "assets/beaver_game/BG.png");
    this.load.spritesheet("beaver", "assets/beaver_game/beaver-NESW.png", {frameWidth: 64, frameHeight: 64});
    this.load.image("menuscreenbg", "c:/Users/User/Documents/CISC374/educational-game-project-team-9-kalloyan-s-adam-j/src/assets/images/menu_background.jpg");
    this.load.image("usmap", "./assets/images/usmap.jpg");
    this.load.image("reddot1", "./assets/images/reddot1.png");

  }

  create() {
    this.scene.start('MenuScene');

    /**
     * could we create separate functions for these that would load those images and the audio, etc..
     * for example, loadImagesMenu() would just load all the images for the menu, and then we would
     * have loadImagesBeaver() and it would load all the images for the beaver function. 
     */
  }
}
