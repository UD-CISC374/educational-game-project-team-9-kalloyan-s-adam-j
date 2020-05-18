export default class PreloadScene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("usmap", "./assets/images/usmap.jpg");
    this.load.image("reddot1", "./assets/images/reddot1.png");
    this.load.image("forest", "assets/beaver_game/BG.png");
    this.load.spritesheet("beaver", "assets/beaver_game/beaver-NESW.png", {frameWidth: 64, frameHeight: 64});
    this.load.image("deer", "assets/beaver_game/101-deer.png");
    this.load.image("skunk", "assets/beaver_game/101-skunk.png");
    this.load.image("menuscreenbg", "assets/images/menu_background.jpg");
    this.load.image("logCabin", "assets/trading_scene/LogCabin.png");
    this.load.image("dad", "assets/trading_scene/dad.png");
    this.load.image("buyer", "assets/trading_scene/buyer.png");
    this.load.image("coins", "assets/trading_scene/three_silver_coins.png");
    this.load.image("playButton", "./assets/images/playbutton.PNG");
    this.load.image("playButtonPress", "./assets/images/playbuttonpress.png");
    this.load.image("playButtonHover", "./assets/images/playbuttonhover.png");
    this.load.image("MississippiBG", "./assets/mississippi_game/MississippiBG.jpg");
    this.load.image("shipanim", "./assets/images/shipanim.gif");
    this.load.image("boat", "./assets/mississippi_game/boat.png");
    this.load.image("rock", "./assets/mississippi_game/rock.png");
    this.load.image("crate", "./assets/mississippi_game/crate.png");
    this.load.image("train", "assets/train_scene/train.png");
    this.load.image("house", "assets/farm_scene/houseonfire.png");
    this.load.image("heart", "assets/mississippi_game/heart.png");
    this.load.image("river", "assets/gold_game/river.png");
    this.load.image("gold", "assets/gold_game/gold.png");
    this.load.image("twig", "assets/gold_game/twig.png");
    this.load.image("pan", "assets/gold_game/pan.png");
    this.load.image("rock1", "assets/gold_game/rock1.png");
    this.load.image("rock2", "assets/gold_game/rock2.jpg");
    this.load.image("desert", "./assets/images/desert.jpg");
    this.load.image("snowM", "./assets/images/snowM.jpeg");
    this.load.image("woodhouse", "./assets/images/woodhouse.png");
    this.load.image("boatscene", "./assets/images/boatscene.png");
    this.load.image("woodsScene", "./assets/images/MandW.png");
    this.load.image("wagon", "./assets/images/wagon.png");
    this.load.image("cali", "./assets/images/cali.png");
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
