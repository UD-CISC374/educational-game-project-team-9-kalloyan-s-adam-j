export default class MerchantScene extends Phaser.Scene {


    constructor() {
      super({ key: 'MerchantScene' });
    }
  
    create() {
      //temporary code
      let background = this.add.rectangle(0, 0, 1926, 1081, 0x000000);
      let nextSceneText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Next Scene", {font: "bold 32px Arial", fill: "#fff"});
      nextSceneText.setOrigin(0.5, 0.5);


    }
  
    update() {
    }
  }