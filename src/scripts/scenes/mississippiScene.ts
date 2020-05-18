
import { Time } from '../util/time';
import InteractiveDialogBox from "../objects/interactiveDialogBox";
import { Scene } from 'phaser';

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
  private stateOfGame: number = 0;
  private box: InteractiveDialogBox;


  constructor() {
    super({ key: 'Mississippi' });
  }

  create() {

    //sets the background image and size
    this.background = this.add.tileSprite(0, 0, 0, 0, "MississippiBG");
    this.background.setOrigin(0, 0);
    this.background.setScale(1, .6);

    //player
    this.player = this.physics.add.sprite(this.scale.width / 2 - 8, this.scale.height - 64, "boat");
    this.player.setScale(.25, .25);
    this.player.setSize(5, 95);
    this.player.setOffset(116, 65);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.input1 = this.input;

    //"health" of the ship
    this.heart1 = this.add.sprite(this.scale.width - 22, 5, "heart");
    this.heart1.setOrigin(0, 0);
    this.heart2 = this.add.sprite(this.scale.width - 44, 5, "heart");
    this.heart2.setOrigin(0, 0);
    this.heart3 = this.add.sprite(this.scale.width - 66, 5, "heart");
    this.heart3.setOrigin(0, 0);

    //adding obstacles the player needs to avoid
    this.rockstacles = this.physics.add.group();
    let rock1 = this.physics.add.sprite(200, 250, "rock");
    rock1.setScale(.9);
    rock1.setSize(88, 72);//setSize and setOffset are used to change the size of the hit box of the object
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
    this.rockstacles.addMultiple([rock1, rock2, rock3, rock4]);

    //collision detection between the boat and rocks
    this.physics.add.overlap(this.player, this.rockstacles, this.rockCollide, undefined, this);
    
    //adding any menus needed throughout the game - tutorial menu, restart game menu, etc.
    //in this particular instance, it is the tutorial menu
    this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * 2 / 3, text: "PLAY" });
    this.box._setText("WOW!! That is some strong wind!\n\nMove the mouse to avoid the obstacles and get the family safely across the river.\n\nDurability of the ship is tracked in the upper right corner.\n\n\nBe careful and good luck!");
    this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
      this.stateOfGame = 1; //state to play the actual game
      this.startPoint = Time.getTimer(); //starting the clock of the game
      this.box.destroy();// destroying the menu
    });
    
  }
  update() {
    //game state
    if (this.stateOfGame === 1) {
      //during runtime of the game
      if (Time.getTimer() - this.startPoint < 10000 && this.numOfCollisions < 3) {
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
      } 
      //after the player successfully finishes the game in that alloted time without losing all life
      else if (Time.getTimer() - this.startPoint >= 10000 && this.numOfCollisions < 3) {
        this.background.tilePositionY -= 0;
        this.timer = this.time.addEvent({
          delay: 800,                // ms
          callback: this.destroyRock,
          callbackScope: this,
          loop: true
        });
        this.numOfCollisions = 4; //changed the value of the variable, so this portion of code only runs once
      }
    }
    //code run when the player crashes 3 times before the time is up
    else if (this.stateOfGame === 2) {
      this.timer = this.time.addEvent({
        delay: 1000,                // ms
        callback: this.restartMenu,
        callbackScope: this,
        loop: false
      });
      this.stateOfGame = 3;
    }


  }

  restartMenu(): void {
      this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * 2 / 3, text: "RESTART" });
      this.box.getInteractiveText().on('pointerdown', () => {
        this.scene.switch("MapScene");
      });
  
  }

  destroyRock(): void {
    this.rockstacles.getChildren()[0].destroy();
    if (this.count === 3) {
      this.timer.destroy();
      this.scene.transition({
        target: 'WoodsScene',
        duration: 1000,
      });
    }
    this.count++;

  }

  toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }

  rockCollide(player, rock) {
    this.numOfCollisions += 1;
    if (this.numOfCollisions == 1)
      this.heart3.destroy();
    else if (this.numOfCollisions == 2)
      this.heart2.destroy();
    else if (this.numOfCollisions == 3) {
      this.heart1.destroy();
      this.stateOfGame = 2;
    }

    player.disableBody();
    player.disableInteractive();
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
        player.setInteractive();

      }
    });
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

}