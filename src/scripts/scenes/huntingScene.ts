export default class HuntingScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private beaver: Phaser.Physics.Arcade.Sprite;
    private beavers: Phaser.Physics.Arcade.Group;
  
    constructor() {
      super({ key: 'HuntingScene' });
    }
  
    create() {
      this.background = this.add.tileSprite(0, 0, 1926, 1081, "forest");
      this.background.setOrigin(0, 0);
      this.background.setScale(.37, .37);

      
      this.beavers = this.physics.add.group({
        allowGravity:false
      });

      for (let i = 0; i < 25; i++){
        this.beaver = this.physics.add.sprite(this.randomBeaverX(), this.randomBeaverY(), 'beaver', this.randomBeaverFrame());
        //this.beaver = this.add.sprite(this.randomBeaverX(), this.randomBeaverY(), 'beaver');
        this.beaver.setScale(.75);
        //this.beaver.play(this.randomBeaverAnimation());
        this.beavers.add(this.beaver);
      }
      this.physics.add.overlap(this.beavers, this.beavers, this.changeBeaverLocation, undefined, this);
      //this.beaver.setAngle(330);
    }
  
    update() {
      this.background.tilePositionX += 5;
      console.log(this.background.tilePositionX);
      /*this.beaver.x -= 1.85;
      console.log(this.beaver.x);*/
      this.beavers.children.iterate(function(child){
        //child.play(randomBeaverAnimation());
        child.x -= 1.85;
      }.bind(this));
    }

    randomBeaverFrame():number{
      let randomNum = Math.floor(Math.random() * 2);
      if(randomNum === 0)
        return 3;
      else return 9;
    }

    randomBeaverY():number{
      return Math.floor(Math.random() * 40) + 305;
    }

    randomBeaverX():number{
      return Math.floor(Math.random() * 4000);
    }

    randomBeaverAnimation():string{
      let randomNum = Math.floor(Math.random() * 2);
      if(randomNum === 0)
        return 'beaverEast';
      else return 'beaverWest';
    }

    changeBeaverLocation(beaver1, beaver2):void{
      beaver1.x = this.randomBeaverX();
      beaver1.y = this.randomBeaverY();

    }
}