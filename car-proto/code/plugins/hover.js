export function hover() {
    let hoverStarted = false;
    let hoverEnded = false;

    return {
        id: "hover",
        require: ["area"],
        update() {
            if (this.isHovering()) {
                if (hoverStarted) return;
                hoverStarted = true;
                hoverEnded = false;
                this.trigger("hoverEnter");
            }
            else {
                if (hoverEnded || !hoverStarted) return;
                hoverEnded = true;
                hoverStarted = false;
                this.trigger("hoverExit");
            }
        },

        onHoverOnce(onHover, onHoverExit) {
            this.on("hoverEnter", onHover);

            if (onHoverExit) this.on("hoverExit", onHoverExit)
        },

        onHoverEnter(action) {
            return this.on("hoverEnter", action)
        },

        onHoverExit(action) {
            return this.on("hoverExit", action)
        }
    }
}