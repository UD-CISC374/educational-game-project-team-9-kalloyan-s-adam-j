
export default class Mississippi extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private player: Phaser.Physics.Arcade.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  
  rockstacles: Phaser.Physics.Arcade.Group;
  crates: Phaser.Physics.Arcade.Group;
  
  constructor() {
      super({ key: 'Mississippi' });
      }

  create() {
      //sets the background image and size
      this.background = this.add.tileSprite(0, 0, 0, 0, "MississippiBG");
      this.background.setOrigin(0, 0);
      this.background.setScale(1, .6);

      //player
      this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "boat");
      this.player.setScale(.25,.25);
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);

      //adding crates to pick up
      this.crates = this.physics.add.group();
      var maxCrate = 5;
      for( var i = 0; i < maxCrate; i++) {
        var crate = this.physics.add.sprite(0,0,"crate");
        this.crates.add(crate);
        crate.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
        crate.setVelocityY(-15);
      }
      

      //adding obstacles the player needs to avoid
      this.rockstacles = this.physics.add.group();
      var maxRock = 10;
      for (var i = 0; i < maxRock; i++) {
        var rock = this.physics.add.sprite(0,0,"rock");
        this.rockstacles.add(rock);
        rock.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
        rock.setVelocityY(-20);
      }

      this.physics.add.collider(this.player, this.rockstacles, this.rockCollide);
      this.physics.add.overlap(this.player,this.crates, this.cratePickup);

  }
  update() {

      
      this.background.tilePositionY += 3;
      this.movePlayerManager();
      
      
  } 

  movePlayerManager() {

    if (this.cursorKeys.up) {
      this.player.setVelocityY(-25);
      this.player.setVelocityX(0);
    }
    if(this.cursorKeys.left?.isDown){
        this.player.setVelocityX(-100);
      } 
      else if(this.cursorKeys.right?.isDown){
        this.player.setVelocityX(100);
      }
  
      if(this.cursorKeys.up?.isDown){
        this.player.setVelocityY(-100);
      }
      else if(this.cursorKeys.down?.isDown){
        this.player.setVelocityY(100);
      }
    }

  rockCollide(player,rock) {
    rock.disableBody();
  }

  cratePickup(player,crate) {
    crate.disableBody(true,true);
  }
}