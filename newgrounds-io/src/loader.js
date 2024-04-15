import { gamescene, introScene } from "./scenes/gamescene.js"

export function loadAssets() {
	loadRoot("./assets/")
	loadBean()
	
	loadSound("volumeChange", "sounds/volumeChange.wav")

	loadSprite("noicon", "sprites/noicon.png")
	loadSprite("erroricon", "sprites/erroricon.png")

	loadSprite("osaka", "sprites/osaka.png")
	// scenes
	gamescene()
	introScene()
}