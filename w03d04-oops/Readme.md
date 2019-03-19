# Day's Title 

## Learning Competencies
* OOP concepts: encapsulation, abstraction, inheritance
* Implemention of prototypal inheritance in javaScript and compare and contrast different approaches to inheritance
* Learn about object's prototype
* Explain what effect using the new keyword has on an object's prototype
* Explain why functions should be added to the prototype instead of the constructor function
* Create a "class" in javascript that inherits from a parent "class"

## Overview

### Wiki Says
> Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods. A feature of objects is that an object's procedures can access and often modify the data fields of the object with which they are associated (objects have a notion of "this" or "self"). In OOP, computer programs are designed by making them out of objects that interact with one another. There is significant diversity of OOP languages, but the most popular ones are class-based, meaning that objects are instances of classes, which typically also determine their type.


### What is Object Oriented Programming?
Object oriented programming is a method of programming that attempts to model some process or thing in the world as a **class** or **object**. An object in this case is not the same as JavaScript's version of an object. Instead, you can conceptually think of a class or object as something that has data and can perform operations on that data. With object oriented programming, the goal is to encapsulate your code into logical groupings using classes so that you can reason about your code at a higher level. Let's see an example:

#### Poker Example
Say we want to model a game of poker in our program. We could write the program using an array to represent the deck of cards, and then other arrays to represent what each player has in their hand. Then we'd have to write a lot of functions to do things like deal, draw cards, see who wins, etc.

When you end up writing large functions involving basic data structures and lots of code in one file, there is usually a better way to organize your code. Instead of trying to do everything at once, we could **separate concerns**.

When thinking about a game of poker, some larger processes and objects stand out that you will want to capture in your code:

* Card
* Deck of cards
* Poker hand
* Poker game
* Discard pile (maybe)
* Player
* Bets

Each one of these components could be a class in your program. Let's pick one of the potential classes and figure out the data that it will hold and the functions that it should be able to perform:

**Deck of cards**

* Cards - the deck should have 52 different playing cards
* Shuffle - the deck should be able to shuffle itself
* Deal a card - the deck should be able to remove a card from itself and deal it to a player
* Deal a hand - the deck should be able to deal a hand to a player or set of players

Now that we can conceptualize how a problem can be broken down into classes, let's talk about why programming this way can be useful.

#### Encapsulation
Encapsulation is the idea that data and processes on that data are owned by a class. Other functions or classes outside of that class should not be able to directly change the data.

In our deck class, we have 52 cards. The player class should not be able to choose any card he or she wants from the deck or change the order of a deck manually. Instead a player can only be dealt a hand. The contents of the deck is said to be encapsulated into the deck class because the deck owns the array of cards and it will not allow other classes to access it directly.

#### Abstraction
Abstraction is the result of a good object oriented design. Rather than thinking about the details of how a class works internally, you can think about it at a higher level. You can see all of the functions that are made available by the class and understand what the class does without having to see all of the code.

Continuing with our example, if you had a deck of cards class and you saw that you could call the `.shuffle()` function or the `.deal()` function, you would have a good understanding of what the class does and what functionality it provides without having to understand how the functions are working internally.

#### Inheritance
Inheritance is when a child class inherits functionality from a parent class. For example, a parent class may be an automobile, and it could have a child class for sports car or for truck that has different or more specific characteristics. Both sports cars and trucks share some properties in common but they also have differences that are specific to their own class. So the truck class would inherit functionality from automobile and the sports car class would inherit from automobile as well.

#### Polymorphism
Polymorphism may be useful to understand at a high level now, but we will not focus on it when we do OOP in JavaScript. Polymorphism doesn't apply very well to a language like JavaScript.

Polymorphism is the idea that an instance of a child class can be treated as if the child class were the parent class. The child can implement functionality that is specific to its class, but it can be called in the context of the parent. Going back to the automobile example. We could treat both a sports car and a truck as an automobile. An automobile may define an `openTrunk` function. That function could be implemented differently for a sports car versus a truck, but it would still be available to be called by an automobile.

We will not cover these topics in great depth but it's good to understand what they are so that you are not surprised when you read more about OOP, especially in other languages.


### Constructor
> In class-based object-oriented programming, a constructor in a class is a special type of subroutine called to create an object. It prepares the new object for use, often accepting arguments that the constructor uses to set required member variables.

