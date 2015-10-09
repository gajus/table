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

Streaming supports all of the configuration properties and functionality of a static table (such as auto text wrapping, alignment and padding), e.g.

```js
import {
    createStream
} from 'table';

import _ from 'lodash';

let config,
    stream,
    i;

config = {
    columnDefault: {
        width: 50
    },
    columnCount: 3,
    columns: {
        0: {
            width: 10,
            alignment: 'right'
        },
        1: {
            alignment: 'center',
        },
        2: {
            width: 10
        }
    }
};

stream = createStream(config);

i = 0;

setInterval(() => {
    let random;

    random = _.sample('abcdefghijklmnopqrstuvwxyz', _.random(1, 30)).join('');

    stream.write([i++, new Date(), random]);
}, 500);
```

![Streaming random data.](./.README/streaming-random.gif)