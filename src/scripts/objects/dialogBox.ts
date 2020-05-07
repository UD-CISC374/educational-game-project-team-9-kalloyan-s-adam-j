export default class DialogBox extends Phaser.GameObjects.Group {

    private dialog: string[];
    private displayedText: Phaser.GameObjects.Text;
    private num: number = 0;
    private timedEvent: Phaser.Time.TimerEvent;
    private background: Phaser.GameObjects.Rectangle;
    private isDone: boolean = false;
    private dialogCount: number = 0;
    

    constructor(scene: Phaser.Scene, text: string, width = scene.scale.width * 2/3, height = scene.scale.height/4) {
        super(scene);
        
        //sets the background of the dialog box
        this.background = scene.add.rectangle(scene.scale.width / 2, scene.scale.height / 5, width, height, 0x000000);
        /*this.add(this.background);
        scene.add.existing(this.background);*/

        //sets the text in the dialog box
        this.setText(scene, text);

        //this.dialog = text.split(' ');

        /*this.displayedText = scene.add.text(background.getTopLeft().x + 10, background.getTopLeft().y + 10, '5', {wordWrap: {
            width: background.width - 20,
        }});

        this.timedEvent = scene.time.addEvent({
            delay: 400,
            callback: this.animateText,
            callbackScope: this,
            loop: true
        });*/

        //this.add(this.displayedText);
        //scene.add.existing(this.displayedText);
    }

    /*animateText(): void{
        this.displayedText.text += this.dialog[this.num];
        this.num += 1;

        if(this.num == this.dialog.length)
            this.timedEvent.destroy();
    }*/

    //sets the properties of the text
    _setText(scene: Phaser.Scene, text: string): void{
        if(this.displayedText)
            this.displayedText.destroy();

        this.displayedText = scene.make.text({
            x: this.background.getTopLeft().x + 10,
            y: this.background.getTopLeft().y + 10, 
            text: text, 
            style: {
                wordWrap: {width: this.background.width - 20}
            }});
    }

    //runs a timer event to animate the words
    setText(scene: Phaser.Scene, text: string): void{
        this.num = 0;
        this.isDone = false;
        this.dialogCount++;
        this.dialog = text.split(' ');
        if(this.timedEvent)
            this.timedEvent.remove();

        let tempText: string = '';
        this._setText(scene, tempText);

        this.timedEvent = scene.time.addEvent({
            delay: 300,
            callback: this.animateText,
            callbackScope: this,
            loop: true
        });
    }

    //displayes a new word every time it is called
    animateText(): void{
        this.num++;
        this.displayedText.setText(this.displayedText.text + this.dialog[this.num - 1] + " "); //I'm so glad I decided to add the space here because for the life of me I could not figure out how to get the text to wrap
        console.log("num: " + this.num + " length: " + this.dialog.length);
        if(this.num === this.dialog.length){
            this.timedEvent.remove();
            this.isDone = true;
        }
    }

    completedDialog(): boolean{
        return this.isDone;
    }

    getDialogCount(): number{
        return this.dialogCount;
    }


}