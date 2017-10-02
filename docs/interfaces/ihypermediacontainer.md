[hydraclient.js](../README.md) > [IHypermediaContainer](../interfaces/ihypermediacontainer.md)



# Interface: IHypermediaContainer


Provides an abstraction layer over hypermedia container.

## Hierarchy


 `Array`<[IHypermedia](ihypermedia.md)>

**↳ IHypermediaContainer**







## Indexable

\[n: `number`\]:&nbsp;[IHypermedia](ihypermedia.md)
Provides an abstraction layer over hypermedia container.



## Properties

| Name  | Type                
| ------ | ------------------- 
| Array | `ArrayConstructor`
| length | `number`
| members | [IResource](iresource.md)[]


## Methods
<a id="___iterator"></a>

###  __@iterator

► **__@iterator**(): `IterableIterator`<[IHypermedia](ihypermedia.md)>




*Inherited from Array.[Symbol.iterator]*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:52*



Iterator




**Returns:** `IterableIterator`<[IHypermedia](ihypermedia.md)>





___

<a id="___unscopables"></a>

###  __@unscopables

► **__@unscopables**(): object




*Inherited from Array.[Symbol.unscopables]*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94*



Returns an object whose properties have the value 'true' when they will be absent when used in a 'with' statement.




**Returns:** object





___

<a id="concat"></a>

###  concat

► **concat**(...items: *[IHypermedia](ihypermedia.md)[][]*): [IHypermedia](ihypermedia.md)[]

► **concat**(...items: *(`T`[]⎮`T`)[]*): [IHypermedia](ihypermedia.md)[]




*Inherited from Array.concat*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1134*



Combines two or more arrays.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| items | [IHypermedia](ihypermedia.md)[][] | Additional items to add to the end of array1. |





**Returns:** [IHypermedia](ihypermedia.md)[]




*Inherited from Array.concat*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1139*



Combines two or more arrays.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| items | (`T`[]⎮`T`)[] | Additional items to add to the end of array1. |





**Returns:** [IHypermedia](ihypermedia.md)[]





___

<a id="copywithin"></a>

###  copyWithin

► **copyWithin**(target: *`number`*, start: *`number`*, end?: *`number`*): `this`




*Inherited from Array.copyWithin*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:69*



Returns the this object after copying a section of the array identified by start and end to the same array starting at position target


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| target | `number` | If target is negative, it is treated as length+target where length is thelength of the array. |
| start | `number` | If start is negative, it is treated as length+start. If end is negative, itis treated as length+end. |
| end | `number` | If not specified, length of the this object is used as its default value. |





**Returns:** `this`





___

<a id="entries"></a>

###  entries

► **entries**(): `IterableIterator`<[`number`,[IHypermedia](ihypermedia.md)]>




*Inherited from Array.entries*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:57*



Returns an array of key, value pairs for every entry in the array




**Returns:** `IterableIterator`<[`number`,[IHypermedia](ihypermedia.md)]>





___

<a id="every"></a>

###  every

► **every**(callbackfn: *function*): `boolean`

► **every**(callbackfn: *function*, thisArg: *`undefined`*): `boolean`

► **every**Z(callbackfn: *function*, thisArg: *`Z`*): `boolean`




*Inherited from Array.every*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1199*



Determines whether all the members of an array satisfy the specified test.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array. |





**Returns:** `boolean`




*Inherited from Array.every*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1200*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** `boolean`




*Inherited from Array.every*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1201*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** `boolean`





___

<a id="fill"></a>

###  fill

► **fill**(value: *[IHypermedia](ihypermedia.md)*, start?: *`number`*, end?: *`number`*): `this`




*Inherited from Array.fill*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:58*



Returns the this object after filling the section identified by start and end with value


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| value | [IHypermedia](ihypermedia.md) | value to fill array section with |
| start | `number` | index to start filling the array at. If start is negative, it is treated aslength+start where length is the length of the array. |
| end | `number` | index to stop filling the array at. If end is negative, it is treated aslength+end. |





**Returns:** `this`





___

<a id="filter"></a>

###  filter

