import createStream from './../src/createStream';

let stream;

stream = createStream({
    columnDefault: {
        width: 50
    },
    columnCount: 1
});

setInterval(() => {
    stream.write([new Date()]);
}, 500);
