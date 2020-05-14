export default class InteractiveDialogBox extends Phaser.GameObjects.Container{
    private background: Phaser.GameObjects.Rectangle;
    private interactableText: Phaser.GameObjects.Text;
    private bgStartingX: number;
    private bgStartingY: number;

    constructor(config){
        super(config.scene);
        this.scene = config.scene;
        
        //setting the background of the dialog
        this.bgStartingX = this.scene.scale.width / 6;
        this.bgStartingY = this.scene.scale.height / 6;
        this.background = this.scene.add.rectangle(this.bgStartingX, this.bgStartingY, config.width, config.height, 0x000000);
        this.background.setOrigin(0, 0);
        this.add(this.background);
        this.scene.add.existing(this.background);

        //adding the interactable text
        this.interactableText = this.scene.add.text(this.bgStartingX + this.background.displayWidth - 20, this.bgStartingY + this.background.displayHeight - 20, config.text);
        this.interactableText.setOrigin(1,1);
        this.interactableText.setInteractive();
        this.interactableText.on('pointerover', () => 
        {
            this.interactableText.setStyle({fill: '#0f0'});
            console.log("in here");
        });
        this.interactableText.on('pointerout', () => this.interactableText.setStyle({fill: '#ffffff'}));
        this.add(this.interactableText);
        this.scene.add.existing(this.interactableText);
    }

    getInteractiveText(): Phaser.GameObjects.Text{
        return this.interactableText;
    }

    /*
    disable(): void{
        this.background.setVisible(false);
        this.interactableText.setVisible(false);
        this.setVisible(false);
    }

    enable(): void{
        this.background.setVisible(true);
        this.interactableText.setVisible(true);
        this.setVisible(true);
    }*/

}