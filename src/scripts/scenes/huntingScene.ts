export default class HuntingScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private tutorialBeaver: Phaser.GameObjects.Sprite;
    private beavers: Phaser.Physics.Arcade.Group;
    private deers: Phaser.Physics.Arcade.Group;
    private skunks: Phaser.Physics.Arcade.Group;
    private startPoint: number;
    private tutorialText: Phaser.GameObjects.Text;
    beaverScore: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private beaverIcon: Phaser.GameObjects.Sprite;
  
    constructor() {
      super({ key: 'HuntingScene' });
    }
  
    create() {
      //setting the background of the game
      this.background = this.add.tileSprite(0, 0, 1926 , 1081, "forest");
      this.background.setOrigin(0, 0);
      this.background.setScale(.37, .37);

      //adding the text and image for the tutorial
      this.tutorialText = this.add.text(this.scale.width / 2, this.scale.height / 4, "Click on the             to capture them", {font: "bold 24px Arial", fill: "#000"});
      this.tutorialText.setOrigin(0.5, 0.5);
      this.tutorialBeaver = this.add.sprite(this.scale.width / 2 - 20, this.scale.height / 4 - 20, 'beaver', 3);

      //adding the score at the top left corner
      this.beaverScore = 0;
      this.beaverIcon = this.add.sprite(20, 5, 'beaver', 3);
      this.beaverIcon.setScale(.5);
      this.scoreText = this.add.text(this.beaverIcon.displayWidth + 5, 5, "00", {font: "20px", fill: "#000"});
      this.scoreText.setOrigin(0);
      

      //creating the various animal groups and disabling their gravity
      this.beavers = this.physics.add.group({
        allowGravity:false
      });

      this.deers = this.physics.add.group({
        allowGravity: false
      });

      this.skunks = this.physics.add.group({
        allowGravity: false
      });

      //adding individual animals to their respective groups
      for(let i = 0; i < 2; i++){
        let skunk = this.physics.add.sprite(this.randomX(), this.randomY(), 'skunk');
        skunk.setScale(.1);
        skunk.flipX = this.trueOrFalse(); //determining if the animal should face east or west
        this.skunks.add(skunk);
      }

      for(let i = 0; i < 6; i++){
        let deer = this.physics.add.sprite(this.randomX(), this.randomY(), 'deer');
        deer.setScale(.15);
        deer.flipX = this.trueOrFalse();
        this.deers.add(deer);
      }

      for (let i = 0; i < 20; i++){
         let beaver = this.physics.add.sprite(this.randomX(), this.randomY(), 'beaver', this.randomBeaverFrame());
        //this.beaver = this.add.sprite(this.randomBeaverX(), this.randomBeaverY(), 'beaver');
        beaver.setScale(.75);
        //this.beaver.play(this.randomBeaverAnimation());
        beaver.setInteractive();
        this.beavers.add(beaver);
      }

      this.input.on('gameobjectdown', this.captureBeaver, this);

      //code for handling what to do when animals spawn on top of each other
      this.physics.add.overlap(this.beavers, this.beavers, this.changeAnimalLocation, undefined, this);
      this.physics.add.overlap(this.beavers, this.deers, this.changeAnimalLocation, undefined, this);
      this.physics.add.overlap(this.beavers, this.skunks, this.changeAnimalLocation, undefined, this);
      this.physics.add.overlap(this.deers, this.deers, this.changeAnimalLocation, undefined, this);
      this.physics.add.overlap(this.skunks, this.deers, this.changeAnimalLocation, undefined, this);
      this.physics.add.overlap(this.skunks, this.skunks, this.changeAnimalLocation, undefined, this);

      //starting a timer
      this.startPoint = this.getTimer();
    }
  
    update() {
      //moving the background
      this.background.tilePositionX += 5;
      

      //moving all of the animals in the groups to make it seem like they are in one place on the tilesprite
      this.skunks.children.iterate(function(child){
        //child.play(randomBeaverAnimation());
        child.x -= 1.85;
      }.bind(this));
      this.deers.children.iterate(function(child){
        //child.play(randomBeaverAnimation());
        child.x -= 1.85;
      }.bind(this));
      //moving all of the beavers along with the background
      this.beavers.children.iterate(function(child){
        //child.play(randomBeaverAnimation());
        child.x -= 1.85;
      }.bind(this));

      //getting rid of the tutorial text and image after 5 seconds
      if(this.getTimer() - this.startPoint >= 5000){
        this.tutorialText.text = "";
        this.tutorialBeaver.setActive(false).setVisible(false);
      }

      //changing scenes after 40 seconds
      if(this.getTimer() - this.startPoint >= 10000){
        this.scene.start('MerchantScene', {score: this.beaverScore});
      }
    }

    //function to determine which beaver frame to use from the sprite sheet
    randomBeaverFrame():number{
      let randomNum = Math.floor(Math.random() * 2);
      if(randomNum === 0)
        return 3;
      else return 9;
    }

    //function to return a random y coordinate for the animals
    randomY():number{
      return Math.floor(Math.random() * 40) + 305;
    }

    //function to return a random x coordinate for the animals
    randomX():number{
      return Math.floor(Math.random() * 4000 + 600);
    }

    /*
    randomBeaverAnimation():string{
      let randomNum = Math.floor(Math.random() * 2);
      if(randomNum === 0)
        return 'beaverEast';
      else return 'beaverWest';
    }*/

    //function to change the x and y coordinate of an animal if it spawns on top of another
    changeAnimalLocation(animal1, animal2):void{
      animal1.x = this.randomX();
      animal2.y = this.randomY();
    }

    //destroying a beaver when it is clicked
    captureBeaver(pointer, gameObject):void{
      this.beaverScore += 1;
      console.log(this.beaverScore);
      gameObject.destroy();
      
      this.scoreText.text = this.zeroPad(this.beaverScore, 2);
    }

    //getting the current time in milliseconds
    getTimer(): number{
      let d: Date = new Date();
      return d.getTime()
    }

    //function that randomly returns true or false
    trueOrFalse(): boolean{
      let num = Math.floor(Math.random() * 2);
      if(num === 0)
        return true;
      else
        return false;
    }

    zeroPad(number, size){
      let stringNumber = String(number);
      while(stringNumber.length < (size || 2)){
        stringNumber = "0" + stringNumber;
      }
      return stringNumber;
    }
}