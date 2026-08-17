
/*
• 
Módulo (m): É a medida base. Para encontrá-lo, divide-se o diâmetro primitivo pelo número de dentes.
• 
Passo Circular: O passo é igual a Pi (3,1416) multiplicado pelo valor do módulo.
• 
Altura da Cabeça do Dente: A altura da parte superior é igual a uma vez o valor do módulo.
• 
Altura do Pé do Dente: A altura da parte inferior é igual a uma vírgula vinte e cinco vezes o valor do módulo.
• 
Profundidade Total do Dente: A profundidade total é a soma das duas alturas anteriores, resultando em duas vírgula vinte e cinco vezes o valor do módulo.
• 
Relação entre Profundidade e Passo: De forma simplificada, a profundidade total do dente corresponde a aproximadamente zero vírgula setenta e um multiplicado pelo valor do passo circular.
*/

function drawGear(params) {
    var axle = params.axle || 0; // o diâmetro do eixo central
    var teeths = params.teeths || 100; // o número de dentes
    var teeth = 0; // indica qual dente está sendo desenhado na iteração atual
    var step = (Math.PI * 2) / teeths; // a distância entre um dente e o próximo
    var radius = params.radius || 50; // o raio médio da engrenagem - parte dos dentes ficam para fora, outra parte para dentro
    var deep = params.deep || 6; // a profundidade dos dentes
    var format = params.format || 'cubic'; // o tipo de dente
    var gap = params.gap || 0; // representa uma lacuna, ou folga entre os dentes das engrenagens. Se o valor for negativo, o espaço entre os dentes deve se tornar mais apertado, valores positivos deve tornar os dentes mais folgados
    var offset = radius + gap + (deep / 2); // Calcula para que o centro do desenho seja deslocado para a direita e para baixo de acordo com o tamanho da engrenagem
    var xOffset = offset;
    var yOffset = offset;
    var scale = 1; // um valor de escala
    var roundLevel = 100; // determina quantas casas decimais devem ser impressas, neste caso somente 2 casas decimais - x = round(x * 100) / 100

    var buffer = ''; // onde o desenho final deverá ser anotado

    function print(value, separator = " ") {
        if (typeof value == "number") {
            value = Math.round(value * roundLevel) / roundLevel;
        }
        buffer += value.toString() + separator;
    }

    function rotate(x, y) {
        var signalX = x >= 0 ? 1 : -1;
        var signalY = y >= 0 ? 1 : -1;
        x *= signalX;
        y *= signalY;
        if (x == 0 && y == 0)
            return [0, 0];

        var distance = Math.hypot(x, y);
        var angle = Math.asin(y / distance);
        if (signalX == -1 && signalY == 1)
            angle = Math.PI - angle;
        else if (signalX == -1 && signalY == -1)
            angle += Math.PI;
        else if (signalX == 1 && signalY == -1)
            angle = (Math.PI * 2) - angle;

        var rad = (teeth * step) + angle;
        var outX = Math.cos(rad) * distance;
        var outY = Math.sin(rad) * distance;

        return [outX, outY];
    }

    function polar(distance, angle) {
        var rad = (teeth * step) + ((angle / 100) * step);
        rad += Math.PI * 1.5;
        var x = Math.cos(rad) * distance;
        var y = Math.sin(rad) * distance;
        return [x, y];
    }

    function distance(a, b) {
        var x1, y1, x2, y2, dx, dy;
        [x1, y1] = a;
        [x2, y2] = b;

        if (x1 < 0 && x2 < 0) {
            x1 *= -1;
            x2 *= -1;
        }

        if (x2 < x1)
            [x1, x2] = [x2, x1];

        dx = x2 - x1;

        if (y1 < 0 && y2 < 0) {
            y1 *= -1;
            y2 *= -1;
        }

        if (y2 < y1)
            [y1, y2] = [y2, y1];

        dy = y2 - y1;

        return Math.hypot(dx, dy);
    }

    function A(r, end, direction = 0, long = 0) {
        print("A");
        print(r * scale);
        print(r * scale);
        print(0);
        print(long);
        print(direction);
        print(end[0] * scale + xOffset);
        print(end[1] * scale + yOffset);
    }

    function C(control1, control2, ending) {
        print("C");
        print(control1[0] * scale + xOffset);
        print(control1[1] * scale + yOffset);
        print(control2[0] * scale + xOffset);
        print(control2[1] * scale + yOffset);
        print(ending[0] * scale + xOffset);
        print(ending[1] * scale + yOffset);
    }

    function L(ending) {
        print("L");
        print(ending[0] * scale + xOffset);
        print(ending[1] * scale + yOffset);
    }

    function mov(ending) {
        print("M");
        print(ending[0] * scale + xOffset);
        print(ending[1] * scale + yOffset);
    }

    function Z() {
        print("z", "\r\n");
    }


    if (format == 'squared') {
        gap /= 2;
        deep /= 2;
        var polarGap = gap * step / 100;
        offset = radius + deep;
        xOffset = offset;
        yOffset = offset;

        mov(polar(radius + deep, -polarGap));
        for (teeth = 0; teeth < teeths; teeth++) {
            L(polar(radius - deep, -polarGap));
            L(polar(radius - deep, 50 + polarGap));
            L(polar(radius + deep, 50 + polarGap));
            L(polar(radius + deep, 100 - polarGap));
        }
        Z();
    } else if (format == 'rounded') {
        gap /= 2;
        deep /= 2;
        var polarGap = gap * step / 100;
        var rExternal = distance(polar(radius + deep, -polarGap), polar(radius + deep, 50 + polarGap)) / 2;
        var rInternal = distance(polar(radius - deep, -polarGap), polar(radius - deep, 50 + polarGap)) / 2;

        offset = radius + deep + rExternal;
        xOffset = offset;
        yOffset = offset;

        mov(polar(radius + deep, -polarGap));
        for (teeth = 0; teeth < teeths; teeth++) {
            L(polar(radius - deep, -polarGap));
            A(rInternal, polar(radius - deep, 50 + polarGap), 0);
            L(polar(radius + deep, 50 + polarGap));
            A(rExternal, polar(radius + deep, 100 - polarGap), 1);
        }
        Z();
    } else {
        gap /= 2;
        var xControl = deep / 6;
        deep /= 2;
        var polarGap = gap * step / 100;

        offset = radius + deep;
        xOffset = offset;
        yOffset = offset;

        mov(polar(radius - deep, -polarGap));
        for (teeth = 0; teeth < teeths; teeth++) {
            C(polar(radius - xControl, -polarGap), polar(radius + deep, 5), polar(radius + deep, 12.5));
            L(polar(radius + deep, 37.5));
            C(polar(radius + deep, 45), polar(radius + xControl, 50 + polarGap), polar(radius - deep, 50 + polarGap));
            L(polar(radius - deep, 100 - polarGap));
        }
        Z();
    }

    if (axle > 0) {
        let r = axle / 2;
        mov([0, -r]);
        A(r, [0, r]);
        A(r, [0, -r]);
        Z();

    }
    return buffer;
}