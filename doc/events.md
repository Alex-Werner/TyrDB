## Events 

```js
const TyrDB = require('tyrdb');
const {MemoryAdapter} = require('tyrdb/adapters')

const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});
const dbName = 'myproject';

function start(){
 const db = client.db(dbName);
 client.close();
}
db.on('ready',start);
```
### Event types : 
- ready
- initialized
