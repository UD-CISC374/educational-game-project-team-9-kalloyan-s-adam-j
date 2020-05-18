export default class StoreScene extends Phaser.Scene {
  private moneyAmount: number;
  private expensiveText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'StoreScene' });
  }

  init(data) {
    this.moneyAmount = data.dollars;
  }

  create() {
    let background: Phaser.GameObjects.Rectangle = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000);
    background.setOrigin(0, 0);

    let commentary: Phaser.GameObjects.Text = this.add.text(this.scale.width / 6, this.scale.height / 10, "The family earned $" + this.moneyAmount + " from the gold they collected. Help them buy a plot of land.\n\nSelect the land they should buy.", {
      wordWrap: { width: this.scale.width * 5 / 6 },
      fill: '#ffffff'
    });

    this.expensiveText = this.add.text(this.scale.width / 6, this.scale.height / 10, "\n\n\n\n\n\nSorry, the family cannot afford that land.", {
      wordWrap: { width: this.scale.width * 5 / 6 },
      fill: '#000000'
    });

    let rect1: Phaser.GameObjects.Rectangle = this.add.rectangle(this.scale.width / 6, this.scale.height * .4, 130, 87, 0xffffff);
    rect1.setOrigin(0, 0);
    rect1.setInteractive();
    rect1.on('pointerover', () => {
      rect1.setFillStyle(0x008d00);

    });
    rect1.on('pointerout', () => rect1.setFillStyle(0xffffff));
    rect1.on('pointerdown', () => { 
      if(this.moneyAmount < 200)
        this.expensiveText.setStyle({fill: '#ff1100'});
      else
        this.scene.start('FinalScene', {option: 1});
    });
    let rect2: Phaser.GameObjects.Rectangle = this.add.rectangle(this.scale.width * 2 / 6 + 35, this.scale.height * .4, 130, 87, 0xffffff);
    rect2.setOrigin(0, 0);
    rect2.setInteractive();
    rect2.on('pointerover', () => {
      rect2.setFillStyle(0x008d00);

    });
    rect2.on('pointerout', () => rect2.setFillStyle(0xffffff));
    rect2.on('pointerdown', () => { 
      if(this.moneyAmount < 400)
        this.expensiveText.setStyle({fill: '#ff1100'});
      else
        this.scene.start('FinalScene', {option: 2});
    });
    let rect3: Phaser.GameObjects.Rectangle = this.add.rectangle(this.scale.width * 4 / 6 - 30, this.scale.height * .4, 130, 87, 0xffffff);
    rect3.setOrigin(0, 0);
    rect3.setInteractive();
    rect3.on('pointerover', () => {
      rect3.setFillStyle(0x008d00);

    });
    rect3.on('pointerout', () => rect3.setFillStyle(0xffffff));
    rect3.on('pointerdown', () => { 
      if(this.moneyAmount < 600)
        this.expensiveText.setStyle({fill: '#ff1100'});
      else
        this.scene.start('FinalScene', {option: 3});
    });

    let price1: Phaser.GameObjects.Text = this.add.text(rect1.x + rect1.width / 2, rect1.y + rect1.height + 5, "$200", {
      fill: '#ffffff'
    });
    price1.setOrigin(.5, 0);
    let price2: Phaser.GameObjects.Text = this.add.text(rect2.x + rect2.width / 2, rect2.y + rect2.height + 5, "$400", {
      fill: '#ffffff'
    });
    price2.setOrigin(.5, 0);
    let price3: Phaser.GameObjects.Text = this.add.text(rect3.x + rect3.width / 2, rect3.y + rect3.height + 5, "$600", {
      fill: '#ffffff'
    });
    price3.setOrigin(.5, 0);

    let option1: Phaser.GameObjects.Image = this.add.image(rect1.x + 5, rect1.y + 5, "option1");
    option1.setOrigin(0,0);
    option1.setScale(.0662, .065);

    let option2: Phaser.GameObjects.Image = this.add.image(rect2.x + 5, rect2.y + 5, "woodhouse");
    option2.setOrigin(0,0);
    option2.setScale(.0662, .065);

    let option3: Phaser.GameObjects.Image = this.add.image(rect3.x + 5, rect3.y + 5, "option3");
    option3.setOrigin(0,0);
    option3.setScale(.0662, .065);
  }

}