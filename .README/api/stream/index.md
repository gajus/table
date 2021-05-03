### createStream

`table` package exports `createStream` function used to draw a table and append rows.

**Parameter:**
 - _**config:**_ the same as `table`'s, except `config.columnDefault.width` and `config.columnCount` must be provided.


```js
import { createStream } from 'table';

const config = {
  columnDefault: {
    width: 50
  },
  columnCount: 1
};

const stream = createStream(config);

setInterval(() => {
  stream.write([new Date()]);
}, 500);
```

![Streaming current date.](./.README/api/stream/streaming.gif)

`table` package uses ANSI escape codes to overwrite the output of the last line when a new row is printed.

The underlying implementation is explained in this [Stack Overflow answer](http://stackoverflow.com/a/32938658/368691).

Streaming supports all of the configuration properties and functionality of a static table (such as auto text wrapping, alignment and padding), e.g.

```js
import { createStream } from 'table';

import _ from 'lodash';

const config = {
  columnDefault: {
    width: 50
  },
  columnCount: 3,
  columns: [
    {
      width: 10,
      alignment: 'right'
    },
    { alignment: 'center' },
    { width: 10 }

  ]
};

const stream = createStream(config);

let i = 0;

setInterval(() => {
  let random;

  random = _.sample('abcdefghijklmnopqrstuvwxyz', _.random(1, 30)).join('');

  stream.write([i++, new Date(), random]);
}, 500);
```

![Streaming random data.](./.README/api/stream/streaming-random.gif)
