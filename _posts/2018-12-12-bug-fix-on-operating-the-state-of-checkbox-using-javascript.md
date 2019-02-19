---
tags: [jquery, front-end, dom]
title-split: Bug fix / on operating / the state of checkbox / using jquery
---
When I was writing a demo days before, I set an invisible check-box element in the page. It is intended to be implicitly checked and unchecked when specific user event  occurs. I tried to set the attribute of the check-box element by jQuery. However it doesn't work at all. After doing some search, I understood I should use `prop()` method instead of `attr()`  method to do it and there is some minor difference between them.

## The commonality of prop() and attr()  methods

In most instance, It do the same thing when using the jQuery method `prop()` and `attr()`, since they are both used to set the property / attribute of a Dom object. The attributes and property of an element can be mostly similar.

## When it comes to setting boolean values...

When it comes to boolean values of a Dom object, the situation becomes a bit different.

Take `checkbox` for example. 

* The attribute `checked` of check-box is either `checked` or `undefined`. It is set when the Dom Content load at the first time, and will not change even if you check or uncheck the box next.
* The property `checked` of check-box is either `true` or `false`. And it changes with the state of check-box. When the box is checked, the value of `checked` property is `true`. And it becomes `false` if the box get unchecked.



After figuring this out, It's obvious that how we can change the check-box state by jQuery:

```jQuery
$("#checkbox-id").prop("checked",true);
// or
$("#checkbox-id").get(0).checked = true;
```

Meanwhile, to set check-box state by JavaScript:

```javascript
document.getElementById("#id").checked = true;
```



## The difference between DOM attribute and DOM property

_( Waiting to be completed... )_



## Reference:

[Attributes and properties - JavaScript Info](https://javascript.info/dom-attributes-and-properties)