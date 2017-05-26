---
layout: page
title: Python Learning Summary, Part 1 - Basics
date: 2017-05-26 20:44:00 000000000 +08:00
---
* Catalog
{:toc}

## Input & Output
### Inputs and Outputs for Strings
#### Output Strings
`print` method is used to print data(strings/values/variables) on screen. for example:
```python
print "hello, world"
```

##### String Formatting
`%` is called the string formatting/interpreting operator, it is used as `format % value` to format String and Unicode objects.   

In 'format' part, the required components are the `%` charactor, and a conversion type. So the format part looks as `%s`.
These are some most used conversion types:
- `d` - demical integers
- `x` - hex integers
- `f` - floating point numbers
- `s` - strings, converted using `str()`
- `r` - strings, converted using `repr()`
_For more conversion types, please see <a href="https://docs.python.org/2/library/stdtypes.html#string-formatting-operations">here</a>._

There are also some optional components of the format part, which are:
- Mapping key - the keyword for dictionary. Mapping key may be parenthesised. 
- Flags - affect the format of output strings. such as:
	- `0` - The conversion will be zero paddled for numbers.
	- `-`  - The conversion will be left adjust. (It overrides the `0` flags)
- Minimum field width - a number to specify the width of the conversion.
- Precision - `.<precision>`, specifies the precision after demical point of a number.

In 'value' part, the values will replace the 'format' in the string.
If there is more than one value, parenthesis them after `%`.
```
>>> s1 = 'short'
>>> s2 = 'Python'
>>> print "life is %s, I use %s." % (s1, s2)
Life is short, I use Python.
```
#### Input Strings
To get input from the keyboard, use `raw_input()` method.
```
>>> s = raw_input("Please type in anything you like...")
Please type in anything you like...Python
>>> s
Python
```
In the above code block, the message "Please type in anything you like..." firstly prompt to the standard output without a new line charactor. Notice that the prompt message has to be string type, unicode type is not allowed.
Then the method gets the input string 'Python' from keyboard and returns the string. The returned string is assigned it to variable 's'.

### File I/O
To manipulate files in python, firstly open the file, then operate on it (read or write, etc). After you are done, the file has to be closed.
#### Open a file in python
`open(<filename>, <mode>)` returns a file object.
`mode` is optional for `open()` method. Modes can be followings:
- `'r'` - read only
- `'w'` - write only
- `'a'` - appending
- `'r+'` - read and write
- `'rb' 'wb' 'r+b'` - read or wtite in binary mode.

#### Manipulations on file objects
##### Read
```python
f.read()
```
`f` is the file object created by `open()` method, `f.read()` reads the data of the file and returns it as a string.
```python
f.read(size)
f.readline()
```
Read specified size of data, or read one line of the file at a time.

##### Write
```python
f.write(<string>)
```
The method writes the string to the file, and returns `None`.
If the data to write is not a string, it has to be convert to string by `str()` method first.

##### Locate
`f.tell()` returns an integer that indicates the object's current position in the file.
`f.seek()` changes the file object's position.  
- the first argument is an offset to be added to the second argument.
- the second object is the starting point for the offset. if it's `0`, means starting compulation from the beginning of the file; `1` means compute from the current position; `2` means compute from the end of the file. This argument is optional, if it is not provided, the compute for offset defaultly starts from the begining of the file.
Let's see an example:
```
# open an empty file
>>> f = open('test.txt', 'r+')
>>> s = '0123456789abcdefg'
>>> f.write(s)
>>> f.tell()
17
>>> f.read()
''
>>> f.seek(3)
>>> f.read()
'3456789abcdefg'
```
After writing the string '0123456789abcdefg' to the empty file, the file object is at the end of the string in the file, in this case, the end of the file. So the `f.read()` method reads an empty string. `f.seek(3)` locate the file object to s[3].

#### Close a file
`f.close()` close the opened file objects and release system resources.

#### Using `with` keyword
```python
with open('test.txt'. 'r+') as f:
    print f.read()
```
Equalvalent to:
```python
try:
    f = open('test.txt', 'r+')
    print f.read()
finally:
    if f:
        f.close()
```
Using the `with` keyword to deal with file object to make sure the file is properly closed.

