### Streaming

`table` package exports `createStream` function used to draw a table and append rows.

`createStream` requires `{number} columnDefault.width` and `{number} columnCount` configuration properties.

```js
import {
    createStream
} from 'table';

let config,
    stream;

config = {
    columnDefault: {
        width: 50
    },
    columnCount: 1
};

stream = createStream(config);

setInterval(() => {
    stream.write([new Date()]);
}, 500);
```

![Streaming current date.](./.README/streaming.gif)

`table` package uses ANSI escape codes to overwrite the output of the last line when a new row is printed.

The underlying implementation is explained in this [Stack Overflow answer](http://stackoverflow.com/a/32938658/368691). 