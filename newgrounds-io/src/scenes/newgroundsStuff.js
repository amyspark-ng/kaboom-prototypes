let theText;
let icon;

export let userIcon;

export function newgroundsText() {
		theText = add([
			text("You're not logged in! Do it!"),
			pos(center().x, center().y - 100),
			anchor("center"),
			"newgroundsText",
		])
	
		icon = add([
			sprite("noicon"),
			pos(theText.pos.x, theText.pos.y + 75),
			color(WHITE),
			anchor("center"),
			"newgroundsText",
		])

		let noBtn = add([
			rect(200, 100),
			pos(theText.pos.x - 200, theText.pos.y + 150),
			anchor("center"),
			area(),
			"newgroundsText",
		])
	
		noBtn.add([
			text("No!!!!"),
			pos(),
			color(BLACK),
			anchor("center"),
			"newgroundsText",
		])
	
		noBtn.onClick(() => {
			NGIO.skipLogin()
		})
	
		let yesBtn = add([
			rect(200, 100),
			pos(theText.pos.x + 200, theText.pos.y + 150),
			anchor("center"),
			area(),
			"newgroundsText",
		])
	
		yesBtn.add([
			text("Yes"),
			pos(),
			color(BLACK),
			anchor("center"),
			"newgroundsText",
		])
	
		yesBtn.onClick(() => {
			NGIO.openLoginPage()
		})
}

let loadingButton = 512 - 100

export function newgroundsGetConnectionStatus() {
// ... in game loop ...

    // Note: the callback function only fires if there's a change in status
    NGIO.getConnectionStatus(function(status) {
        // You could hide any login/preload UI elements here (we'll show what we need later).

        // This is a generic check to see if we're waiting for something...
        if (NGIO.isWaitingStatus) {
            // We're either waiting for the server to respond, or the user to sign in on Newgrounds.
            // Show a "please wait" message and/or a spinner so the player knows something is happening
			loadingButton += 25
			
			add([
				rect(10, 10),
				pos(loadingButton, center().y),
				color(WHITE),
				"dot"
			])
		}

        // check the actual connection status
        switch (status) {
            // we have version and license info
            case NGIO.STATUS_LOCAL_VERSION_CHECKED:

                if (NGIO.isDeprecated) {
                    // this copy of the game is out of date
                    // (or you forgot to update the version number in your init() call)

                    // Show a 'new version available' button that calls
                    // NGIO.loadOfficialUrl();
                }

                if (!NGIO.legalHost) {
                    // the site hosting this copy has been blocked

                    // show the player a message ("This site is illegally hosting this game") , and add a button that calls
                    // NGIO.loadOfficialUrl();
                }

                break;

            // user needs to log in
            case NGIO.STATUS_LOGIN_REQUIRED:

				get("dot").forEach(element => {
					destroy(element)
				})

				get("newgroundsText").forEach(element => {
					element.hidden = false
					element.paused = false
				});

                // present the user with a message ("This game uses features that require a Newgrounds account")
                // along with 2 buttons:

                // A "Log In" button that calls NGIO.openLoginPage();
                // A "No Thanks: button that calls NGIO.skipLogin();

                break;

            // We are waiting for the user to log in (they should have a login page in a new browser tab)
            case NGIO.STATUS_WAITING_FOR_USER:

				theText.text = "We're waiting...."

                // It's possible the user may close the login page without signing in.
                // Show a "Cancel Login" button that calls NGIO.cancelLogin();
                
                break;

			// the results are in....
			case NGIO.STATUS_READY:

                // Everything should be loaded.

                // If NGIO.hasUser is false, the user opted not to sign in, so you may
                // need to do some special handling in your game.
                
				if (NGIO.session.user != null) {
					console.log("logged in")
					theText.text = "You logged in!!!! kewl...."
					loadRoot("")
					loadSprite("userIcon", NGIO.session.user.icons.large).onLoad(() => {
						icon.unuse("rect")
						icon.use(sprite("userIcon"))
						icon.use(scale(0.9))
						userIcon = true
					}).onError(() => {
						userIcon = false
					})
					// got the sprite
					loadRoot("./assets/")
				}
				
				else {
					theText.text = "ok don't log in i guess...."
				}

				wait(2, () => {
					go("gamescene")
				})
				
                break;
        }
    });
}