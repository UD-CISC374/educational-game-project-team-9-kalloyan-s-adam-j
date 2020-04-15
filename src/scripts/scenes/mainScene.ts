import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.scene.start('MenuScene');
    this.scene.start("HuntingScene");
    
  }

  update() {
  }
}
