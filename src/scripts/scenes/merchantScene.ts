import HuntingScene from "./huntingScene";
import DialogBox from "../objects/dialogBox";

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

    constructor() {
      super({ key: 'MerchantScene' });
    }

    init(data){
      this.beaverCount = data.score;
    }
  
    create() {
      //adding the background to the scene
      this.background = this.add.image(0, 0, "logCabin");
      this.background.setOrigin(0,0);
      this.background.setScale(.3, .24);

      //adding the Hudson Bay Company to the cabin
      let companyName = this.add.text(397, 160, "Hudson Bay\n Company", {font: "bold 15px Arial", fill: "#fff"});
      companyName.setOrigin(0.5, 0.5);
      companyName.setAlign("center");

      //adding the dad character
      this.dad = this.physics.add.sprite(450, 325, "dad");
      this.dad.setScale(.2);

      //adding the buyer character
      this.buyer = this.physics.add.sprite(350, 325, "buyer");
      this.buyer.setScale(.27);

      let box = new DialogBox(this, "My dad sold the beaver furs, so we could get enough money for the journey.");

      //adding the money count at the top left corner
      this.moneyAmount = 0;
      this.coinIcon = this.add.sprite(20, 12, 'coins', 3);
      this.coinIcon.setScale(.09);
      this.moneyText = this.add.text(this.coinIcon.displayWidth + 5, 5, "$.00", {font: "20px", fill: "#000"});
      this.moneyText.setOrigin(0);

      //creating a group for the beavers that are thrown at the buyer
      this.beavers = this.physics.add.group({
        gravityY:400
      });

      //adding a timer to throw the beavers at certain intervals
      this.timer = this.time.addEvent({
        delay: 500,                // ms
        callback: this.spawnBeaver,
        callbackScope: this,
        repeat: this.beaverCount - 1
    });
    //handler for when the beavers collide with the buyer
    this.physics.add.overlap(this.beavers, this.buyer, this.takeBeavers, undefined, this);
    }
  
    update() {
      //changing the x coordinate of the thrown beavers
      this.beavers.children.iterate(function(child){
        if(child.x > 400)
          child.setVelocityY(-100);
        child.setVelocityX(-200);
      }.bind(this));
      //updating the text for the money count
      this.moneyText.text = "$" + this.moneyAmount;
    }

    //creates the beavers and adds them to the beavers group
    spawnBeaver():void {
      let beaver = this.physics.add.sprite(435, 340, "beaver", 3);
      beaver.setScale(.75);
      /*let points = [ 50, 400, 200, 200, 350, 300, 500, 500, 700, 400 ];
      let curve = new Phaser.Curves.Spline(points);
      let path = this.add.path(445, 325);
      let curve = new Phaser.Curves.Line([445, 325, 400, 300]);
      let curve2 = new Phaser.Curves.Line([400, 300, 350, 325]);
      path.add(curve);
      path.add(curve2);
      let graphics = this.add.graphics();

      graphics.lineStyle(3, 0xffffff, 1);
  
      path.draw(graphics, 128);
      let beaver = this.add.follower(path, 445, 325, "beaver", 3);
      beaver.startFollow(4000);*/
      this.beavers.add(beaver);
    }

    //destroys the beavers and increases the money count
    takeBeavers(buyer, beaver):void{
      beaver.destroy();
      this.moneyAmount += .75;
    }
  }