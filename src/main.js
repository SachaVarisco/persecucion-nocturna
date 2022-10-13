import Phaser from 'phaser'

import {preload} from './scenes/preload';
import {MainMenu} from './scenes/mainmenu';
import {ayuda} from './scenes/ayuda';
import {creditos} from './scenes/creditos';
import {gameplay} from './scenes/gameplay';
import {gameover} from './scenes/gameover';
import {victoria} from './scenes/victory';



const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 16,
			height: 9,
		},
		max: {
			width: 1920,
			height: 1080,
		},
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y:0 },
			debug: true,
		}
	},
	scene: [preload,MainMenu,ayuda,creditos,gameplay,gameover,victoria]
}

export default new Phaser.Game(config)
