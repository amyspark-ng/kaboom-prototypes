import kaboom from "kaboom";
import "kaboom/global";

import { loadAssets } from "./loader.js"

export const k = kaboom({
	width: 1024,
	height: 576,
	font: 'apl386',
	canvas: document.getElementById("k")
});

var options = {
    // This should match the version number in your Newgrounds App Settings page
    // version: "1.0.0",

    // If you aren't using any of these features, set them to false, or delete the line
    // checkHostLicense: true,
    // autoLogNewView: true,
    preloadMedals: true,
    preloadScoreBoards: true,
    preloadSaveSlots: true
};

NGIO.init("57961:MhiUdYKQ", "cWmdrfAviqV2Meuz3sEk8g==", options)

export let GameState = {
	volumeIndex: 9,
	score: 0,
	medals: {
		medal1: {
			unlocked: false,
			ng_id: 77973,
		},
		medal2: {
			unlocked: false,
			ng_id: 78168,
		}
	}
}

let gottenData = getData("testy-test-save")

if (gottenData) {
	GameState = gottenData
}

loadAssets()

go("introscene")
