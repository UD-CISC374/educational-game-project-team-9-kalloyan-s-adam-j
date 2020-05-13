
import { Time } from '../util/time';

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
  private input1: Phaser.Input.InputPlugin;
  private numOfCollisions: number = 0;
  private heart1: Phaser.GameObjects.Sprite;
  private heart2: Phaser.GameObjects.Sprite;
  private heart3: Phaser.GameObjects.Sprite;
  private startPoint: number;
  private count: number = 0;
  private timer: Phaser.Time.TimerEvent;

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
      { font: "bold 24px Arial", fill: "#000" });
    this.time.delayedCall(1000, () => {
      // And then fade it out :)
      this.tweens.add({
        targets: this.instructionText,
        duration: 500,
        alpha: 0,
        onComplete: () => this.instructionText.destroy()
      });
    })
    this.crateIcon = this.add.sprite(30, 20, "crate");
    this.crateIcon.setScale(.5);
    this.scoreText = this.add.text(this.crateIcon.displayWidth + 10, 10, "00", { font: "20px", fill: "#000" });
    this.scoreText.setOrigin(0);
    //player
    this.player = this.physics.add.sprite(this.scale.width / 2 - 8, this.scale.height - 64, "boat");
    this.player.setScale(.25, .25);
    this.player.setSize(5, 95);
    this.player.setOffset(116, 65);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.input1 = this.input;

    this.heart1 = this.add.sprite(this.scale.width - 22, 5, "heart");
    this.heart1.setOrigin(0, 0);
    this.heart2 = this.add.sprite(this.scale.width - 44, 5, "heart");
    this.heart2.setOrigin(0, 0);
    this.heart3 = this.add.sprite(this.scale.width - 66, 5, "heart");
    this.heart3.setOrigin(0, 0);
    /*
    //adding crates to pick up
    this.crates = this.physics.add.group();
    var maxCrate = 5;
    for( var i = 0; i < maxCrate; i++) {
      let crate = this.physics.add.sprite(0,0,"crate");
      crate.setInteractive();
      this.crates.add(crate);
      crate.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
    }*/

    //adding obstacles the player needs to avoid

    this.rockstacles = this.physics.add.group();
    let rock1 = this.physics.add.sprite(200, 250, "rock");
    rock1.setScale(.9);
    rock1.setSize(88, 72);
    rock1.setOffset(5, 5);
    let rock2 = this.physics.add.sprite(225, 0, "rock");
    rock2.setScale(.9);
    rock2.setSize(88, 72);
    rock2.setOffset(5, 5);
    let rock3 = this.physics.add.sprite(350, 75, "rock");
    rock3.setScale(.9);
    rock3.setSize(88, 72);
    rock3.setOffset(5, 5);
    let rock4 = this.physics.add.sprite(390, 160, "rock");
    rock4.setScale(.9);
    rock4.setSize(88, 72);
    rock4.setOffset(5, 5);
    //let rock5 = this.physics.add.sprite(400, 130, "rock");
    this.rockstacles.addMultiple([rock1, rock2, rock3, rock4]);
    /*let maxRock: number = 6;
    for (var i = 0; i < maxRock; i++) {
      let rock = this.physics.add.sprite(0,0,"rock");
      //rock.setInteractive();
      this.rockstacles.add(rock);
      rock.setRandomPosition(100,0,this.game.scale.width-300, this.game.scale.height);
    }*/

    this.physics.add.overlap(this.player, this.rockstacles, this.rockCollide, undefined, this);
    this.physics.add.overlap(this.player, this.crates, this.cratePickup, undefined, this);

    this.startPoint = Time.getTimer();

  }
  update() {
    //angle between mouse and ball
    if (Time.getTimer() - this.startPoint <= 10000 && this.numOfCollisions < 3) {
      this.background.tilePositionY -= 2;
      for (let i = 0; i < this.rockstacles.getChildren().length; i++) {
        let rock = this.rockstacles.getChildren()[i];
        this.moveRock(rock, 1.85);
      }
      if (this.player.body.enable) {
        let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input1.x, this.input1.y);
        if (Math.round(this.toDegrees(angle - Math.PI / 2)) < 90 && Math.round(this.toDegrees(angle - Math.PI / 2)) > 0)
          this.player.angle = 90;
        else if (Math.round(this.toDegrees(angle - Math.PI / 2)) > -90 && Math.round(this.toDegrees(angle - Math.PI / 2)) <= 0)
          this.player.angle = -90;
        else
          this.player.angle = Math.round(this.toDegrees(angle - Math.PI / 2));

        //console.log("player.x: " + this.player.angle);
        //console.log("input.x: " + this.input1.x);
        if (this.player.x < this.input1.x + 3 && this.player.x > this.input1.x - 3) {
          this.physics.moveTo(this.player, this.input1.x, this.player.y, 0);
        } else {
          this.physics.moveTo(this.player, this.input1.x, this.player.y, 100);
        }
      }
    } else if(Time.getTimer() - this.startPoint >= 10000 && this.numOfCollisions < 3){
      //this.movePlayerManager();
      //this.moveRock(this.crates,3);
      /*this.rockstacles.children.iterate(function(child){
        //child.play(randomBeaverAnimation());
        this.moveRock()
      }.bind(this));*/
      //this.rockstacles.children.iterate(this.moveRock);

      console.log("time: " + this.startPoint);
      //if (Time.getTimer() - this.startPoint >= 10000 && this.numOfCollisions < 3) {
        this.background.tilePositionY -= 0;
        this.timer = this.time.addEvent({
          delay: 800,                // ms
          callback: this.destroyRock,
          callbackScope: this,
          loop: true
        });
        this.numOfCollisions = 4;
      //}
    }

  }

  destroyRock(): void {
    this.rockstacles.getChildren()[0].destroy();
    

    if (this.count === 3) {
      this.timer.destroy();
      this.scene.transition({
        target: 'MapScene',
        duration: 1000,
      });
    }
    this.count++;

  }

  toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }

  movePlayerManager() {

    if (this.cursorKeys.up) {
      this.player.setVelocityY(-25);
      this.player.setVelocityX(0);
    }
    if (this.cursorKeys.left?.isDown) {
      this.player.setVelocityX(-100);
      this.player.setRotation(.78);
    }
    else if (this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(100);
      this.player.setRotation(-.78);
    }

    if (this.cursorKeys.up?.isDown) {
      this.player.setVelocityY(-100);
      this.player.setRotation(3);
    }
    else if (this.cursorKeys.down?.isDown) {
      this.player.setVelocityY(100);
      this.player.setRotation(0);
    }
  }

  rockCollide(player, rock) {
    this.numOfCollisions += 1;
    if (this.numOfCollisions == 1)
      this.heart3.destroy();
    else if (this.numOfCollisions == 2)
      this.heart2.destroy();
    else if (this.numOfCollisions == 3)
      this.heart1.destroy();
    player.disableBody();
    player.setInteractive(false);
    rock.disableBody();
    //this.resetRockPos(rock);
    rock.visible = false;
    this.tweens.add({
      targets: player,
      ease: 'Linear',
      duration: 300,
      repeat: 0,
      // Make her spin
      angle: { start: 0, to: 360 },
      // Make her go back to her starting position
      x: player.x,
      y: player.y,
      // Reenable collisions
      onComplete: () => {
        player.body.enable = true;
        player.setInteractive(true);


      }
    });
  }

  cratePickup(player, crate) {
    crate.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText(this.score.toString());
    if (this.score == 5) {
      this.gameWon();
    }
  }

  moveRock(rock, speed) {
    rock.y += speed;
    if (rock.y > 400) {
      this.resetRockPos(rock);
    }
  }

  resetRockPos(rock) {
    rock.body.enable = true;
    rock.visible = true;
    rock.y = 0;
    let randomX: number = Phaser.Math.Between(200, 400);
    rock.x = randomX;
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  gameWon() {
    this.gameWonText = this.add.text(this.scale.width / 9, this.scale.height / 4, "Great job, you saved your cargo!",
      { font: "bold 35px Arial", fill: "#000" });
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