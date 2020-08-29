**Usage**: `new TyrDB(props)`  
**Description**: This method create a new TyrDB instance.   

Parameters: 

- props : 

| parameters                    | type             | required       | Description                                                                                                                                                                    |  
|-------------------------------|------------------|----------------| --------------------------------------------------------------------------------- |
| **path**                      | string=.db       | no             | Metadata and JSON storage path                                                    |
| **autoInitialize**            | boolean=true     | yes (def: null)| Will automatically call [.initialize()](/docs/TyrDB/methods/initialize.md)                                                       |
| **autoConnect**               | boolean=true     | yes (def: null)| Will automatically call [.connect()](/docs/TyrDB/methods/connect.md)                                                          |

Returns : TyrDB Database instance.

Examples : 

```js
```
