
class eclApp_drawHome extends eclApp {
    static name = '-home';
    static content = 'drawHome_main';

    static constructorHelper(me) {
        me.path = me.parent.path;
    }

}