#### The meaning / purpose of a constructor function
Let's imagine that we are tasked with building an application that requires us to create `car` objects. Each car that we create should have a make, model and year. So we get started by doing something like this:
```js
var car1 = {
    make: "Honda",
    model: "Accord",
    year: 2002
}
var car2 = {
    make: "Mazda",
    model: "6",
    year: 2008
}
var car3 = {
    make: "BMW",
    model: "7 Series",
    year: 2012
}
var car4 = {
    make: "Tesla",
    model: "Model X",
    year: 2016
}
```
But notice how much duplication is going on! All of these objects look the same, yet we are repeating ourselves over and over again. It would be really nice to have a **blueprint** that we could work off of to reduce the amount of code that we have. That "blueprint" is exactly what a constructor function provides! Constructor functions are the closest thing we have to classes in JavaScript.


#### Our first constructor function
So what is a constructor function? It's written just like any other function, except that by convention we capitalize the name of the function to denote that it is a constructor. We call these functions constructors because their job is to construct objects. Here is what a constructor function to create car objects might look like. Notice the capitalization of the name of the function; this is a **best** practice when creating constructor functions so that other people know what kind of function it is.
```js
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
}
```
So how do constructor functions actually "construct" these objects? Through the new keyword that we saw before. To construct a new `Car`, use `new`:
```js
var probe = new Car('Ford', 'Probe', 1993);
var cmax = new Car('Ford', 'C-Max', 2014);

probe.make;  // Returns "Ford"
cmax.year;   // Returns 2014
```


Let's quickly refresh our memory about what the `new` keyword does.

#### What does the `new` keyword do?
When `new` is used, the following happens:

