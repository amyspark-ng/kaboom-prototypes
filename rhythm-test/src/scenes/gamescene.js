import { addConfetti } from "../plugins/confetti.js";
import { volumeManager } from "../plugins/volumebar.js";
import { addNote } from "./notes.js";

export let combo = 0

export function assignCombo(v = 0) {
	combo = v
}

export function gamescene() {
	return scene("gamescene", () => {
		// put in the first scene that the game starts in
		volumeManager()
		setBackground(rgb(57, 92, 173))
		
		combo = 0

		let posX = 240

		// debug.timeScale = 0.1

		// camScale(0.5)
		let ntoad = 1
		let stair = 0

		// wait(1, () => {
			loop(0.2, () => {
				if (stair == 4) ntoad = -1
				else if (stair == 1 && ntoad == -1) ntoad = 1
				stair += ntoad
				addNote(stair)
				// debug.log(ntoad)
			})
		// })

		// onKeyPress("w", () => {
		// 	addNote(1)
		// })

		// addNote(1)
		// addNote(2)

		let keys = ["q", "w", "o", "p"]

		for (let i = 0; i < 4; i++) {
			posX += 100
			
			let n = add([
				rect(80, 80),
				pos(posX, height() - 60),
				anchor("center"),
				area(),
				color(rgb(133, 133, 133)),
				outline(5, BLACK),
				`note_${i}`,
				"whiteNote",
				{
					hasNote: false,
					noteOver: null,
					down: false,
					update() {
						this.down = isKeyDown(keys[i])
					}
				}
			])

			n.onKeyPress(keys[i], () => {
				if (n.hasNote) {
					combo++

					if (n.noteOver.timeOnNote < 0.1) {
						let rating = add([
							text("shit..."),
							anchor("center"),
							scale(2),
							pos(center()),
							"rating"
						])

						tween(1, 0, 0.5, (p) => rating.opacity = p)
					}

					else if (n.noteOver.timeOnNote > 0.1 && n.noteOver.timeOnNote < 0.2) {
						let rating = add([
							text("Sick!"),
							anchor("center"),
							scale(2.15),
							pos(center()),
							"rating"
						])
	
						tween(1, 0, 0.5, (p) => rating.opacity = p)
					}

					else if (n.noteOver.timeOnNote > 0.2) {
						let rating = add([
							text("shit..."),
							anchor("center"),
							scale(2),
							pos(center()),
							"rating"
						])
	
						tween(1, 0, 0.5, (p) => rating.opacity = p)
					}
					destroy(n.noteOver)
					tween(n.color, n.noteOver.color.lighten(100), 0.05, (p) => n.color = p, )
				
					get("rating")[get("rating").length - 1].text += `  x${combo}`
				}

				else {
					tween(n.color, rgb(64, 73, 84), 0.01, (p) => n.color = p, )
				}
			})

			n.onKeyRelease(keys[i], () => {
				tween(n.color, rgb(133, 133, 133), 0.05, (p) => n.color = p, )
			})

			n.onCollide("colorNote", (colorNote) => {
				n.hasNote = true
				n.noteOver = colorNote
			})

			n.onCollideEnd("colorNote", (colorNote) => {
				n.hasNote = false
				n.noteOver = null
			})
		}

		debug.log("it runs!!!! kewl")
	})	
}