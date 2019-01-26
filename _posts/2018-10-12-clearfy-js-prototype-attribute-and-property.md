---
layout: post
tags: [ex, quas, javscript, test,  petentium]
title-split: clearfy / js prototype attribute / and property 
---
Introduction.
Lorem ipsum dolor sit amet, tamquam voluptua accommodare qui ne. Prima dicunt saperet duo ei, est dolor dissentias ut, ut possim percipit ius. Eu mea mucius virtute. Eloquentiam contentiones cum ut, vim at apeirian constituam, sanctus fabellas percipitur est an. Qui mucius noster constituam ut, ne tation tamquam accusata pro, per ex quas petentium. Errem apeirian et eum, cum an facete eruditi, est an homero dictas facilisi.


# prototype property v.s. prototype attribute
## prototype property
every JavaScript function has a prototype property.
The prototype property is empty by default.
Attach properties and methods on this prototype property when you want to implement inheritance. Those properties and methods will be avaliable to instance of that function.

e.g.
```javascript
function PrintStuff () {}

var newObj = new PrintStuff ();
```
Properties and methods of `PrintStuff.prototype` will be inherited to `newObj`.

# prototype attribute (also referred to as the prototype object, "parent", or just prototype)
When create a new object, the prototype object is set automatically.
All object inherits properties from its prototype object/attribute.

e.g. `newObj`‘s prototype is `PrintStuff.prototype`.

# 2 general ways an object’s prototype attribute is set when an object is created
An object created with an object literal (`var newObj = {}`) inherits properties from `Object.prototype` 
Its prototype object (or prototype attribute) is `Object.prototype`.

An object is created from a constructor function such as `new Object ()`, `new Fruit ()` or `new Array ()` or `new Anything ()`,
its prototype is `Object.prototype`, `Fruit.prototype`, `Array.prototype`, `Anything.prototype`

All built-in constructors (`Array ()`, `Number ()`, `String ()`, etc.) were created from the `Object` constructor, and as such their prototype is `Object.prototype`.
`Object.prototype` itself does not inherit any methods or properties from any other object.

# Useness of prototype
Prototype Property: Inheritance of properties and methods
e.g.
```javascript
function Plant () {}
Plant.prototype.property1 = function () {}
function Fruit () {}

// Fruit.prototype inherit all of Plant.prototype methods and properies 
Fruit.prototype = new Plant ();

var aBanana = new Fruit();
```
`aBanana` inherit all the `Fruit.prototype` properties, and methods and all the properties and methods from the `Fruit’s prototype`, which is `Plant.prototype`
Prototype Attribute: Accessing properties and methods.

the prototype chain: 
the chain from an object’s prototype to its prototype’s prototype and onwards. 
JavaScript uses this prototype chain to look for properties and methods of an object.
If the property does not exist on any of the object’s prototype in its prototype chain, then the property does not exist and `undefined` is returned.
the `__proto__` “pseudo” property

Firefox, Safari and Chrome
To access an object’s prototype property.
"Prototype" property is not enumerable; that is, it isn’t accessible in a `for/in` loop.
`__proto__` also contains an object’s prototype object.
all objects that inherit from another object also inherit a `constructor` property. 
e.g.
```javascript
var myObj = new Object ();
console.log(myObj.constructor); // Object()

var userAccount = new Account (); 
console.log(userAccount.constructor); // Account()
```

***
# Reference
[JavaScript Prototype in Plain Language](http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/)
