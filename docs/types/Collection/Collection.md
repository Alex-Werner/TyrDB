**Usage**: `new Collection(props)`  
**Description**: This method create a new Collection associated to the tyrInstance.   
**Notes**: As it is directly linked to a tyr instance, you might want to rely on `Database.collection(props)` instead.   

Parameters: 

- props : 

| parameters                    | type            | required       | Description                                                                                                                                                                    |  
|-------------------------------|-----------------|----------------| --------------------------------------------------------------------------------- |
| **name**                      | string          | yes            | The  name of the collection                                                       |
| **parentDatabaseName**        | string          | yes (def: null)| The parent database name                                                          |
| **tyrInstance**               | TyrDB           | yes            | The linked tyr instance                                                           |
| **injectDefaultPlugins**      | boolean         | no (def: true) | Use to inject default plugins on loadup (BIP44Worker, ChainWorker and SyncWorker) |
| **uniques**                   | Array           | no (def: [])   | To set some props as uniques                                                      |
| **exclude**                   | Array           | no (def: [])   | To exclude some props                                                             |
| **order**                     | Integer         | no (def: 511)  | The order of the collection tree                                                  |

Returns : Collection instance.

Examples : 

```js
```
