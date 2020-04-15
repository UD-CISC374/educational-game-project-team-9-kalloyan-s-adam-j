export default class HuntingScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private beaver: Phaser.GameObjects.Sprite;
  
    constructor() {
      super({ key: 'HuntingScene' });
    }
  
    create() {
      this.background = this.add.tileSprite(0, 0, 1926, 1081, "forest");
      this.background.setOrigin(0, 0);
      this.background.setScale(.37, .37);

      var frameNames= this.anims.generateFrameNumbers('beaver', {frames: [3]});
      this.anims.create({
        key: 'beaver',
        frames: frameNames,
        frameRate: 8,
        repeat: -1
    });
      this.beaver = this.add.sprite(1000, 300, 'beaver', 3);
      this.beaver.setScale(.75);
      this.beaver.setAngle(330);
      //this.beaver.frame = 0;
      //this.beaver.play('beaver');
    }
  
    update() {
      this.background.tilePositionX += 5;
      this.beaver.x = this.background.tilePositionX;
    }
}