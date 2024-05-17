import { assignCombo } from "./gamescene"

let scrollSpeed = 1000

export function addNote(type) {
	let n = add([
		rect(75, 75),
		color(WHITE),
		pos(340, -75),
		anchor("center"),
		z(1),
		area(),
		"colorNote",
		{
			timeOnNote: 0,
			update() {
				// this.pos.y += scrollSpeed
				this.move(0, scrollSpeed)
			}
		}
	])

	n.use(outline(5, n.color.darken(200)))

	n.onCollideUpdate("whiteNote", (whiteNote) => {
		n.timeOnNote += dt()
		// debug.log(n.timeOnNote)
	})

	n.onUpdate(() => {
		if (n.pos.y > height() + 75) {
			destroy(n)
			let miss = add([
				text("MISS!", {
					font: "font2bitmap"
				}),
				color(WHITE),
				anchor("center"),
				pos(n.pos.x, n.pos.y - 300)
			])
			tween(1, 0, 0.25, (p) => miss.opacity = p, )
			wait(0.25, () => {
				destroy(miss)
			})
			assignCombo(0)
		}
	})
	
	if (type == 1) {
		n.pos.x = 340
		n.color = MAGENTA
	}

	if (type == 2) {
		n.pos.x = 440
		n.color = CYAN
	}

	if (type == 3) {
		n.pos.x = 540
		n.color = GREEN
	}

	if (type == 4) {
		n.pos.x = 640
		n.color = RED
	}
}