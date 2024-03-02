// <reference types="https://esm.sh/kaboom@3000.1.17/global" />
import kaboom from "https://esm.sh/kaboom@3000.1.17";

import { loadAssets } from "./loader.js"
import { KBTween } from './plugins/easings.js'

export const k = kaboom({
	width: 1024,
	height: 576,
});

export const twnlib = KBTween(k) 

loadAssets()

go("gamescene")