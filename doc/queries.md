## Queries

Queries system is herited from the use of the [SBTree](https://github.com/Alex-Werner/SBTree) library.   

### Comparators 

| Name         	| Description                                                             	| Examples                                       	|
|--------------	|-------------------------------------------------------------------------	|------------------------------------------------	|
| implicit $eq 	| Standard query. Matches documents that equal to the specified value.    	| `.find({age:33})`                     	|
| $eq          	| Same as above. But explicit.                                            	| `.find({age:{$eq:33})`                	|
| $ne          	| Matches documents that are NOT equal to specified value.                	| `.find({age:{$ne:33})`               	|
| $gt          	| Matches documents that are greater than a specified value.              	| `.find({age:{$gt:18})`                	|
| $gte         	| Matches documents that are greater or equal than a specified value.     	| `.find({age:{$gte:18})`               	|
| $lt          	| Matches documents that are less than a specified value.                 	| `.find({age:{$lt:50})`                	|
| $lte         	| Matches documents that are less than or equals a specified value.       	| `.find({age:{$lte:50})`               	|

