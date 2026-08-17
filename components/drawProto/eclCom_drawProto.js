
class eclCom_drawProto extends eclCom {
    displayElement;
    inputTextarea;
    outputTextarea;
    svg;

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

}