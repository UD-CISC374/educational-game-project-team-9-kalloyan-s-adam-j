export default class InteractiveDialogBox extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle;
    private interactableText: Phaser.GameObjects.Text;
    private bgStartingX: number;
    private bgStartingY: number;
    private displayedText: Phaser.GameObjects.Text;
    private dialog: string[];
    private num: number = 0;
    private dialogCount: number = 0;
    private timedEvent: Phaser.Time.TimerEvent;
    private destroyed: boolean = false;

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;

        //setting the background of the dialog
        this.bgStartingX = this.scene.scale.width / 6;
        this.bgStartingY = this.scene.scale.height / 10;
        this.background = this.scene.add.rectangle(this.bgStartingX, this.bgStartingY, config.width, config.height, 0x000000);
        this.background.setOrigin(0, 0);
        this.add(this.background);
        this.scene.add.existing(this.background);

        //adding the interactable text
        this.interactableText = this.scene.add.text(this.bgStartingX + this.background.displayWidth - 20, this.bgStartingY + this.background.displayHeight - 20, config.text);
        this.interactableText.setOrigin(1, 1);
        this.interactableText.setInteractive();
        this.interactableText.on('pointerover', () => {
            this.interactableText.setStyle({ fill: '#0f0' });

        });
        this.interactableText.on('pointerout', () => this.interactableText.setStyle({ fill: '#ffffff' }));
        this.add(this.interactableText);
        this.scene.add.existing(this.interactableText);

    }

    getInteractiveText(): Phaser.GameObjects.Text {
        return this.interactableText;
    }

    getBackground(): Phaser.GameObjects.Rectangle {
        return this.background;
    }

    //sets the properties of the text
    _setText(text: string): void {
        if (this.displayedText) {
            //this.remove(this.displayedText);
            //this.displayedText.destroy();
        }

        this.displayedText = this.scene.make.text({
            x: this.background.x + 20,
            y: this.background.y + 20,
            text: text,
            style: {
                wordWrap: { width: this.background.width - 20 },
                fill: '#ffffff'
            }
        });
        /*this.displayedText = this.scene.add.text(this.background.x + 20, this.background.y + 20, text, {
            wordWrap: { width: this.background.width - 20 },
            fill: '#ffffff'
        });*/
        this.add(this.displayedText);
        this.scene.add.existing(this.displayedText);
    }

    //runs a timer event to animate the words
    setText(text: string, animate: boolean): void {
        this.num = 0;
        //this.isDone = false;
        this.dialogCount++;
        this.dialog = text.split(' ');
        if (this.timedEvent)
            this.timedEvent.remove();

        let tempText: string = animate ? '' : text;
        this._setText(tempText);

        if (animate) {
            this.interactableText.disableInteractive();
            this.interactableText.setVisible(false);
            this.timedEvent = this.scene.time.addEvent({
                delay: 200,
                callback: this.animateText,
                callbackScope: this,
                loop: true
            });
        }
    }

    //displayes a new word every time it is called
    animateText(): void {
            this.num++;
            this.displayedText.setText(this.displayedText.text + this.dialog[this.num - 1] + " "); //I'm so glad I decided to add the space here because for the life of me I could not figure out how to get the text to wrap
            console.log("num: " + this.num + " length: " + this.dialog.length);
            if (this.num === this.dialog.length) {
                this.timedEvent.remove();
                let timedEvent2: Phaser.Time.TimerEvent = this.scene.time.addEvent({
                    delay: 400,
                    callback: this.enableText,
                    callbackScope: this,
                    repeat: 0
                });
            }
    }

    enableText(): void{
        this.interactableText.setInteractive();
        this.interactableText.setVisible(true);
    }
}