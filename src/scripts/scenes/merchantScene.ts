import HuntingScene from "./huntingScene";
import DialogBox from "../objects/dialogBox";
import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class MerchantScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private dad: Phaser.Physics.Arcade.Sprite;
  private buyer: Phaser.Physics.Arcade.Sprite;
  private beaverCount: number;
  private beavers: Phaser.Physics.Arcade.Group;
  private timer: Phaser.Time.TimerEvent;
  private moneyAmount: number;
  private coinIcon: Phaser.GameObjects.Image;
  private moneyText: Phaser.GameObjects.Text;
  private num: number;
  private box: InteractiveDialogBox;
  private stateOfScene: number = 0;
  private done: boolean = true;

  constructor() {
    super({ key: 'MerchantScene' });
  }

  init(data) {
    this.beaverCount = data.score;
  }

  create() {
    //adding the background to the scene
    this.background = this.add.image(0, 0, "logCabin");
    this.background.setOrigin(0, 0);
    this.background.setScale(.3, .24);

    //adding the Hudson Bay Company to the cabin
    let companyName = this.add.text(397, 160, "Hudson Bay\n Company", { font: "bold 15px Arial", fill: "#fff" });
    companyName.setOrigin(0.5, 0.5);
    companyName.setAlign("center");

    //adding the dad character
    this.dad = this.physics.add.sprite(450, 325, "dad");
    this.dad.setScale(.2);

    //adding the buyer character
    this.buyer = this.physics.add.sprite(350, 325, "buyer");
    this.buyer.setScale(.27);

    //this.box = new DialogBox(this, "After my dad's last hunt, we sold the furs.");
    this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
    this.box.setText("After my dad's last hunt, we sold the furs.", true);
    this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
      this.stateOfScene = 1;
      this.box.destroy();// destroying the menu
    });

    //adding the money count at the top left corner
    this.moneyAmount = 0;
    this.coinIcon = this.add.sprite(20, 12, 'coins', 3);
    this.coinIcon.setScale(.09);
    this.moneyText = this.add.text(this.coinIcon.displayWidth + 5, 5, "$0", { font: "20px", fill: "#000" });
    this.moneyText.setOrigin(0);

    //creating a group for the beavers that are thrown at the buyer
    this.beavers = this.physics.add.group({
      gravityY: 400
    });

    this.num = 0;

    //handler for when the beavers collide with the buyer
    this.physics.add.overlap(this.beavers, this.buyer, this.takeBeavers, undefined, this);
  }

  update() {
    if (this.stateOfScene === 1 && this.done) {
      this.done = false;
      //adding a timer to throw the beavers at certain intervals
      this.timer = this.time.addEvent({
        delay: 300,                // ms
        callback: this.spawnBeaver,
        callbackScope: this,
        loop: true
      });
      this.stateOfScene = 2;
    } else if (this.stateOfScene === 2) {
      //changing the x coordinate of the thrown beavers
      this.beavers.children.iterate(function (child) {
        if (child.x > 400)
          child.setVelocityY(-100);
        child.setVelocityX(-200);
      }.bind(this));
      //updating the text for the money count
      this.moneyText.text = "$" + this.moneyAmount;
    }
    else if (this.stateOfScene === 3 && this.done) {
      this.done = false;
      this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * .29, text: "NEXT" });
      this.box.setText("With $" + this.moneyAmount + " we began our journey west.", true);
      this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
        this.box.destroy();// destroying the menu
        this.scene.transition({
          target: 'TrainScene',
          duration: 1000
        });
      });
    }


  }

  spawnBeaver(): void {
    if (this.num < this.beaverCount) {
      this.num += 1;
      let beaver = this.physics.add.sprite(435, 340, "beaver", 3);
      beaver.setScale(.75);
      this.beavers.add(beaver);
    } else {
      this.timer.remove();
      this.done = true;
      this.stateOfScene = 3;
    }

  }

  //destroys the beavers and increases the money count
  takeBeavers(buyer, beaver): void {
    this.beavers.remove(beaver);
    beaver.destroy();
    this.moneyAmount += .75;
  }

}