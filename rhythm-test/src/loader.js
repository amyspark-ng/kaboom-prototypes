import { gamescene } from "./scenes/gamescene.js"

export function loadAssets() {
	loadBitmapFont("font2bitmap", "assets/sprites/font2bitmap.png", 35, 35, {chars: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"})
	loadRoot("./assets/")
	loadBean()
	
	loadSound("volumeChange", "sounds/volumeChange.wav")

	loadSprite("osaka", "sprites/osaka.png")
	// scenes
	gamescene()

	
	loadFont("apl386", "https://kaboomjs.com/examples/fonts/apl386.ttf", {
		outline: 4,
		filter: "linear",
	});
}