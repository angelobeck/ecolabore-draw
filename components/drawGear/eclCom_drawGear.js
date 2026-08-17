
class eclCom_drawGear extends eclCom {
    displayElement;
    outputTextarea;
    svg;
    axle = 4;
    lock = 'step';
    deep = 2;
    format = 'quadratic';
    radius = 50;
    step = 9.41477;
    teeths = 50;
    gap = 0;

    connectedCallback() {
        this.track('lock');
        this.track('deep');
        this.track('gap');
        this.track('radius');
        this.track('step');
        this.track('teeths');
    }

    renderedCallback() {
        if (!this.svg) {
            this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.svg.setAttribute('viewbox', '0 0 400 400');
            this.displayElement.appendChild(this.svg);
        }
    }

    handleClick() {
        var svg = draw_parse(draw_tokenize(this.inputTextarea.value));
        this.outputTextarea.value = svg;
        this.svg.innerHTML = svg;
    }

    handleLockChange(event) {
        this.lock = event.currentTarget.value;
    }

    get _radiusDisabled_() {
        return this.lock == 'radius';
    }

    get _stepDisabled_() {
        return this.lock == 'step';
    }

    get _teethsDisabled_() {
        return this.lock == 'teeths';
    }

    handleAxleChange(event) {
        var value = parseFloat(event.currentTarget.value);
        if (Number.isNaN(value))
            return;

        this.axle = value;
        this.engrave();
    }

    handleDeepChange(event) {
        var value = parseFloat(event.currentTarget.value);
        if (Number.isNaN(value))
            return;

        this.deep = value;
        this.engrave();
    }

    handleFormatChange(event) {
        this.format = event.currentTarget.value;
        this.engrave();
    }

    handleGapChange(event) {
        var value = parseFloat(event.currentTarget.value);
        if (Number.isNaN(value))
            return;
        this.gap = value;
        this.engrave();
    }

    handleRadiusChange(event) {
        var value = parseFloat(event.currentTarget.value);
        if (Number.isNaN(value))
            return;
        if (value == 0)
            return;

        this.radius = value;
        if (this.lock == 'step')
            this.updateTeeths();
        else
            this.updateStep();
        this.engrave();
    }

    handleStepChange(event) {
        var step = parseFloat(event.currentTarget.value);
        if (Number.isNaN(step))
            return;
        if (step == 0)
            return;

        this.step = step;
        if (this.lock == 'radius')
            this.updateTeeths();
        else
            this.updateRadius();
        this.engrave();
    }

    handleTeethsChange(event) {
        var value = parseFloat(event.currentTarget.value);
        if (Number.isNaN(value))
            return;
        if (value == 0)
            return;

        this.teeths = value;
        if (this.lock == 'radius')
            this.updateStep();
        else
            this.updateRadius();
        this.engrave();
    }

    updateRadius() {
        this.radius = this.round((this.step * this.teeths) / (2 * Math.PI));
    }

    updateStep() {
        this.step = this.round((this.radius * 2 * Math.PI) / this.teeths);
    }

    updateTeeths() {
        this.teeths = this.round((this.radius * 2 * Math.PI) / this.step);
    }

    engrave() {
        if (this.teeths != Math.round(this.teeths))
            return;

        var buffer = drawGear(this);
        this.outputTextarea.value = buffer;
        var svg = '<path d="' + buffer + '" fill="none" stroke="#fff" stroke-width="1" />';
        this.svg.innerHTML = svg;
    }

    round(x) {
        return Math.round(x * 100) / 100;
    }

}
