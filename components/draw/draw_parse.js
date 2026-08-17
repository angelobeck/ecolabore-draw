
function draw_parse(tokens, values = {}) {
    var buffer = '';
    var value;
    while (tokens.length > 0) {
        if (nextToken() === ')') {
            tokens.shift();
            continue;
        }
        value = parse();
        if (typeof (value) === 'string') {
            buffer += value;
        } else {
            value = Math.round(value * 100) / 100;
            buffer += value.toString();
        }
    }
    return buffer;

    function parse() {
        var value = 0;
        var name;
        var token;
        var operator;
        var nextValue;


        if (nextToken() === 'string') {
            token = tokens.shift();
            return token.value;
        }

        if (nextToken() === 'reserved' && tokens[0].value == 'loop') {
            let counterName = 'i';
            let counterValue = 0;
            let counterMax = 0;
            tokens.shift();
            if (nextToken() === 'name') {
                counterName = tokens.shift().value;
            }
            value = parse();
            if (typeof (value) === 'number') {
                counterValue = value;
            }
            value = parse();
            if (typeof (value) === 'number') {
                counterMax = value;
            }

            let loopTokens = [];
            let level = 1;
            while (tokens.length > 0) {
                if (nextToken() === 'reserved' && tokens[0].value == 'loop') {
                    level++;
                } else if (nextToken() === 'reserved' && tokens[0].value == 'endloop') {
                    level--;
                    if (level == 0) {
                        tokens.shift();
                        break;
                    }
                }
                loopTokens.push(tokens.shift());
            }

            for (; counterValue < counterMax; counterValue++) {
                values[counterName] = counterValue;
                buffer += draw_parse([...loopTokens], values);
            }

            return '';
        }



        if (nextToken() === 'name' && tokens.length > 1 && tokens[1].type === '=') {
            token = tokens.shift();
            name = token.value;
            tokens.shift();
            value = parse();
            if (typeof (value) === 'number') {
                values[name] = value;
                return '';
            } else {
                return value;
            }
        }

        value = parseValue();

        while (tokens.length > 0) {
            if (nextToken() != 'operator')
                return value;

            operator = tokens.shift().value;

            nextValue = parseValue();

            switch (operator) {
                case '+':
                    value = value + nextValue;
                    break;

                case '-':
                    value = value - nextValue;
                    break;

                case '*':
                    value = value * nextValue;
                    break;

                case '/':
                    if (nextValue !== 0)
                        value = value / nextValue;
                    break;

                case '<':
                    if (nextValue < value)
                        value = nextValue;
                    break;

                case '>':
                    if (nextValue > value)
                        value = nextValue;
                    break;
            }
        }
        return value;
    }

    function parseValue() {
        var token;
        if (nextToken() === 'number') {
            token = tokens.shift();
            return token.value;
        }

        if (nextToken() === 'name') {
            token = tokens.shift();
            if (typeof (values[token.value]) === 'number')
                return values[token.value];
            else
                return 0;
        }

        if (nextToken() === '(') {
            tokens.shift();
            let value = parse();
            if (nextToken() === ')')
                tokens.shift();
            if (typeof (value) === 'number')
                return value;
            else
                return 0;
        }

        return 0;
    }

    function nextToken() {
        if (tokens.length === 0)
            return '';
        else
            return tokens[0].type;
    }

}
