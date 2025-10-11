# Answering on 5 JS questions

## 1. _What is a closure?_

It is combination of JS function with references to all accessible variables from local, uppers, and global scope.

```javascript
// two global variables: scale and mainDiv
const scale = 10;
// create div
const mainDiv = document.createElement('div');
mainDiv.id = 'main-div';
mainDiv.style.width = '1';
mainDiv.style.height = '1';
mainDiv.style.position = 'absolute';
mainDiv.style.backgroundColor = 'rgba(0,0,200,0.5)';
mainDiv.style.left = '0';
mainDiv.style.top = '0';
// add div to a page
document.body.appendChild(mainDiv);

// encapsulates value of that passed to the function by size parameter
function sizer(size) {
  // returns a function that will resize the div
  return function () {
    // access size argument value
    console.log(`setting width and height to be ${size}px`);
    // access adn manipulates with global variable mainDiv
    mainDiv.style.width = `${size}px`;
    mainDiv.style.height = `${size}px`;
  };
}

// create a function that will resize the div with 3 different values
const size10 = sizer(scale);
const size20 = sizer(2 * scale);
const size30 = sizer(3 * scale);

// 3 different results
size30();
size20();
size10();

// creating 3 different buttons with their own onClick functions
for (let i = 0; i < 3; i++) {
  // add a button
  const button = document.createElement('button');
  button.innerText = `set font size to ${i + scale} px`;
  button.addEventListener('click', sizer(scale * 10));
  document.body.appendChild(button);
}
```

## 2. _In a garbage-collected language like JavaScript, how are memory leaks possible? Describe the low-level mechanics of a memory leak._

Memory leaks may happen when some data in memory is not used by the application, but still is not reported as free and have some existing references somewhere in the application.

Some possible reasons:

### 1. _Global scope variables_

```javascript
function foo(arg) {
  bar = 'this is a hidden global variable';
}
```

### 2. _Lost callback or timers_

```javascript
// create button and add event listener and append it to body
const button = document.createElement('button');
button.innerText = 'Click me';
button.addEventListener('click', () => {
  console.log('clicked');
});
document.body.appendChild(button);

// let's remove event listener in order to avoid memory leaks
button.removeEventListener('click', () => {
  console.log('removed');
});

// now do removal of the button from the DOM
document.body.removeChild(button);
```

### 3. _Closures ([The Sing Case](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/))_

```javascript
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) console.log('hi');
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    },
  };
};
setInterval(replaceThing, 1000);
```

### 4. _Dom Manipulation_

```javascript
// create dom elements: button, image and text
const block = {
  button: document.createElement('button'),
  image: document.createElement('img'),
  text: document.createElement('p'),
};

// add elements to DOM
document.body.appendChild(block.button);
document.body.appendChild(block.image);
document.body.appendChild(block.text);

function changeBlock() {
  block.button.textContent = 'Click me!';
  block.image.src = 'https://source.unsplash.com/random/400x200';
  block.text.textContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}

// now let's remove elements from DOM
document.body.removeChild(block.button);
document.body.removeChild(block.image);
document.body.removeChild(block.text);

// but we still have references to them in a block in a changeBlock function
```

### 5. _Caching and memoization_

When a developer wants to optimize an app and stores data for a "_quick access_"

## 3. _What would be the challenges in implementing a dead code elimination tool that targets JavaScript, as opposed to one that targets a language like C# or Java?_

Dynamic typings and dynamic scripts executions, JS inheritance, anonymous functions that we can assign to variables, change in runtime and so on.

## 4. _JavaScript's performance has improved significantly over the past 10, 5 years, and is continuing to do so. What are some implementation techniques that have enabled this?_

Improved garbage collection, cache and optimization, Web Workers and concurrency, JS interpreters

## 5. _New JavaScript language features have been added over the past 10, 5 years, too. Is it possible that new language features can actually improve the performance of applications? Or, would you expect new language features, in general, to have either zero or negative effect on performance? Why or why not?_

Yes and No. Some new features were created for the performance, some were created for language usability and add complexity to the language and challenges for optimization

Some methods become stable and optimized, async for-await-of operator, new data manipulation structures, object methods, async/await methods, rest and spread operators, etc.

But Some new methods may not be optimized or cause to add complexity. Various asynchronous operations, generators. Or sometimes spread operators can lead to computational overhead.
