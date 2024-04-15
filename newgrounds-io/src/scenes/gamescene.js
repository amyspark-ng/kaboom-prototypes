import { GameState } from "../main.js";
import { addConfetti } from "../plugins/confetti.js";
import { volumeManager } from "../plugins/volumebar.js";
import { newgroundsText, newgroundsGetConnectionStatus, userIcon } from "./newgroundsStuff.js";

export function introScene() {
	return scene("introscene", () => {
		setBackground(BLACK)
		
		newgroundsText()

		get("newgroundsText").forEach(element => {
			element.hidden = true
			element.paused = true
		});

		onUpdate(() => {
			newgroundsGetConnectionStatus()
		})

		onKeyPress("tab", () => {
			debug.inspect = !debug.inspect
		})
	})
}

export function gamescene() {
	return scene("gamescene", () => {
		// put in the first scene that the game starts in
		volumeManager()
		
		setBackground(rgb(9, 11, 13))

		let title = add([
			text(NGIO.hasUser ? `Welcome to the game, ${NGIO.session.user.name}` : "Welcome to the game, no NG guy"),
			anchor("left"),
			color(WHITE),
			pos(25, 100),
		])
		
		add([
			text("medals ^ (click to get)"),
			pos(100, 300)
		])

		// icon
		let icon = add([
			sprite("noicon"),
			scale(2),
			pos(title.pos.x + 400, title.pos.y + 100),
			anchor("center"),
		])

		if (NGIO.hasUser) {
			if (userIcon.data != null) {
				icon.use(sprite("userIcon"))
			}
			else {
				debug.log("couldn't load your pfp :(")
				icon.use(sprite("erroricon"))
			}
		}

		// you didn't log in, no worries no icon for you
		else {
			// it already does that, lol!!!
		}

		let medal1 = add([
			rect(50, 50),
			color(GameState.medals.medal1.unlocked ? GREEN : rgb(51, 51, 51)),
			pos(100, center().y - 100),
			anchor("center"),
			area(),
			{
				update() {
					if (GameState.score > 5 && GameState.medals.medal1.unlocked == false) {
						this.color = WHITE
					}

					if (GameState.medals.medal1.unlocked) {
						this.color = GREEN
					}
				}
			}
		])
		
		medal1.onClick(() => {
			if (NGIO.isInitialized) {
				if (GameState.score > 5) {
					if (!GameState.medals.medal1.unlocked) {
						debug.log("unlock first medal")
						NGIO.unlockMedal(GameState.medals.medal1.ng_id)
						GameState.medals.medal1.unlocked = true
					}
				}
			}
		})
		
		let medal2 = add([
			rect(50, 50),
			color(GameState.medals.medal2.unlocked ? GREEN : rgb(51, 51, 51)),
			pos(200, center().y - 100),
			anchor("center"),
			area(),
			{
				update() {
					if (GameState.score > 20 && GameState.medals.medal2.unlocked == false) {
						this.color = WHITE
					}
					
					if (GameState.medals.medal2.unlocked) {
						this.color = GREEN
					}
				}
			}
		])

		medal2.onClick(() => {
			if (NGIO.isInitialized) {
				if (GameState.score > 20) {
					if (!GameState.medals.medal2.unlocked) {
						debug.log("unlock second medal")
						NGIO.unlockMedal(GameState.medals.medal2.ng_id)
						GameState.medals.medal2.unlocked = true
					}
				}
			}
		})

		let clicker = add([
			rect(125, 125),
			color(WHITE),
			pos(150, 425),
			anchor("center"),
			scale(),
			area(),
		])
		
		clicker.onClick(() => {
			GameState.score++
			tween(vec2(1), vec2(0.95), 0.32, (p) => clicker.scale = p, )
			wait(0.32, () => {
				tween(vec2(0.95), vec2(1), 0.32, (p) => clicker.scale = p, )
			})
		})

		let scoreText = add([
			text(GameState.score),
			anchor("left"),
			pos(clicker.pos.x + 100, clicker.pos.y),
			{
				update() {
					this.text = GameState.score
				}
			}
		])
		
		let scoreOptions = {
			period: NGIO.PERIOD_ALL_TIME,
			social: false,
			skip: 0,
			limit: 10,
		}

		let scoresFromNg;

		// score board
		let posY = 10
		for (let i = 0; i < scoreOptions.limit; i++) {
			posY += 50
			add([
				text(`#${i + 1}  - No user - No Score`),
				pos(630, posY),
				anchor("left"),
				area(),
				"boardText",
				"score",
			])

			add([
				sprite("noicon"),
				pos(590, posY),
				anchor("center"),
				scale(0.8),
				area(),
				"boardIcon",
				"score",
			])
		}
		
		if (NGIO.isInitialized) {
			NGIO.getScores(13611, scoreOptions, onScoresLoaded)
		}

		function onScoresLoaded(scores, board, options) {
			if (scores.length == undefined) {
				scoresFromNg = [scores]
			}

			else {
				scoresFromNg = scores
			}

			console.log(scoresFromNg)

			for (let i = 0; i < scoresFromNg.length; i++) {
				get("boardText", { recursive: true })[i].text = `#${i + 1} - ${scoresFromNg[i].user.name} - ${scoresFromNg[i].value}`
				loadRoot("")
				let scoreUserIcon = loadSprite(`${scoresFromNg[i].user.name}_icon`, `${scoresFromNg[i].user.icons.large}`)
				loadRoot("./assets/")
				if (scoreUserIcon.data != null)	get("boardIcon", { recursive: true })[i].use(sprite(`${scoresFromNg[i].user.name}_icon`))
				else get("boardIcon", { recursive: true })[i].use(sprite("erroricon"))
				// give username to click
				get("boardText", { recursive: true })[i].username = scoresFromNg[i].user.name
				get("boardIcon", { recursive: true })[i].username = scoresFromNg[i].user.name
			}
		}

		onClick("score", (score) => {
			if (score.username != undefined) {
				window.open(`https://${score.username}.newgrounds.com`)
			}
		})

		// upload score
		wait(10, () => {
			loop(10, () => {
				NGIO.postScore(13611, GameState.score)	
				NGIO.getScores(13611, scoreOptions, onScoresLoaded)
	
				let flash = add([
					rect(width() + 10, height() + 10),
					color(WHITE),
					z(999),
					opacity(1),
				])
	
				tween(1, 0, 0.5, (p) => flash.opacity = p)
	
				setData("testy-test-save", GameState)
			})
		}) 
	})	
}