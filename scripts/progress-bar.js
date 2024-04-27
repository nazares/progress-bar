class ProgressBar extends HTMLElement {
    static css = `
        :host {
            display: flex;
            // flex-direction: column;
            justify_content: center;
            align-items: center;
            width: var(--pb-width, 250px);
            height: var(--pb-height, 40px);
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
        }
        .fill {
            width: 50%;
            height: 100%;
            background: var(--pb-fill-color, #222);
            transition: width 0.25s;
        }

        .percentage {
            position: absolute;
            background: transparent;
            text-align:center;
            font-family: monospace;
            width:var(--pb-width, 250px);
            color: #fff;
            mix-blend-mode: difference;
        }
    `;

    static get observedAttributes() {
        return ['percent'];
    }

    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const style = document.createElement("style"),
            percentage = document.createElement("div"),
            fill = document.createElement("div");


        style.innerHTML = ProgressBar.css;

        fill.classList.add("fill");
        percentage.classList.add("percentage");

        percentage.innerHTML = 0 + "%";

        this.shadowRoot.append(percentage, style, fill);
    }

    get percent() {
        const value = this.getAttribute("percent");
        if (isNaN(value) || value < 0) return 0;
        if (value > 100) return 100;
        // if (value < 0) return 0;

        return Number(value);
    }

    set percent(value) {
        this.setAttribute("percent", value);
    }

    attributeChangedCallback(name) {
        if (name === "percent") {
            this.shadowRoot.querySelector(".fill").style.width = `${this.percent}%`;
            this.shadowRoot.querySelector(".percentage").textContent = `${this.percent}%`
        }
    }
}

customElements.define("progress-bar", ProgressBar);