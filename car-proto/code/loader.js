import { gamescene } from "./scenes/gamescene.js"

export function loadAssets() {
	loadRoot("./assets/")
	
	loadBean()
	loadSprite("osaka", "sprites/osaka.png")
	loadSprite("car", "sprites/car.png")
	loadSprite("bg", "sprites/bg.png")
	loadSprite("speedCounter", "sprites/speedCounter.png")
	loadSound("score", "sounds/score.mp3")

	// scenes
	gamescene()
}