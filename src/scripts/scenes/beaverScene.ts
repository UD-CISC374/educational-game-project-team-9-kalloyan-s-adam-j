import InteractiveDialogBox from "../objects/interactiveDialogBox";

export default class BeaverScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private beaverScore: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private beaverIcon: Phaser.GameObjects.Sprite;
  private animals: Phaser.GameObjects.Group;
  private timer: Phaser.Time.TimerEvent;
  private box: InteractiveDialogBox;
  private stateOfGame: number = 0;
  private done: boolean = true;
  private count: number = 0;

  constructor() {
    super({ key: 'BeaverScene' });
  }

  create() {
    //setting the background of the game
    this.background = this.add.image(0, 0, "forest");
    this.background.setOrigin(0, 0);
    this.background.setScale(.37);

    //adding the score at the top left corner
    this.beaverScore = 0;
    this.beaverIcon = this.add.sprite(20, 5, 'beaver', 3);
    this.beaverIcon.setScale(.5);
    this.scoreText = this.add.text(this.beaverIcon.displayWidth + 5, 5, "00", { font: "20px", fill: "#000" });
    this.scoreText.setOrigin(0);

    this.animals = this.add.group();

    this.box = new InteractiveDialogBox({ scene: this, width: this.scale.width * 2 / 3, height: this.scale.height * 2 / 3, text: "PLAY" });
    this.box._setText("Alex's dad is hunting for beavers. Click on them to help him cature them.\n\nBe careful not to alert the other animals or you risk scaring the beavers away.");
    this.box.getInteractiveText().on('pointerdown', () => { //when the button is clicked on the menu
      this.stateOfGame = 1; //state to play the actual game
      this.box.destroy();// destroying the menu
    });
    
  }

  update() {
    if (this.stateOfGame === 1 && this.done) {
      this.done = false;
      this.timer = this.time.addEvent({
        delay: 1500,                // ms
        callback: this.spawnAnimals,
        callbackScope: this,
        loop: true
      });
    }else if(this.stateOfGame === 2 && this.done){
      this.done = false;
      this.scene.start('MerchantScene', {score: this.beaverScore});
    }
  }

  spawnAnimals(): void {
    for (let i = 0; i < 4; i++) {
      let randomNum = Math.floor(Math.random() * 4);
      if (randomNum == 0 || randomNum == 1) {
        let beaver = this.add.sprite(this.randomX(), this.randomY(), 'beaver', this.randomBeaverFrame());
        beaver.setScale(.75);
        beaver.setInteractive();
        beaver.on('pointerdown', () => {
          this.captureBeaver(beaver);
        });
        this.animals.add(beaver);
      } else if (randomNum == 2) {
        let deer = this.add.sprite(this.randomX(), this.randomY(), 'deer');
        deer.setScale(.15);
        deer.flipX = this.trueOrFalse();
        deer.setInteractive();
        deer.on('pointerdown', () => {
          this.scareAnimals();
          deer.destroy();
        });
        this.animals.add(deer);
      } else if (randomNum == 3) {
        let skunk = this.add.sprite(this.randomX(), this.randomY(), 'skunk');
        skunk.setScale(.1);
        skunk.flipX = this.trueOrFalse(); //determining if the animal should face east or west
        skunk.setInteractive();
        skunk.on('pointerdown', () => {
          this.scareAnimals();
          skunk.destroy();
        });
        this.animals.add(skunk);
      }
    }
    if (this.animals.getChildren().length > 0)
      this.scareAnimals();

    if(this.count === 17){
      this.done = true;
      this.stateOfGame = 2;
      this.timer.remove();
    }
    this.count++;
  }

  scareAnimals(): void {
    for (let i = 0; i < this.animals.getChildren().length; i++) {
      this.animals.getChildren()[i].destroy();
    }
  }

  //function to determine which beaver frame to use from the sprite sheet
  randomBeaverFrame(): number {
    let randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0)
      return 3;
    else return 9;
  }

  //function to return a random y coordinate for the animals
  randomY(): number {
    return Math.floor(Math.random() * 40) + 305;
  }

  //function to return a random x coordinate for the animals
  randomX(): number {
    return Math.floor(Math.random() * 500 + 50);
  }

  //destroying a beaver when it is clicked
  captureBeaver(beaver): void {
    beaver.destroy();
    this.beaverScore += 1;
    this.scoreText.text = this.zeroPad(this.beaverScore, 2);
  }

  //function that randomly returns true or false
  trueOrFalse(): boolean {
    let num = Math.floor(Math.random() * 2);
    if (num === 0)
      return true;
    else
      return false;
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
}