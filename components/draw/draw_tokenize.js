
function draw_tokenize(input) {
    var tokens = [];
    var length = input.length;
    var index = 0;
    var char;
    var start;

    while (index < length) {
        start = input.indexOf('{', index);
        if (start === -1) {
            if (index < length)
                tokens.push({
                    type: 'string',
                    value: input.substring(index)
                });
            return tokens;
        }

        if (index < start) {
            tokens.push({
                type: 'string',
                value: input.substring(index, start)
            });
        }
        index = start + 1;

        while (index < length) {
            char = input.charAt(index);
            if (char === '}') {
                index++;
                removeLineBreak();
                break;
            }

            switch (char) {
                case ' ':
                    index++;
                    break;

                case '(':
                case ')':
                case '=':
                    index++;
                    tokens.push({ type: char });
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '<':
                case '>':
                    index++;
                    tokens.push({
                        type: 'operator',
                        value: char
                    });
                    break;

                default:
                    if (/^[a-zA-Z_]$/.test(char))
                        findName();
                    else if (/^[0-9.]$/.test(char))
                        findNumber();
                    else
                        index++;
            }
        }
    }

    return tokens;

    function findNumber() {
        var buffer = '';
        while (index < length) {
            const char = input.charAt(index);
            if (/^[0-9.]$/.test(char)) {
                buffer += char;
                index++;
            } else {
                let value = parseFloat(buffer);
                if (Number.isNaN(value))
                    value = 0;

                tokens.push({
                    type: 'number',
                    value: value
                });
                return;
            }
        }
    }

    function findName() {
        var buffer = '';
        while (index < length) {
            const char = input.charAt(index);
            if (/^[a-zA-Z_]$/.test(char)) {
                buffer += char;
                index++;
            } else {
                switch (buffer) {
                    case 'loop':
                    case 'endloop':
                        tokens.push({
                            type: 'reserved',
                            value: buffer
                        });
                        break;

                    default:
                        tokens.push({
                            type: 'name',
                            value: buffer
                        });
                }
                return;
            }
        }
    }

    function removeLineBreak() {
        if (index < length && input.charAt(index) === "\r") {
            index++;
        }
        if (index < length && input.charAt(index) === "\n") {
            index++;
        }
    }

}
