import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import HuntingScene from './scenes/huntingScene';
import MenuScene from './scenes/menuScene';
import MerchantScene from './scenes/merchantScene';


const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;


const config: GameConfig = {
    backgroundColor: 'ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, HuntingScene, MenuScene, MerchantScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 400 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
