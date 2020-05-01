export default class DialogBox extends Phaser.GameObjects.Group {

    private dialog: string[];
    private displayedText: Phaser.GameObjects.Text;
    private num: number = 0;
    private timedEvent: Phaser.Time.TimerEvent;
    private background: Phaser.GameObjects.Rectangle;
    

    constructor(scene: Phaser.Scene, text: string, width = scene.scale.width * 2/3, height = scene.scale.height/4) {
        super(scene);
        
        //sets the background of the dialog box
        this.background = scene.add.rectangle(scene.scale.width / 2, scene.scale.height / 5, width, height, 0x000000);
        /*this.add(this.background);
        scene.add.existing(this.background);*/

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

    setText(scene: Phaser.Scene, text: string): void{
        this.num = 0;
        this.dialog = text.split(' ');
        if(this.timedEvent)
            this.timedEvent.remove();

        let tempText: string = '';
        this._setText(scene, tempText);

        this.timedEvent = scene.time.addEvent({
            delay: 200,
            callback: this.animateText,
            callbackScope: this,
            loop: true
        });
    }

    animateText(): void{
        this.num++;
        this.displayedText.setText(this.displayedText.text + this.dialog[this.num - 1] + " "); //I'm so glad I decided to add the space here because for the life of me I could not figure out how to get the text to wrap
        if(this.num === this.dialog.length)
            this.timedEvent.remove();
    }


}