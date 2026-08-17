
class eclApp_drawGear extends eclApp {
    static name = 'gear';
    static content = 'drawGear_main';

    static dispatch() {
        page.modules.content = 'drawGear_main';
    }
}
