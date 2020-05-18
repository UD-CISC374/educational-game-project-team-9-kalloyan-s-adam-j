export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {}
  onInputOut = () => {}
  onInputUp = () => {}
  onInputDown = () => {}
  
 

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    scene.add.existing(this)

    this.setTexture(texture)
      .setInteractive()

      //mouse pointer is over the button
      .on('pointerover', () => {
        this.onInputOver()
        this.setTint(0x787777)
      })
      //mouse pointer is pressed down
      .on('pointerdown', () => {
        this.onInputDown()
        this.setTint(0x44ff44)
      })
      //mouse press is released
      .on('pointerup', () => {
        this.onInputUp()
        this.setTint(0x787777)
      })
      //mouse pointer leaves the button
      .on('pointerout', () => {
        this.onInputOut()
        this.clearTint();
      })
      
  }
}
