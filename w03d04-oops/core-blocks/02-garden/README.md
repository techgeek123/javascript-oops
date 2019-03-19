# OOJS: A Garden with Flowers

## Summary
We're going to build some JavaScript objects:  a garden object with a collection of flowers.  

### JavaScript Objects
We're going to build objects using two approaches:  through object literal syntax and through a constructor function.  These are two approaches that ultimately do the same thing:  create objects with attributes and behaviors.

***Object literal syntax***.  When we only need one instance of an object, it's convenient to use [object literal syntax] to create that object.  We "literally" write the object that we want, declaring the object's properties and their values.  In Figure 1 we create a person with first and last names and the behavior to combine them into a full name.

```js
var person = {
  firstName: "Kweku",
  lastName: "White",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}

person.firstName;
// => "Kweku"
person.fullName();
// => "Kweku White"
```
*Figure 1*. Using object literal syntax to represent a person as a JavaScript object.


***Constructor functions***.  If we find ourselves needing to create multiple objects with the same behaviors and properties, we can write a constructor function. Constructor functions serve as *factories* that produce objects following a template.  This is similar to how we create objects in Ruby (i.e., defining a class with an initialize method that sets up objects).  Using a constructor function also allows us to share properties and behaviors among objects through the constructor's prototype—like instance methods declared in a Ruby class that are shared among instances of that class.  

In Figure 2, we use a constructor function to create two person objects with the same attributes and behaviors as the lone person object created in Figure 1.  The `Person()` constructor function sets the attributes that are unique to each instance:  the first and last names.  The full name behavior is shared by the person objects through the `Person.prototype` object.

```js
var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + " " + this.lastName
}

var grayson = new Person("Grayson", "Arthur");
grayson.firstName;
// => "Grayson"

var warner  = new Person("Warner", "Constable");
warner.fullName();
// => "Warner Constable"
```
*Figure 2*. Using a constructor function to represent people as JavaScript objects.


### Jasmine Tests
Similar to Mocha and Chai, we're going to use [Jasmine][] for testing the behaviors of our JavaScript objects.  Fortunately, Jasmine reads a lot like Mocha or Chai; a lot of the functions we'll call have the same names: `describe()`, `it()`, `expect()`, etc.

But there are definitely differences as well. Read up on the differences between Jasmine and Mocha.
```js
describe("a string with my name", function() {
  var myName;
  
  beforeEach(function() {
    myName = "Carson Hollands";  
  });
  
  it("is my name", function() {
    expect(myName).toEqual("Carson Hollands");
  });
});
```
*Figure 3.* Testing the value of a JavaScript string object with Jasmine.


## Releases
### Pre-release:  Review and Run the Tests
We have a test suite that will guide us as we develop our garden and flower objects; the test files are located in the `spec/` folder.  To run the tests, we open the `SpecRunner.html` file in the browser.  Open the spec runner.  The garden tests are all failing and the flower tests are pending.  As we write the code to create our objects, we'll rerun the tests by refreshing the spec runner.


### Release 0: The Flowers
Our flower objects are simple.  Each flower has two attributes:  name and color.  We're going to instantiate flowers using a `Flower()` constructor function, which has been defined in the file `src/flower.js`.

The tests for flowers have not been written.  Write tests that demonstrate that our constructor function produces objects with the correct names and colors.  Then, update the `Flower()` constructor function to pass the tests.

*Note:*  Follow the example in Figure 4 to write the Jasmine tests.


### Release 1: The Garden
Begin by creating the garden object.  In the file `src/garden.js` we have a variable `garden` whose value is an object literal with no properties.  Use the tests to guide adding the desired properties to the garden.  Some of the properties will be attributes like name and location.  Other properties will be behaviors like planting flowers.


## Conclusion
We can take an [object-oriented approach][] to writing JavaScript: creating objects with attributes and behaviors, sharing behaviors among objects. etc.  We just need to learn how to implement these in JavaScript.


[jasmine]: http://jasmine.github.io/2.4/introduction.html
[object literal syntax]: http://www.dyn-web.com/tutorials/object-literal/
[object-oriented approach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript


