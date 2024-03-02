import { gamescene } from "./scenes/gamescene.js"

export function loadAssets() {
	loadRoot("./assets/")
	
	loadSprite("dvd", "sprites/DVD_Logo.png")
	loadSprite("osaka", "sprites/osaka.png")
	loadSound("airhorn", "sounds/airhorn.mp3")

	// scenes
	gamescene()
}