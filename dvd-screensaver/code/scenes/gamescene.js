import { addConfetti } from "../confetti.js";
import { twnlib } from "../main.js";
// import { KBTween } from "../plugins/easings";

export function gamescene() {
	return scene("gamescene", () => {
		// Variables
		let dvd = true
		const bg = add([
			rect(width() * 2 , height() * 2),
			color(BLACK),
			{ colorful: false, }
		])

		bg.onUpdate(() => {
			if (bg.colorful == true) {
				const t = time() * 8
				bg.color = rgb(
					wave(0, 255, t),
					wave(0, 255, t + 2),
					wave(0, 255, t + 4),
				)
			}
		})

		// onMousePress("left", () => {
		// 	logo.pos = mousePos()
		// })

		// onKeyPress("space", () => {
		// 	HITTHECORNER()
		// })

		const logo = add([
			sprite("dvd"),
			pos(),
			area(),
			color(),
			scale(0.125, 0.120),
			{ vel: Vec2.fromAngle(rand((rand(-50, 50)), rand(-50, 50))) },
		])

		
		logo.pos = vec2(rand(100, width() - 150), rand(100, height() - 100))

		// logo.pos = vec2(
		// randi(logo.width * 2, width() - (logo.width * logo.scale.x) - 100),
		// randi(logo.height * 2, height() - (logo.height * logo.scale.y) - 100))

		let speed = 300;
		
		// Speed
		onKeyDown("left", () => {
			speed = speed - 10
		})
		onKeyDown("right", () => {
			speed = speed + 10
		})
		
		// Reload
		onKeyPress("r", () => {
			go("gamescene")
		})

		function HITTHECORNER() {
			play("airhorn", {
				volume: 0.5
			})
			addConfetti({ pos: vec2(width() / 2, height()), spread: 125})
			bg.colorful = true
			wait(1.8, () => {
				bg.colorful = false
				// bg.tween(bg.color, WHITE, 0.5, (p) => bg.color = p, easings.easeOutElastic)
				// bg.tween(bg. color, WHITE, 0.5)
				tween(bg.color, BLACK, 0.5, (val) => bg.color = val)
			})
		}

		onUpdate(() => {
			logo.move(logo.vel.scale(speed))

			// detects bounce toñoñon
			if (logo.pos.x <= 0 || logo.pos.x >= width() - logo.width * logo.scale.x) {
				logo.vel.x = -logo.vel.x
				logo.color = rand(rgb(255, 255, 255))
			}
			
			if (logo.pos.y <= 0 || logo.pos.y >= height() - logo.height * logo.scale.y) {
				logo.vel.y = -logo.vel.y
				logo.color = rand(rgb(255, 255, 255))
			}
		})
		
		onKeyPress("q", () => {
			dvd = !dvd
			if (dvd == false) {
				logo.use(sprite("osaka"))
				logo.use(scale(0.2))
			}
			if (dvd == true) {
				logo.use(sprite("dvd"))
				logo.use(scale(0.2))
			}
		})

		onKeyPress("f", () => {
			setFullscreen(!isFullscreen())
		})

		add([
			rect(2, 2),
			area(),
			pos(0, 0),
			anchor("center"),
			opacity(0),
			"corner"
		])
		add([
			rect(2, 2),
			area(),
			pos(width() - 2, 0),
			anchor("center"),
			opacity(0),
			"corner"
		])
		add([
			rect(2, 2),
			area(),
			pos(0, height() - 2),
			anchor("center"),
			opacity(0),
			"corner"
		])
		add([
			rect(2, 2),
			area(),
			pos(width() - 2, height() - 2),
			anchor("center"),
			opacity(0),
			"corner"
		])

		logo.onCollide("corner", () => {
			HITTHECORNER()
		})

		// // (old) hitting the corner
		// if (logo.pos.x == 0 && logo.pos.y == 0 ||
		// logo.pos.x == width() - logo.width * logo.scale.x && logo.pos.y == 0 ||
		// logo.pos.x == 0 && logo.pos.y == height() - logo.height * logo.scale.y ||
		// logo.pos.x == width() - logo.width * logo.scale.x && logo.pos.y == height() - logo.height * logo.scale.y) {
		// 	HITTHECORNER()				
		// }
	})	
}