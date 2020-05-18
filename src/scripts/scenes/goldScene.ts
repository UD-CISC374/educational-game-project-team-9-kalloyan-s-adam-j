import { Time } from '../util/time';
import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class GoldScene extends Phaser.Scene {
  private pan: Phaser.Physics.Arcade.Sprite;
  private box: InteractiveDialogBox;
  private stateOfGame: number;
  private startPoint: number;
  private gold: Phaser.Physics.Arcade.Group;
  private trash: Phaser.Physics.Arcade.Group;
  private moneyAmount: number = 0;
  private coinIcon: Phaser.GameObjects.Sprite;
  private moneyText: Phaser.GameObjects.Text;
  private timer: Phaser.Time.TimerEvent;
  private allObjects: Phaser.Physics.Arcade.Group;
  private count: number = 0;
  private complete: boolean = false; 

  constructor() {
    super({ key: 'GoldScene' });
  }

  create() {
    //background
    let background = this.add.image(0, 0, "river");
    background.setOrigin(0, 0);
    background.setScale(.35); //1.35

    //pan
    this.pan = this.physics.add.sprite(this.scale.width - 64, this.scale.height / 2 + 20, "pan");
    this.pan.setScale(.08);
    this.pan.setSize(380, 545);
    this.pan.setOffset(205, 115);

    let gold1 = this.physics.add.sprite(100, 300, "gold");
    gold1.setScale(.1);
    let gold2 = this.physics.add.sprite(250, 350, "gold");
    gold2.setScale(.1);
    let gold3 = this.physics.add.sprite(400, 225, "gold");
    gold3.setScale(.1);
    this.gold = this.physics.add.group();
    this.gold.addMultiple([gold1, gold2, gold3]);

    let rock1 = this.physics.add.sprite(150, 225, "rock1");
    rock1.setScale(.1);
    let rock2 = this.physics.add.sprite(20, 320, "rock1");
    rock2.setScale(.1);
    let rock3 = this.physics.add.sprite(450, 325, "rock1");
    rock3.setScale(.1);

    let twig1 = this.physics.add.sprite(190, 375, "twig");
    twig1.setScale(.25);
    let twig2 = this.physics.add.sprite(325, 300, "twig");
    twig2.setScale(.25);
    this.trash = this.physics.add.group();
    this.trash.addMultiple([rock1, rock2, rock3, twig1, twig2]);

    this.allObjects = this.physics.add.group();
    this.allObjects.addMultiple([gold1, gold2, gold3, rock1, rock2, rock3, twig1, twig2]);

    this.physics.add.overlap(this.pan, this.gold, this.goldCollide, undefined, this);
    this.physics.add.overlap(this.pan, this.trash, this.trashCollide, undefined, this);

    //adding the money count at the top left corner
    this.coinIcon = this.add.sprite(20, 12, 'coins', 3);
    this.coinIcon.setScale(.09);
    this.moneyText = this.add.text(this.coinIcon.displayWidth + 5, 5, "$.00", { font: "20px", fill: "#000" });
    this.moneyText.setOrigin(0);

    this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * 2 / 3, text: "PLAY" });
    this.box._setText("Move the pan in order to collect as much gold as you can by using the mouse.\n\nOther debris slows you down, so watch out!");
    this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
      this.stateOfGame = 1; //state to play the actual game
      this.startPoint = Time.getTimer(); //starting the clock of the game
      this.box.destroy();// destroying the menu
    });
  }

  update() {
    if (this.stateOfGame === 1) {
      if (Time.getTimer() - this.startPoint <= 60000) {
        if (this.pan.y < this.input.y + 5 && this.pan.y > this.input.y - 5) {
          this.physics.moveTo(this.pan, this.pan.x, this.input.y, 0);
        } else if (this.input.y < 218 && this.pan.y >= 218) {
          this.physics.moveTo(this.pan, this.pan.x, 218, 200);
        } else if (this.input.y < 218 && this.pan.y < 218) {
          this.physics.moveTo(this.pan, this.pan.x, 218, 0);
        } else {
          this.physics.moveTo(this.pan, this.pan.x, this.input.y, 200);
        }

        for (let i = 0; i < this.gold.getChildren().length; i++) {
          let goldOre = this.gold.getChildren()[i];
          this.moveObject(goldOre, 1.85);
        }
        for (let i = 0; i < this.trash.getChildren().length; i++) {
          let object = this.trash.getChildren()[i];
          this.moveObject(object, 1.85);
        }
        this.moneyText.text = "$" + this.moneyAmount;
      }
      else if(Time.getTimer() - this.startPoint > 60000 && this.complete === false){
        this.complete = true;
        this.timer = this.time.addEvent({
          delay: 400,                // ms
          callback: this.destroyObjects,
          callbackScope: this,
          loop: true
        });
      }
    }
  }

  destroyObjects(): void {
    this.allObjects.getChildren()[0].destroy();
    if (this.count === 7) {
      this.timer.destroy();
      this.scene.start('StoreScene', {dollars: this.moneyAmount});
    }
    this.count++;

  }

  moveObject(object, speed): void {
    object.x += speed;
    if (object.x > this.scale.width) {
      this.resetObjectPos(object);
    }
  }

  resetObjectPos(object): void {
    object.body.enable = true;
    object.visible = true;
    object.x = 0;
    let randomY: number = Phaser.Math.Between(218, 390);
    object.y = randomY;
  }

  goldCollide(pan, gold) {
    gold.disableBody();
    gold.visible = false;
    this.moneyAmount += Math.floor(Math.random() * (26 - 18) + 18);
  }

  trashCollide(pan, trash) {
    trash.disableBody();
    trash.visible = false;
    pan.disableBody();

    this.tweens.add({
      targets: pan,
      ease: 'Sine.easeInOut',
      duration: 600,
      alpha: 0.2,
      yoyo: true,
      repeat: 0,
      // Make her go back to her starting position
      //x: player.x,
      //y: player.y,
      // Reenable collisions
      onComplete: () => {
        pan.body.enable = true;
        //pan.setInteractive();

      }
    });
  }
}