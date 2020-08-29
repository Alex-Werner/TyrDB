**Usage**: `new Database(props)`  
**Description**: This method create a new Database associated to the tyrInstance.   
**Notes**: As it is directly linked to a tyr instance, you might want to rely on `TyrDB.db(props)` instead.   

Parameters: 

- props : 

| parameters                    | type            | required       | Description                                                                                                                                                                    |  
|-------------------------------|-----------------|----------------| --------------------------------------------------------------------------------- |
| **name**                      | string          | yes            | The  name of the database                                                       |
| **adapter**                   | string          | yes (def: null)| The adapter                                                    |
| **tyrInstance**               | TyrDB           | yes            | The linked tyr instance                                                           |

Returns : Database instance.

Examples : 

```js

```