► **filter**(callbackfn: *function*): [IHypermedia](ihypermedia.md)[]

► **filter**(callbackfn: *function*, thisArg: *`undefined`*): [IHypermedia](ihypermedia.md)[]

► **filter**Z(callbackfn: *function*, thisArg: *`Z`*): [IHypermedia](ihypermedia.md)[]




*Inherited from Array.filter*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1263*



Returns the elements of an array that meet the condition specified in a callback function.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |





**Returns:** [IHypermedia](ihypermedia.md)[]




*Inherited from Array.filter*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1264*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** [IHypermedia](ihypermedia.md)[]




*Inherited from Array.filter*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1265*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** [IHypermedia](ihypermedia.md)[]





___

<a id="find"></a>

###  find

► **find**(predicate: *function*): [IHypermedia](ihypermedia.md)⎮`undefined`

► **find**(predicate: *function*, thisArg: *`undefined`*): [IHypermedia](ihypermedia.md)⎮`undefined`

► **find**Z(predicate: *function*, thisArg: *`Z`*): [IHypermedia](ihypermedia.md)⎮`undefined`




*Inherited from Array.find*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:33*



Returns the value of the first element in the array where predicate is true, and undefined otherwise.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | find calls predicate once for each element of the array, in ascendingorder, until it finds one where predicate returns true. If such an element is found, findimmediately returns that element value. Otherwise, find returns undefined. |





**Returns:** [IHypermedia](ihypermedia.md)⎮`undefined`




*Inherited from Array.find*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:34*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | - |
| thisArg | `undefined` | - |





**Returns:** [IHypermedia](ihypermedia.md)⎮`undefined`




*Inherited from Array.find*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:35*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | - |
| thisArg | `Z` | - |





**Returns:** [IHypermedia](ihypermedia.md)⎮`undefined`





___

<a id="findindex"></a>

###  findIndex

► **findIndex**(predicate: *function*): `number`

► **findIndex**(predicate: *function*, thisArg: *`undefined`*): `number`

► **findIndex**Z(predicate: *function*, thisArg: *`Z`*): `number`




*Inherited from Array.findIndex*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:46*



Returns the index of the first element in the array where predicate is true, and -1 otherwise.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | find calls predicate once for each element of the array, in ascendingorder, until it finds one where predicate returns true. If such an element is found,findIndex immediately returns that element index. Otherwise, findIndex returns -1. |





**Returns:** `number`




*Inherited from Array.findIndex*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:47*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | - |
| thisArg | `undefined` | - |





**Returns:** `number`




*Inherited from Array.findIndex*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.core.d.ts:48*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| predicate | function | - |
| thisArg | `Z` | - |





**Returns:** `number`





___

<a id="foreach"></a>

###  forEach

► **forEach**(callbackfn: *function*): `void`

► **forEach**(callbackfn: *function*, thisArg: *`undefined`*): `void`

► **forEach**Z(callbackfn: *function*, thisArg: *`Z`*): `void`




*Inherited from Array.forEach*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1215*



Performs the specified action for each element in an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |





**Returns:** `void`




*Inherited from Array.forEach*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1216*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** `void`




*Inherited from Array.forEach*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1217*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** `void`





___

<a id="includes"></a>

###  includes

► **includes**(searchElement: *[IHypermedia](ihypermedia.md)*, fromIndex?: *`number`*): `boolean`




*Inherited from Array.includes*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2016.array.include.d.ts:27*



Determines whether an array includes a certain element, returning true or false as appropriate.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| searchElement | [IHypermedia](ihypermedia.md) | The element to search for. |
| fromIndex | `number` | The position in this array at which to begin searching for searchElement. |





**Returns:** `boolean`





___

<a id="indexof"></a>

###  indexOf

► **indexOf**(searchElement: *[IHypermedia](ihypermedia.md)*, fromIndex?: *`number`*): `number`




*Inherited from Array.indexOf*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1187*



Returns the index of the first occurrence of a value in an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| searchElement | [IHypermedia](ihypermedia.md) | The value to locate in the array. |
| fromIndex | `number` | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |





**Returns:** `number`





___

<a id="join"></a>

