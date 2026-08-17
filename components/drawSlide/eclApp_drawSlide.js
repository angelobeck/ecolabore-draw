
class eclApp_drawSlide extends eclApp {
    static name = 'slide';
    static content = 'drawSlide_main';

    static dispatch() {
        page.modules.alert = 'drawSlide_main';
    }
}
