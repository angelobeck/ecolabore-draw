
class eclCom_drawSlide extends eclCom {
    currentSlide = 0;

    connectedCallback() {
        this.track('currentSlide');
    }

    handleKeydown(event) {
        switch (event.key) {
            case "Enter":
            case ' ':
                if (this.currentSlide + 1 < this.slides.length)
                    this.currentSlide++;
                break;

            case "Backspace":
                if (this.currentSlide > 0)
                    this.currentSlide--;
                break;
        }
    }

    nextSlide(event) {
        event.preventDefault();
        if (this.currentSlide + 1 < this.slides.length)
            this.currentSlide++;
    }

    previousSlide(event) {
        event.preventDefault();
        if (this.currentSlide > 0)
            this.currentSlide--;
    }

    get _list_() {
        var items = [];
        for (let i = 0; i <= this.currentSlide; i++) {
            items.push(this.slides[i].title);
        }
        return items;
    }

    get _slideTitle_() {
        return this.slides[this.currentSlide].title;
    }

    get _contentParagraphs_() {
        return this.slides[this.currentSlide].paragraphs;
    }

    slides = [
        {
            title: "Mitos sobre acessibilidade",
            paragraphs:[
                "Acessibilidade é para todos.",
                "Dá mais lucro porque vende mais.",
                "Aumenta a base de usuários.",
                "É fácil desenvolver."
            ]
        },
        {
            title: "Porque acessibilidade?",
            paragraphs:[
                "Por quê você aplica acessibilidade",
                "Porque sua empresa aplica acessibilidade"
            ]
        },
        {
            title: "Onde estão as barreiras?",
            paragraphs:[
                "Usuários",
                "Dispositivos",
                "Condições externas"
            ]
        },
        {
            title: "Quais são as necessidades?",
            paragraphs:[
                "Visão",
                "Audição",
                "Mobilidade",
                "Neurológico"
            ]
        },
        {
            title: "Critérios de avaliação",
            paragraphs:[
                "Consórcio mundial para a padronização da Internet - W3C",
                "Iniciativa para acessibilidade Web - WAI",
                "Diretrizes de acessibilidade para conteúdos Web - WCAG",
                "Guia de desenvolvimento - APG"
            ]
        }
    ];

}