###  join

► **join**(separator?: *`string`*): `string`




*Inherited from Array.join*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1144*



Adds all the elements of an array separated by the specified separator string.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| separator | `string` | A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma. |





**Returns:** `string`





___

<a id="keys"></a>

###  keys

► **keys**(): `IterableIterator`<`number`>




*Inherited from Array.keys*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:62*



Returns an list of keys in the array




**Returns:** `IterableIterator`<`number`>





___

<a id="lastindexof"></a>

###  lastIndexOf

► **lastIndexOf**(searchElement: *[IHypermedia](ihypermedia.md)*, fromIndex?: *`number`*): `number`




*Inherited from Array.lastIndexOf*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1193*



Returns the index of the last occurrence of a specified value in an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| searchElement | [IHypermedia](ihypermedia.md) | The value to locate in the array. |
| fromIndex | `number` | The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array. |





**Returns:** `number`





___

<a id="map"></a>

###  map

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*): [`U`,`U`,`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`undefined`*): [`U`,`U`,`U`,`U`,`U`]

► **map**Z,U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`Z`*): [`U`,`U`,`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*): [`U`,`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`undefined`*): [`U`,`U`,`U`,`U`]

► **map**Z,U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`Z`*): [`U`,`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*): [`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`undefined`*): [`U`,`U`,`U`]

► **map**Z,U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`Z`*): [`U`,`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*): [`U`,`U`]

► **map**U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`undefined`*): [`U`,`U`]

► **map**Z,U(this: *[[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)]*, callbackfn: *function*, thisArg: *`Z`*): [`U`,`U`]

► **map**U(callbackfn: *function*): `U`[]

► **map**U(callbackfn: *function*, thisArg: *`undefined`*): `U`[]

► **map**Z,U(callbackfn: *function*, thisArg: *`Z`*): `U`[]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1223*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |





