export class Button extends Phaser.GameObjects.Sprite {
  onInputOver = () => {}
  onInputOut = () => {}
  onInputUp = () => {}

  constructor(scene, x, y, texture, actionOnClick = () => {}) {
    super(scene, x, y, texture)
    scene.add.existing(this)

    this.setTexture(texture)
      .setInteractive()

      .on('pointerover', () => {
        this.onInputOver()
        this.setTexture('playButtonHover')
      })
      .on('pointerdown', () => {
        actionOnClick()
        this.setTexture('playButtonPress')
      })
      .on('pointerup', () => {
        this.onInputUp()
        this.setTexture('playButton')
      })
      .on('pointerout', () => {
        this.onInputOut()
        this.setTexture('playButton')
      })
  }
}
