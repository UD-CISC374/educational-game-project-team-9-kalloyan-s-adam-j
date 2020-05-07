
export default class Mississippi extends Phaser.Scene {
  private background: Phaser.GameObjects.TileSprite;
  private player: Phaser.Physics.Arcade.Sprite;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  
  rockstacles: Phaser.Physics.Arcade.Group;
  crates: Phaser.Physics.Arcade.Group;
  instructionText: Phaser.GameObjects.Text;
  score = 0;
  scoreText: Phaser.GameObjects.Text;
  crateIcon: Phaser.GameObjects.Sprite;
  gameWonText: Phaser.GameObjects.Text;
  
  constructor() {
      super({ key: 'Mississippi' });
      }

  create() {

      //sets the background image and size
      this.background = this.add.tileSprite(0, 0, 0, 0, "MississippiBG");
      this.background.setOrigin(0, 0);
      this.background.setScale(1, .6);

      //score and instructions
      this.instructionText = this.add.text(this.scale.width / 8, this.scale.height / 4, "Avoid the rocks and collect the lost crates!", 
        {font: "bold 24px Arial", fill: "#000"});
      this.time.delayedCall(1000, () => {
          // And then fade it out :)
          this.tweens.add({
              targets: this.instructionText,
              duration: 500,
              alpha: 0,
              onComplete: () => this.instructionText.destroy()
          });
      })
      this.crateIcon = this.add.sprite(30,20,"crate");
      this.crateIcon.setScale(.5);
      this.scoreText = this.add.text(this.crateIcon.displayWidth + 10, 10, "00", {font: "20px", fill: "#000"});
      this.scoreText.setOrigin(0);
      //player
      this.player = this.physics.add.sprite(this.scale.width/2 - 8, this.scale.height - 64, "boat");
      this.player.setScale(.25,.25);
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);

      //adding crates to pick up
      this.crates = this.physics.add.group();
      var maxCrate = 5;
      for( var i = 0; i < maxCrate; i++) {
        let crate = this.physics.add.sprite(0,0,"crate");
        crate.setInteractive();
        this.crates.add(crate);
        crate.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
      }
      

      //adding obstacles the player needs to avoid
      this.rockstacles = this.physics.add.group();
      var maxRock = 6;
      for (var i = 0; i < maxRock; i++) {
        let rock = this.physics.add.sprite(0,0,"rock");
        rock.setInteractive();
        this.rockstacles.add(rock);
        rock.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
      }

      this.physics.add.overlap(this.player, this.rockstacles, this.rockCollide, undefined, this);
      this.physics.add.overlap(this.player,this.crates, this.cratePickup, undefined, this);

  }
  update() {

      
      this.background.tilePositionY += 3;
      this.movePlayerManager();
      this.moveRock(this.crates,3);

      
      
  } 

  movePlayerManager() {

    if (this.cursorKeys.up) {
      this.player.setVelocityY(-25);
      this.player.setVelocityX(0);
    }
    if(this.cursorKeys.left?.isDown){
        this.player.setVelocityX(-100);
        this.player.setRotation(.78);
      } 
      else if(this.cursorKeys.right?.isDown){
        this.player.setVelocityX(100);
        this.player.setRotation(-.78);
      }
  
      if(this.cursorKeys.up?.isDown){
        this.player.setVelocityY(-100);
        this.player.setRotation(3);
      }
      else if(this.cursorKeys.down?.isDown){
        this.player.setVelocityY(100);
        this.player.setRotation(0);
      }
    }

  rockCollide(player,rock) {
    player.disableBody();
    player.setInteractive(false);
    rock.disableBody(true,true);
    
    this.tweens.add({
      targets: player,
      ease: 'Linear',
      duration: 200,
      repeat: 0,
      // Make her spin
      angle: {start: 0, to: 360},
      // Make her go back to her starting position
      x: player.x,
      y: player.y,
      // Reenable collisions
      onComplete: ()=> {
          player.body.enable = true;
          player.setInteractive(true);

      }
    });
  }

  cratePickup(player,crate) {
    crate.disableBody(true,true);
    this.score += 1;
    this.scoreText.setText(this.score.toString());
    if (this.score == 5) {
      this.gameWon();
    }
  }

  moveRock(gameObject,speed) {
    gameObject.y -= .1;
    if(gameObject.y < 0) {
      this.resetRockPos(gameObject);
    }
  }

  resetRockPos(gameObject) {
    gameObject.y = this.game.scale.height;
    var randomX = Phaser.Math.Between(200,400);
    gameObject.x = randomX;
  }

  zeroPad(number, size){
    let stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
  
  gameWon() {
    this.gameWonText = this.add.text(this.scale.width / 9, this.scale.height / 4, "Great job, you saved your cargo!", 
        {font: "bold 35px Arial", fill: "#000"});
    this.time.delayedCall(1000, () => {
      // And then fade it out :)
      this.tweens.add({
          targets: this.instructionText,
          duration: 750,
          alpha: 0,
          onComplete: () => {
            this.instructionText.destroy();
            this.scene.start('MapScene');
          }
      });
    })
  }
}