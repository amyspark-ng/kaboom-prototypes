export function gamescene() {
	return scene("gamescene", () => {
		
		add([
			pos(width() / 2, height() / 2),
			sprite("bg"),
			color(35, 88, 173),
			scale(4),
			anchor("center"),
		])
		
		let speedCounter = add([
			pos(width() - 100, height() - 100),
			sprite("speedCounter"),
			scale(0.2),
			fixed(),
			z(1),
			anchor("center")
		])

		let speedNeedle = add([
			pos(width() - 100, height() - 110),
			scale(0.25),
			rect(20, 180),
			fixed(),
			z(2),
			rotate(60),
		])

		let speedText = add([
			pos(speedCounter.pos.x, speedCounter.pos.y - 120),
			text(),
			fixed(),
			z(3),
			anchor("center")
		])


		add([
			text("Left for movable blocks\nRight for static cubes"),
			fixed(),
			pos(0, 0),
			scale(0.9)
		])

		add([
			text("Q"),
			fixed(),
			pos(0, height() - 20),
			scale(0.6)
		])

		// plauer
		let car = add([
			sprite("car"),
			area(),
			pos(width() / 2, height() / 2),
			anchor("center"),
			rotate(0),
			body(),
			area(),
			scale(1.1)
		])

		let moveDir = Vec2.fromAngle(car.angle).normal();
		let speed = 0
		let osaka = false
		const steeringSpeed = 2.25

		onKeyPress("r", () => {
			go("gamescene")
		})

		onUpdate(() => {
			camPos(car.pos)
			car.move(moveDir.scale(speed));

			speedText.text = speed

			// accelerations
			if (isKeyDown("up")) {
				moveDir = Vec2.fromAngle(car.angle).normal();
				speed += 20
				speedNeedle.angle += speed / 150
			}
		
			// piii, piii, piii (going backwards)
			if (isKeyDown("down")) {
				moveDir = Vec2.fromAngle(car.angle).normal();
				speed -= 15
				speedNeedle.angle += (speed * -1) / 150
			}

			// changes direction
			if (isKeyDown("left")) {
				car.angle -= steeringSpeed
			}
			else if (isKeyDown("right")) {
				car.angle += steeringSpeed
			}

			// the needle stops
			if (speedNeedle.angle > 305) {
				if (speed < 0) {
					speedNeedle.angle -= (speed * -1) / 150
				}
				else speedNeedle.angle -= speed / 150
			}

			// speed bump
			if (speed > 1000) speed = 1000
			if (speed < -1000) speed = -1000

			// desaccelerates
			if ( !( isKeyDown("up") || (isKeyDown("down")) )) {
				if (speed > 0) {
					speed -= 10 
					if (speedNeedle.angle > 60)	speedNeedle.angle -= 2.3
				}
				
				else {
					if (speed < 0) speed += 15
					if (speedNeedle.angle > 60)	speedNeedle.angle -= 3.25
				}

			}

			// dumb cubes
			if (isMousePressed("left")) {
				add([
					pos(toWorld(mousePos())),
					rect(100, 100),
					area(),
					body(),
				])
			}

			else if (isMousePressed("right")) {
				add([
					pos(toWorld(mousePos())),
					rect(100, 100),
					area(),
					body({ isStatic: true }),
					color(158, 158, 158)
				])
			}

			// saata andagi
			if (isKeyPressed("q")) {
				if (osaka == false) {
					car.use(sprite("osaka"))
					car.use(scale(0.2))
					osaka = true
				}
				
				else {
					car.use(sprite("car"))
					car.use(scale(1))
					osaka = false
				}
			}
		})
	})	
}