1. An empty object is created,
2. The keyword `this` inside of the constructor function refers to the empty object that was just created,
3. A `return this` is added to the constructor function (this is why you don't need to explicitly return any value),
4. An internal link is created between the object and the `.prototype` property on the constructor function. We can actually access this link on the object that is created: it is called `__proto__`, sometimes pronounced "dunder" (double underscore) proto.
```js
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
}

var car = new Car("Buatti", "Chiron", 2017);
car.__proto__ === Car.prototype // true
```
### The constructor property
Every single `.prototype` object has a property called `constructor` that points back to the original function. Let's look at an example:
```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.constructor === Person // true
```
We'll explore prototypes in more detail in the next section.

#### Classes
Many other programming languages have a concept of classes. In languages like *Python* or *Java* there is an explicit way of creating classes which are then used to create an instance of the class. Therefore, a class is like a blueprint for how to build something, and the instance is a construction of that blueprint. If we have a `Car` class, we have only one class, but there may be many instances of cars. For example, a car class can make an instance of a Ford Probe or an instance of a Bugatti Chiron. Both are instances of a car, but there is only one car class (or blueprint).

In JavaScript we **DO NOT** have classes built into the language. Instead, as a JavaScript programmer we mimic object oriented programming and classes using JavaScript constructor functions and the `new` keyword.

#### Using call with constructors
Explore how we can use constructor functions along with `call` to set explicit bindings of the keyword `this`.

In JavaScript, there is no way to make a traditional "class". Similarly, in JavaScript, there is no explicit way for one constructor function to inherit from another.

Instead, JavaScript has *prototypal inheritance*. To borrow the functionality from one constructor and use it in another, we would use the `call` method. Below is an example. Notice that the `Motorcycle` constructor function has an additional property that `Vehicle` does not. Conceptually, the `Motorcycle` "class" is inheriting from the `Vehicle` "class".
```js
function Vehicle(make,model,year){
    this.make = make;
    this.model = model;
    this.year = year;
}

function Motorcycle(make,model,year,motorcycleType){
    Vehicle.call(this,make,model,year)
    this.motorcycleType = motorcycleType;
}

var moto = new Motorcycle("Kawasaki", "Ninja 500", 2006, "Sports")
```


### Object prototype in javascript
> The Prototype JavaScript Framework is a JavaScript framework created by Sam Stephenson in February 2005 as part of the foundation for Ajax support in Ruby on Rails. It is implemented as a single file of JavaScript code, usually named prototype.js.
Follow the [Wikipedia](https://en.wikipedia.org/wiki/Prototype_JavaScript_Framework) page. 


#### Prototype Intro
Every single function that is created in JavaScript has a `prototype` property. Moreover, each object that is created can access its constructor's prototype property via the object's own `__proto__` property.

Let's start by looking at `Object.prototype`. In the Chrome console, try typing `Object.prototype` then expand the object you get back. You can see that `Object` already has many properties on its prototype.

When you create a constructor function, that function will have it's own prototype. Let's try that out by creating a `Person` constructor function:
```js
function Person(name) {
   this.name = name;
}

var tim = new Person("Tim");

Person.prototype; // Object {}
```
So far, our `Person` constructor function has a prototype and the only two properties available on the prototype should be `constructor` and `__proto__`. Let's try adding a function to the Person prototype:
```js
Person.prototype.sayHello = function() {
    return "Hello, " + this.name;
};
```
Now that we have added `sayHello` to the prototype of `Person`, any person object that will be create or that was created in the past has access to the function:
```js
var moxie = new Person("Moxie");
moxie.sayHello();  // returns "Hello, Moxie"

// Notice that sayHello still works for tim even though tim was created
// before the sayHello function was added to the prototype.
tim.sayHello();    // returns "Hello, Tim"
```
So the main things to know so far about an Object's prototype are the following:

1. Any function or property added to the prototype is shared among all instances linked to that prototype (For example, sayHello is **shared** among all `Person` instances).
2. Each constructor function has its own prototype.

#### Shared Prototype Example
Let's look at another example of adding properties to a prototype.
```js
function Person(name){
    this.name = name;
}

Person.prototype.siblings = ["Haim", "David"];

var elie = new Person("Elie");
```
The above example creates a instance of a `Person` and sets a `siblings` array on the prototype. The intention is for elie to have an array of siblings. However, since the prototype is shared among **all** instances of a `Person`, any other instance will also have access to the same siblings array:
```js
elie.siblings.push("Tamar"); // returns the new length of the array => 3
// The siblings array will now be ["Haim", "David", "Tamar"]

var anotherPerson = new Person("Mary");

anotherPerson.siblings.push("Leslie");
elie.siblings; // ["Haim", "David", "Tamar", "Leslie"]
```
We can see again from this example, that anything put on the prototype is **shared** among all instances of that object.


#### Constructor Function Best Practices
The best practices for creating constructor functions in JavaScript are:

1. All of the properties that you do not want to be shared go inside of the constructor function
2. All properties that you want to be shared go on the prototype. Almost all of the time, you will want to put functions on the prototype. We will explain why soon!
Using our person example, if we want to add a siblings array to the `Person` class, we would add it in the constructor:
```js
function Person(name) {
    this.name = name;
    this.siblings = [];
}

var janey = new Person("Janey");
janey.silbings.push("Annie");
```
Now each time the `new` keyword is used on the `Person` constructor, a new object is created that has its own name and siblings property. Now if we create another person it will have its own name and siblings array as well:
```js
var tim = new Person("Tim");
tim.siblings.push("Nicole");
tim.siblings.push("Jeff");
tim.siblings.push("Greg");
tim.siblings; // Returns ["Nicole", "Jeff", "Greg"];
```
We said earlier that when it comes to functions, you typically want to add them to the prototype. Why is this? After all, your code will function correctly if you create your function definitions in the constructor like this:
```js
// NOT A GOOD PRACTICE
function Person(name) {
  this.name = name;
  this.sayHi = function() {
    return "Hello, " + this.name;
  }
}
```
The problem is that every time you use the `new` keyword to create a `Person`, a new object gets created in memory that allocates space for the person's name and also for the `sayHi` function. So if we have 10 `Person` objects that we create, there will be 10 copies of the same `sayHi` function. Since the function does not need to be unique per `Person` instance, it is better to add the function to the prototype, like this:
```js
// BEST PRACTICE!!
function Person(name) {
   this.name = name;
}

Person.prototype.sayHi = function() {
    return "Hello, " + this.name;
}
```
Unless you have a good reason not to, **always put function definitions on the constructor function's prototype**.

#### JavaScript Property Lookup
When you attempt to access a property on an object in JavaScript, there is a lookup process that goes on in order to find your property. To find the value for a property, first the properties on the object are checked. If the property is not found, then the properties on the prototype of the constructor function are checked. Let's look at an example:
```js
function Automobile(make, model, year) {
    this.make = make;
    this.model = model;
    if (year !== undefined) {
        this.year = year;
    }
}

Automobile.prototype.year = 2016;
```
Notice that year is set on the prototype to 2016. Also, if no year is passed into the constructor, an assignment to year will not be made.
```
var newCar = new Automobile("Ferrari", "488 Spider");

// In this case, we did not pass in a year,
// so it was never set in the constructor function
newCar.hasOwnProperty("year"); // Returns false

newCar.year; // returns 2016
```
Now, if we create a car with a year, the property on the car object will be seen first in the property lookup:
```js
var probe = new Automobile("Ford", "Probe", 1993);

probe.hasOwnProperty("year"); // returns true

probe.year; // returns 1993
```





### Inheritance
> In object-oriented programming, inheritance is when an object or class is based on another object (prototypal inheritance) or class (class-based inheritance), using the same implementation (inheriting from an object or class: inheriting behavior. Follow the [Wiki](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)) here.

#### Prototype Inheritance
Looking at our earlier example again, we can see how our `Automobile` constructor function inherits properties from the Object constructor function:
```js
function Automobile(make, model, year) {
    this.make = make;
    this.model = model;
    if (year !== undefined) {
        this.year = year;
    }
}

Automobile.prototype.year = 2016;
var probe = new Automobile("Ford", "Probe", 1993);

probe.hasOwnProperty("year"); // returns true

probe.year; // returns 1993
```
Where did the function `hasOwnProperty` come from? It is defined in the `Object` prototype. Since all objects in JavaScript inherit from the Object prototype, your `Automobile` object has access to the `hasOwnProperty` function through the prototype from `Object`.

Let's investigate the prototype chain for automobile using `__proto__` and `console.dir`:
```js
var probe = new Automobile("Ford", "Probe", 1993);

// Inspect the returned object in the console
// It shows us the prototype associated with the instance of Automobile
// You should see the constructor function and a property for year
probe.__proto__;

// Inspect the returned object in the terminal
// It shows us the parent prototype (Object's prototype) that is associated
// with the instance of Automobile
// You should see many properties here, including hasOwnProperty!
probe.__proto__.__proto__;

// Click through the returned object to see the __proto__ chain.
console.dir(probe);
```

#### Creating Your Own Inheritance Chain
An important concept in object oriented programming is inheritance. The idea behind inheritance is that one or more parent / super classes can pass along functions and properties to other child / sub classes.
```js
function Parent(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Parent.prototype.sayHi = function(){
    return this.firstName + " " + this.lastName + " says hi!";
}

function Child(firstName, lastName){
    // This is how we "inherit" properties from the parent
    Parent.apply(this,arguments);
}

// This is how we inherit functions
// (create a new prototype + reset the constructor)
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var c = new Child("Bran", "Stark");

c.sayHi() // Bran Stark says hi!
```
So what have we done here? We've set the prototype of the `Child` to be a newly created object with a prototype of `Parent.prototype` (`Object.create` accepts as a parameter another object to set as the `prototype`).

#### What does Object.create do?
Why can't we just do `Child.prototype` = `Parent.prototype`? Remember that when we assign objects equal to each other, they are just references. This means that `Child.prototype` is a reference to `Parent.prototype` which means that if we add to the `Child.prototype`, objects created from the `Parent.prototype` will have access to them, which would be bad!
```js
Child.prototype = Parent.prototype;

// true - this is BAD!
Child.prototype === Parent.prototype;

Child.prototype = Object.create(Parent.prototype);

// false - This is GOOD! We want these to be different
Child.prototype === Parent.prototype;
```
#### What about resetting the constructor?
Let's examine the last line: `Child.prototype.constructor` = `Child;`. Without this line, if you examine `Child.prototype.constructor`, this will refer to the `Parent`, and not the `Child`! In many cases this won't actually matter, but it can definitely be confusing, since if you call `.prototype.constructor` on a constructor function, you expect it to point back to the original constructor function. The details here aren't that important for right now, but if you are interested in learning more, check out [this](http://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor) Stack Overflow article.

#### Bad practice: Using `new` to create a child class
You may see inheritance done by using the `new` keyword instead of using `Object.create`. This will do almost the same thing, but add additional unnecessary properties on the prototype (since it is creating an object with undefined properties just for the prototype). For more on this, check out [this](http://stackoverflow.com/questions/13040684/javascript-inheritance-object-create-vs-new) Stack Overflow question.


## Exploration
- Read the [chapter](http://eloquentjavascript.net/1st_edition/chapter8.html) on OOP from *elequentjavascript.net*. 
- Follow [this](https://code.tutsplus.com/tutorials/the-basics-of-object-oriented-javascript--net-7670) tutorial on **The Basics of Object-Oriented JavaScript** from *envato tuts +*. 

- Read [this](http://helephant.com/2008/09/14/constructor-functions/) article on **Constructor Functions** from *Helephant.com*
- Check out [this](https://www.tutorialspoint.com/javascript/javascript_function_constructors.htm) tutorial from *Tutorials Point* on **Constructor Functions**.

- Read [this](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) excellent tutorial on **`Object.Prototype`** from *MDN*.
- An amazing blog on **Javascript Prototypes** by *Yehuda Katz*. Read [here](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- Check out [this](http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/) beautifully explained tutorial on ** Javascript Prototypes** from *JavaScript.isSexy*. 

- Read [this](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance) excellent tutorial on **Inheritance in JavaScript** from *MDN*.
- Read [this](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) on **Inheritance and the Prototype Chain in JS** from *MDN*.
- Check out [this](http://www.crockford.com/javascript/inheritance.html) page by *Douglas Crouckford* on **Classical Inheritance in JavaScript**.
- Read [this](https://www.sitepoint.com/simple-inheritance-javascript/) tutorial on **Simple Inheritance with JavaScript** from *SitePoint*.