**Returns:** [`U`,`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1224*



**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** [`U`,`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1225*



**Type parameters:**

#### Z 
#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** [`U`,`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1231*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |





**Returns:** [`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1232*



**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** [`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1233*



**Type parameters:**

#### Z 
#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** [`U`,`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1239*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |





**Returns:** [`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1240*



**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** [`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1241*



**Type parameters:**

#### Z 
#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** [`U`,`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1247*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |





**Returns:** [`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1248*



**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** [`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1249*



**Type parameters:**

#### Z 
#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| this | [[IHypermedia](ihypermedia.md),[IHypermedia](ihypermedia.md)] | - |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** [`U`,`U`]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1255*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |





**Returns:** `U`[]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1256*



**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** `U`[]




*Inherited from Array.map*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1257*



**Type parameters:**

#### Z 
#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** `U`[]





___

<a id="pop"></a>

###  pop

► **pop**(): [IHypermedia](ihypermedia.md)⎮`undefined`




*Inherited from Array.pop*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1129*



Removes the last element from an array and returns it.




**Returns:** [IHypermedia](ihypermedia.md)⎮`undefined`





___

<a id="push"></a>

###  push

► **push**(...items: *[IHypermedia](ihypermedia.md)[]*): `number`




*Inherited from Array.push*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1125*



Appends new elements to an array, and returns the new length of the array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| items | [IHypermedia](ihypermedia.md)[] | New elements of the Array. |





**Returns:** `number`





___

<a id="reduce"></a>

###  reduce

► **reduce**(callbackfn: *function*, initialValue?: *[IHypermedia](ihypermedia.md)*): [IHypermedia](ihypermedia.md)

► **reduce**U(callbackfn: *function*, initialValue: *`U`*): `U`




*Inherited from Array.reduce*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1271*



Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| initialValue | [IHypermedia](ihypermedia.md) | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** [IHypermedia](ihypermedia.md)




*Inherited from Array.reduce*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1277*



Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| initialValue | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** `U`





___

<a id="reduceright"></a>

###  reduceRight

► **reduceRight**(callbackfn: *function*, initialValue?: *[IHypermedia](ihypermedia.md)*): [IHypermedia](ihypermedia.md)

► **reduceRight**U(callbackfn: *function*, initialValue: *`U`*): `U`




*Inherited from Array.reduceRight*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1283*



Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| initialValue | [IHypermedia](ihypermedia.md) | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** [IHypermedia](ihypermedia.md)




*Inherited from Array.reduceRight*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1289*



Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Type parameters:**

#### U 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| initialValue | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** `U`





___

<a id="reverse"></a>

###  reverse

► **reverse**(): [IHypermedia](ihypermedia.md)[]




*Inherited from Array.reverse*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1148*



Reverses the elements in an Array.




**Returns:** [IHypermedia](ihypermedia.md)[]





___

<a id="shift"></a>

###  shift

► **shift**(): [IHypermedia](ihypermedia.md)⎮`undefined`




*Inherited from Array.shift*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1152*



Removes the first element from an array and returns it.




**Returns:** [IHypermedia](ihypermedia.md)⎮`undefined`





___

<a id="slice"></a>

###  slice

► **slice**(start?: *`number`*, end?: *`number`*): [IHypermedia](ihypermedia.md)[]




*Inherited from Array.slice*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1158*



Returns a section of an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| start | `number` | The beginning of the specified portion of the array. |
| end | `number` | The end of the specified portion of the array. |





**Returns:** [IHypermedia](ihypermedia.md)[]





___

<a id="some"></a>

###  some

► **some**(callbackfn: *function*): `boolean`

► **some**(callbackfn: *function*, thisArg: *`undefined`*): `boolean`

► **some**Z(callbackfn: *function*, thisArg: *`Z`*): `boolean`




*Inherited from Array.some*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1207*



Determines whether the specified callback function returns true for any element of an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array. |





**Returns:** `boolean`




*Inherited from Array.some*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1208*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `undefined` | - |





**Returns:** `boolean`




*Inherited from Array.some*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1209*



**Type parameters:**

#### Z 
**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| callbackfn | function | - |
| thisArg | `Z` | - |





**Returns:** `boolean`





___

<a id="sort"></a>

###  sort

► **sort**(compareFn?: *function*): `this`




*Inherited from Array.sort*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1163*



Sorts an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| compareFn | function | The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order. |





**Returns:** `this`





___

<a id="splice"></a>

###  splice

► **splice**(start: *`number`*, deleteCount?: *`number`*): [IHypermedia](ihypermedia.md)[]

► **splice**(start: *`number`*, deleteCount: *`number`*, ...items: *[IHypermedia](ihypermedia.md)[]*): [IHypermedia](ihypermedia.md)[]




*Inherited from Array.splice*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1169*



Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| start | `number` | The zero-based location in the array from which to start removing elements. |
| deleteCount | `number` | The number of elements to remove. |





**Returns:** [IHypermedia](ihypermedia.md)[]




*Inherited from Array.splice*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1176*



Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| start | `number` | The zero-based location in the array from which to start removing elements. |
| deleteCount | `number` | The number of elements to remove. |
| items | [IHypermedia](ihypermedia.md)[] | Elements to insert into the array in place of the deleted elements. |





**Returns:** [IHypermedia](ihypermedia.md)[]





___

<a id="tolocalestring"></a>

###  toLocaleString

► **toLocaleString**(): `string`




*Inherited from Array.toLocaleString*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1120*





**Returns:** `string`





___

<a id="tostring"></a>

###  toString

► **toString**(): `string`




*Inherited from Array.toString*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1119*



Returns a string representation of an array.




**Returns:** `string`





___

<a id="unshift"></a>

###  unshift

► **unshift**(...items: *[IHypermedia](ihypermedia.md)[]*): `number`




*Inherited from Array.unshift*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:1181*



Inserts new elements at the start of an array.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| items | [IHypermedia](ihypermedia.md)[] | Elements to insert at the start of the Array. |





**Returns:** `number`





___

<a id="values"></a>

###  values

► **values**(): `IterableIterator`<[IHypermedia](ihypermedia.md)>




*Inherited from Array.values*

*Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es2015.iterable.d.ts:67*



Returns an list of values in the array




**Returns:** `IterableIterator`<[IHypermedia](ihypermedia.md)>





___


