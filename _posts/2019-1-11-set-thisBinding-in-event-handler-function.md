---
tags: [javascript, closure, front-end]
title-split: Set ThisBinding / in Event Handler / Function
excerpt-separator: <!--more-->
---

When executing event handler function, This binding is set to the object which called `addEventListener`. But if you want to set the value of ThisBinding by yourself, the post offers 3 ways you can use to do it.

<!--more-->

When executing event handler function, This binding is set to the object which called `addEventListener`. It's easy to understand because in JavaScript, when a function is called on an object, `this` is binding to that object.

eg.

```javascript
document.addEventListener("DOMConteneLoaded", handlerFunction);
```
`this` in handlerFunction's execution context is point to "document".

## If you want to set the value of ThisBinding by yourself, there are 3 ways to do it:

### 1. Use a `bind()` method.
```javascript
div.addEventListener("click", handlerFunction.bind(this) {} );
```
the `bind()` method creates a new function, when called, `this` is set to the giving value, with a given sequence of arguments preceding any provided when the new function is called.
Attention: You can not use `apply()` function in this case as:

```javascript
div.addEventListener("click", handlerFunction.apply(this));
```
Different from `bind()` method, `apply()` method only pass the paremeters provided. (`bind()` methods will create a new function which pass your provided paremeters and the original paremeters.) So you will lose `event` parameter in the calling function.

Either you can not just assign `event` to the argument list:

```javascript
div.addEventListener("click", handlerFunction.apply(this, [event,]));
```
The `event` argument is not "click" in the code above. As the handler function hasn't been executed, the click event object has not been generated. So the `event` in argument list would be a outer event object. eg.
```javascript
div.addEventListener("loaded", function() {
	div.addEventListener("click", handlerFunction.apply(this, [event,]));
});
```
In this example, `event` argument will be the "loaded" event object in handlerFunction execution context.

### 2. Add a variable (`_this`) to save the value of "this".
```javascript
var _this = this;
div.addEventListener("click", function() {
    _this.handlerFunction(event);
} );
```
Anonymous functions are not bound to an object. So when excute anoymous function, `this` object points to the `window` (or `undefined` in strict mode).

### 3. Create an array function:
```javascript
div.addEventListener("click", (event) => {
    this.handlerFunction(event);
);
```

```javascript
div.addEventListener("click", (event) => {
    this.handlerFunction(event);
);
```