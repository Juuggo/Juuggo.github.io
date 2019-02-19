---
tags: [javascript, closure, front-end, this]
title-split: the / “this” keyword / in javascript
---

As far as I'm concerned, `this` keyword could be one of the most tricky parts in learning JavaScript. And it's so important that we have to figure it out if we want to totally get the concept of prototype inheritance and closure. Fortunately (and thankfully) there is a very clear introduction and summary on StackOverflow. So this post is a study note of it. 

## definition

`this` is a keyword that evaluates to the value of the __ThisBinding__ of the current execution context. ThisBinding is something that the JavaScript interpreter maintains as it evaluates JavaScript code, like a special CPU register which holds a reference to an object. 

## ThisBingding
The interpreter updates the ThisBinding whenever establishing an execution context in one of only three different cases:
### 1. Initial global execution context: 
__ThisBinding__ is set to** the global object**: `window`

### 2. Entering eval code
1. by a direct call to `eval()`: __ThisBinding__ is left **unchanged**, which is the same value as the __ThisBinding__ of the calling execution context.
2. not a direct call to `eval()`: __ThisBinding__ is set to **the global object** as if executing in the initial global execution context.

### 3. Entering function code
1. If a function is called on an object:  __ThisBinding__ is set to **the object** 
2. In most other cases: __ThisBinding__ is set to **the global object** 
3. 8 ECMAScript-5 built-in functions that allow ThisBinding to be specified in the arguments list:

    ```javascript
    Function.prototype.apply(thisArg, argArray)
    Function.prototype.call(thisArg [ , arg1 [ , arg2, ... ] ])
    Function.prototype.bind(thisArg [ , arg1 [ , arg2, ... ] ])
    Array.prototype.every(callbackfn [ , thisArg ])
    Array.prototype.some(callbackfn [ , thisArg ])
    Array.prototype.forEach(callbackfn [ , thisArg ])
    Array.prototype.map(callbackfn [ , thisArg ])
    Array.prototype.filter(callbackfn [ , thisArg ])
    
    // the Function.prototype functions, they are called on a function object, 
    // but rather than setting ThisBinding to the function object, ThisBinding is set to the thisArg.
    
    // the Array.prototype functions, the given callbackfn is called in an execution context 
    // where ThisBinding is set to thisArg if supplied; otherwise, to the global object.
    ```

4. Constructing a new object via the `new` operator.
The JavaScript interpreter creates a new, empty object, sets some internal properties, and then calls the constructor function on the new object. 
When a function is called in a constructor context, the value of this is the new object that the interpreter created.


## Two Tricky Examples:
#### 1. What is the value of `this` at line C? Why?
```html
<script type="text/javascript">
var obj = {
    myMethod : function () {
        // Line C
    }
};
var myFun = obj.myMethod;
myFun();
</script>
```
Answer: `window`.

Explain: Only when function is called on an object, as the following two forms, `this`  is binding to myObject.
* `myObject.myMethod();`
* `myObject.["myMethod"]()`

#### 2. What is the value of this at line D? Why?
```html
<script type="text/javascript">
function myFun() {
    // Line D
}
var obj = {
    myMethod : function () {
        eval("myFun()");
    }
};
obj.myMethod();
</script>
```
Answer: `window`

Explain: When evaluating the `eval` code, this is `obj`. However, in the `eval` code, `myFun` is not called on an object, so __ThisBinding__ is set to `window` for the call.

***

## Reference
[How does the “this” keyword work? - StackOverflow](https://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work/3127440#3127440?newreg=f8571a4823f844b3971f7ad6ade112d6)