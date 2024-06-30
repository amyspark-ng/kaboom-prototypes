import kaboom from "kaboom";
import "kaboom/global";
import { trail } from "./trail.ts";

export const k = kaboom({
	width: 1024,
	height: 576,
});

loadBean()

let bean = add([
	sprite("bean"),
	pos(),
	anchor("center"),
	area(),
	color(),
	z(0),
	{
		update() {
			this.pos = mousePos()
			if (isMouseDown("left")) this.trail.color = GREEN 
			else this.trail.color = BLUE
		}
	}
])

bean.use(trail({
	sprite: "bean",
	amount: 10,
	colors: BLUE,
	startPointForColor: "tail",
}))

onKeyPress("right", () => {
	bean.trail.spreadBetweenClones++
})

onKeyPress("left", () => {
	bean.trail.spreadBetweenClones--
})
