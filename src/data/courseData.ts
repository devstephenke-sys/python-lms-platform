import { Module } from '@/types';

export const courseModules: Module[] = [
  {
    id: 'introduction',
    title: 'Introduction to Python',
    description: 'Learn what Python is, how to install it, and get started with your first program.',
    icon: 'Rocket',
    order: 1,
    topics: [
      {
        id: 'what-is-python',
        title: 'What is Python?',
        explanation: 'Python is a high-level, interpreted programming language known for its readability and versatility. It was created by Guido van Rossum and first released in 1991. Python emphasizes code readability and allows you to express concepts in fewer lines of code than languages like C++ or Java.',
        keyConcepts: 'Python is an interpreted language, meaning code is executed line by line. It uses dynamic typing and automatic memory management. Python supports multiple programming paradigms including procedural, object-oriented, and functional programming.',
        realWorld: 'Web development (Django, Flask), Data Science (Pandas, NumPy), AI/ML (TensorFlow, PyTorch), Automation scripts, Scientific computing, and Software development.',
        code: String.raw`# Your first Python program
print('Hello, World!')
print('Welcome to Python!')

# Comments in Python start with #
# They are ignored by the interpreter
# Use them to explain your code

# Multiple prints
name = 'Python Learner'
print(f'Hello, {name}!')`,
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
      },
      {
        id: 'installation-setup',
        title: 'Installation & Setup',
        explanation: 'Python must be installed on your operating system to run Python programs. You can download it from python.org or use package managers. After installation, you typically run Python scripts via a terminal or an IDE (Integrated Development Environment).',
        keyConcepts: 'How to verify installation using python --version or python3 --version. Using pip (Python Package Installer) to install third-party packages. Setting up virtual environments for project isolation.',
        realWorld: 'Setting up development environments for servers, configuring CI/CD pipelines, and deploying Python applications to production.',
        code: String.raw`import sys
import platform

# Check Python version
print(f'Python Version: {sys.version}')
print(f'Platform: {platform.system()}')

# Basic environment check
print('\nEnvironment Setup Complete!')`,
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=cQT33yu9pY8'
      }
    ]
  },
  {
    id: 'variables',
    title: 'Variables & Data Types',
    description: 'Master variables, naming conventions, and Python\'s fundamental data types.',
    icon: 'Database',
    order: 2,
    topics: [
      {
        id: 'creating-variables',
        title: 'Creating Variables',
        explanation: 'Variables are containers for storing data values. Python has no command for declaring a variable. A variable is created the moment you first assign a value to it. Python variables are dynamically typed - you don\'t need to declare the type.',
        keyConcepts: 'Variables are created when you assign a value to them. Variable names are case-sensitive. You can reassign variables to different data types. Use meaningful variable names for better code readability.',
        realWorld: 'Storing user names, scores in games, bank balances, configuration settings, and any data that needs to be processed or displayed.',
        code: String.raw`# Creating variables
x = 5
y = 'John'
z = 3.14

print(x)
print(y)
print(z)

# Different types
age = 25  # integer
price = 19.99  # float
name = "Alice"  # string
is_active = True  # boolean

print(f"Name: {name}, Age: {age}")`,
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=c33pZq9Zp1M'
      },
      {
        id: 'variable-names',
        title: 'Variable Naming Rules',
        explanation: 'A variable name must start with a letter or the underscore character. It cannot start with a number. Variable names can only contain alphanumeric characters and underscores (A-z, 0-9, and _). Variable names are case-sensitive (age, Age, and AGE are three different variables).',
        keyConcepts: 'Follow snake_case convention for variable names (my_variable). Use descriptive names. Avoid reserved keywords (if, else, for, while, etc.). Start with lowercase letters for variables, uppercase for constants.',
        realWorld: 'Writing readable code that other developers can understand. Following Python PEP 8 style guide for consistent naming conventions across projects.',
        code: String.raw`# Valid variable names
my_var = 'Sally'
_my_var = 'John'
my_var2 = 'Bob'

# Constant convention (UPPER_CASE)
PI = 3.14159
MAX_ATTEMPTS = 3

# Descriptive names
user_name = 'Alice'
user_age = 25
is_logged_in = True

print(my_var)
print(_my_var)
print(f"PI = {PI}")`,
        order: 2
      },
      {
        id: 'numbers',
        title: 'Numbers (Int, Float, Complex)',
        explanation: 'There are three numeric types in Python: int (integer), float (floating point), and complex. Integers are whole numbers, floats are numbers with decimal points, and complex numbers have a real and imaginary part.',
        keyConcepts: 'Understanding the difference between integers (whole numbers) and floats (decimals). Type conversion using int(), float(), and str(). Arithmetic operations: +, -, *, /, // (floor division), % (modulo), ** (exponent).',
        realWorld: 'Calculating prices, physics simulations, counting items, financial calculations, scientific measurements, and statistical analysis.',
        code: String.raw`# Numeric types
x = 1    # int
y = 2.8  # float
z = 3+4j # complex

print(type(x))
print(type(y))
print(type(z))

# Arithmetic operations
a = 10
b = 3

print(f"Addition: {a + b}")
print(f"Subtraction: {a - b}")
print(f"Multiplication: {a * b}")
print(f"Division: {a / b}")
print(f"Floor Division: {a // b}")
print(f"Modulo: {a % b}")
print(f"Exponent: {a ** b}")`,
        order: 3
      },
      {
        id: 'strings',
        title: 'Strings',
        explanation: 'Strings in Python are surrounded by either single quotation marks or double quotation marks. Strings are immutable, meaning you cannot change them after creation. Python provides many built-in methods for string manipulation.',
        keyConcepts: 'String indexing and slicing (str[0], str[1:5]). String concatenation using + operator. String methods: upper(), lower(), strip(), split(), join(). String formatting using f-strings, format(), or % operator.',
        realWorld: 'Processing text data, user inputs, logging messages, parsing files, web scraping, and natural language processing.',
        code: String.raw`# String basics
a = 'Hello'
b = "World"

print(a)
print(b)

# String operations
name = "Alice"
print(f"First character: {name[0]}")
print(f"Length: {len(name)}")
print(f"Uppercase: {name.upper()}")
print(f"Lowercase: {name.lower()}")

# String concatenation
greeting = "Hello, " + name + "!"
print(greeting)

# String formatting (f-string)
age = 25
print(f"{name} is {age} years old")`,
        order: 4
      },
      {
        id: 'lists',
        title: 'Lists',
        explanation: 'Lists are ordered, mutable collections that can hold multiple items. Lists are created using square brackets [] and can contain elements of different types. Lists are one of the most commonly used data structures in Python.',
        keyConcepts: 'Creating lists with square brackets. Indexing (starting from 0) and negative indexing. List methods: append(), insert(), remove(), pop(), sort(), reverse(). List slicing to get subsets of elements.',
        realWorld: 'Managing collections of items, shopping lists, todo lists, data processing, storing user inputs, and representing sequences.',
        code: String.raw`# Creating lists
fruits = ['apple', 'banana', 'cherry']
numbers = [1, 2, 3, 4, 5]
mixed = ['text', 42, 3.14, True]

print(fruits)
print(numbers)

# List operations
fruits.append('orange')  # Add to end
fruits.insert(1, 'mango')  # Insert at index
fruits.remove('banana')  # Remove by value
fruits.pop()  # Remove last

print(fruits)

# List slicing
print(f"First two: {fruits[:2]}")
print(f"Last two: {fruits[-2:]}")`,
        order: 5
      },
      {
        id: 'dictionaries',
        title: 'Dictionaries',
        explanation: 'Dictionaries are unordered collections of key-value pairs. They are created using curly braces {} with key-value pairs separated by colons. Dictionaries are mutable and can be nested. Keys must be immutable (strings, numbers, tuples).',
        keyConcepts: 'Creating dictionaries with key-value pairs. Accessing values using keys. Dictionary methods: keys(), values(), items(), get(), update(), pop(). Checking if key exists using "in" operator.',
        realWorld: 'Storing configuration settings, representing JSON data, caching, mapping IDs to objects, and creating lookup tables.',
        code: String.raw`# Creating dictionaries
person = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York'
}

print(person)
print(f"Name: {person['name']}")

# Dictionary operations
person['email'] = 'alice@example.com'  # Add new key
person['age'] = 26  # Update existing key

print(person)

# Dictionary methods
print(f"Keys: {list(person.keys())}")
print(f"Values: {list(person.values())}")
print(f"Items: {list(person.items())}")

# Safe access
print(f"Name: {person.get('name', 'Unknown')}")`,
        order: 6
      }
    ]
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description: 'Learn to control program execution with conditionals and loops.',
    icon: 'GitBranch',
    order: 3,
    topics: [
      {
        id: 'if-else',
        title: 'If...Else Statements',
        explanation: 'Python supports the usual logical conditions from mathematics: Equals (==), Not equal (!=), Less than (<), Less than or equal (<=), Greater than (>), Greater than or equal (>=). These conditions can be used in several ways, most commonly in "if statements" and loops.',
        keyConcepts: 'Indentation is crucial in Python to define blocks of code. Use elif for multiple conditions. Use else for default case. Logical operators: and, or, not. Comparison operators return boolean values.',
        realWorld: 'Decision making: If user is logged in, show dashboard, else show login page. Input validation, access control, and business logic implementation.',
        code: String.raw`# If-else statements
a = 33
b = 200

if b > a:
    print('b is greater than a')
elif a == b:
    print('a and b are equal')
else:
    print('a is greater than b')

# Multiple conditions
age = 25
has_license = True

if age >= 18 and has_license:
    print('You can drive')
elif age >= 18:
    print('You need a license')
else:
    print('You are too young to drive')

# Nested conditions
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Grade: {grade}")`,
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=Zp5MuPOtsSY'
      },
      {
        id: 'for-loops',
        title: 'For Loops',
        explanation: 'A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string). This is less like the for keyword in other programming languages, and works more like an iterator method as found in other object-orientated programming languages.',
        keyConcepts: 'Iterating through lists, strings, and other sequences. Using range() to generate number sequences. The break statement to exit loops. The continue statement to skip iterations. Nested loops for 2D structures.',
        realWorld: 'Processing a list of customer orders, iterating through files in a directory, data processing, batch operations, and generating reports.',
        code: String.raw`# For loop with list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)

# For loop with string
for letter in 'Python':
    print(letter)

# Using range()
for i in range(5):
    print(f"Number: {i}")

# Range with start and step
for i in range(0, 10, 2):
    print(f"Even: {i}")

# Iterating with index
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")`,
        order: 2
      },
      {
        id: 'while-loops',
        title: 'While Loops',
        explanation: 'With the while loop we can execute a set of statements as long as a condition is true. The while loop requires relevant variables to be ready, in this example we need to define an indexing variable, i, which we set to 1.',
        keyConcepts: 'While loops continue until condition becomes false. Be careful of infinite loops - ensure condition eventually becomes false. Use break to exit loop early. Use continue to skip to next iteration. Common for counting, waiting for events, or processing until condition.',
        realWorld: 'Waiting for user input, game loops, polling for data, processing until completion, and implementing retry logic.',
        code: String.raw`# While loop example
i = 1
while i < 6:
    print(i)
    i += 1

# While loop with break
i = 1
while i < 6:
    if i == 3:
        break
    print(i)
    i += 1

# While loop with continue
i = 0
while i < 6:
    i += 1
    if i == 3:
        continue
    print(i)

# Practical example - password simulation
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    print(f"Attempt {attempts + 1}")
    # In real app, get input here
    attempts += 1

print("Max attempts reached")`,
        order: 3
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Learn to create reusable code blocks with functions and parameters.',
    icon: 'Code',
    order: 4,
    topics: [
      {
        id: 'defining-functions',
        title: 'Defining Functions',
        explanation: 'A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result. In Python, a function is defined using the def keyword.',
        keyConcepts: 'Use the def keyword to define functions. Information can be passed as arguments (parameters). Use return statement to send back values. Default parameter values. Keyword arguments. Functions help organize code and avoid repetition.',
        realWorld: 'Reusing logic (e.g., a function to calculate tax) across an application. API endpoints, data processing pipelines, and modular code architecture.',
        code: String.raw`# Defining a function
def greet(name):
    print(f"Hello, {name}!")

# Calling the function
greet("Alice")
greet("Bob")

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(f"5 + 3 = {result}")

# Function with default parameter
def greet_with_title(name, title="Mr."):
    print(f"Hello, {title} {name}!")

greet_with_title("Smith")
greet_with_title("Johnson", "Dr.")

# Multiple return values
def get_coordinates():
    return 10, 20

x, y = get_coordinates()
print(f"Coordinates: ({x}, {y})")`,
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=9Os0o3wzS_I'
      },
      {
        id: 'function-arguments',
        title: 'Function Arguments',
        explanation: 'You can send any data types of argument to a function (string, number, list, dictionary etc.), and it will be treated as the same data type inside the function. Python supports different ways to pass arguments: positional, keyword, default, and arbitrary.',
        keyConcepts: 'Positional arguments (ordered). Keyword arguments (named). Default arguments (fallback values). *args for arbitrary positional arguments. **kwargs for arbitrary keyword arguments. Argument order matters when calling functions.',
        realWorld: 'Flexible APIs, configuration functions, data processing pipelines, and creating reusable utility functions.',
        code: String.raw`# Positional arguments
def describe_person(name, age):
    print(f"{name} is {age} years old")

describe_person("Alice", 25)

# Keyword arguments
describe_person(age=30, name="Bob")

# Default arguments
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")
greet("Bob", "Hi")

# *args - arbitrary positional
def sum_all(*numbers):
    return sum(numbers)

print(f"Sum: {sum_all(1, 2, 3, 4, 5)}")

# **kwargs - arbitrary keyword
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")`,
        order: 2
      },
      {
        id: 'lambda-functions',
        title: 'Lambda Functions',
        explanation: 'A lambda function is a small anonymous function. A lambda function can take any number of arguments, but can only have one expression. Lambda functions are often used when you need a small function for a short period of time.',
        keyConcepts: 'Lambda syntax: lambda arguments: expression. Single expression only. Commonly used with map(), filter(), and sorted(). Can be assigned to variables. Useful for short, throwaway functions.',
        realWorld: 'Data transformations, sorting with custom keys, filtering lists, and functional programming patterns.',
        code: String.raw`# Lambda function example
add = lambda a, b: a + b
print(f"5 + 3 = {add(5, 3)}")

# Lambda with multiple arguments
multiply = lambda x, y: x * y
print(f"4 * 3 = {multiply(4, 3)}")

# Lambda with map()
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(f"Squared: {squared}")

# Lambda with filter()
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Evens: {evens}")

# Lambda with sorted()
students = [('Alice', 25), ('Bob', 20), ('Charlie', 30)]
sorted_students = sorted(students, key=lambda x: x[1])
print(f"Sorted by age: {sorted_students}")`,
        order: 3
      }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Master classes, objects, inheritance, and advanced OOP concepts.',
    icon: 'Layers',
    order: 5,
    topics: [
      {
        id: 'classes-objects',
        title: 'Classes & Objects',
        explanation: 'Python is an object-oriented programming language. Almost everything in Python is an object, with its own properties and methods. A Class is like an object constructor, or a "blueprint" for creating objects.',
        keyConcepts: 'Class is a blueprint/template. Object is an instance of a class. __init__ method (constructor) initializes objects. self parameter refers to the current instance. Attributes store data. Methods define behavior.',
        realWorld: 'Modeling real entities like User, Product, Vehicle, or BankAccount in software. Creating reusable components and organizing complex systems.',
        code: String.raw`# Creating a class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, my name is {self.name}")

    def introduce(self):
        print(f"I am {self.name} and I am {self.age} years old")

# Creating objects
p1 = Person("Alice", 25)
p2 = Person("Bob", 30)

p1.greet()
p1.introduce()
p2.greet()

# Accessing attributes
print(f"{p1.name} is {p1.age} years old")`,
        order: 1
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        explanation: 'Inheritance allows us to define a class that inherits all the methods and properties from another class. Parent class is the class being inherited from, also called base class. Child class is the class that inherits from another class, also called derived class.',
        keyConcepts: 'Use super() to call parent class methods. Child classes can override parent methods. Multiple inheritance (a class can inherit from multiple parents). Method Resolution Order (MRO) determines which method is called. Promotes code reuse.',
        realWorld: 'Creating specialized versions of general classes (e.g., Dog and Cat inherit from Pet). Building hierarchies of related objects. Extending functionality without modifying existing code.',
        code: String.raw`# Parent class
class Pet:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show(self):
        print(f"I am {self.name} and I am {self.age} years old")

    def speak(self):
        print("I don't know what to say")

# Child classes
class Cat(Pet):
    def __init__(self, name, age, color):
        super().__init__(name, age)
        self.color = color

    def speak(self):
        print("Meow")

class Dog(Pet):
    def speak(self):
        print("Bark")

class Fish(Pet):
    pass  # Inherits all methods

# Using the classes
cat = Cat("Whiskers", 3, "orange")
cat.show()
cat.speak()

dog = Dog("Buddy", 5)
dog.show()
dog.speak()

fish = Fish("Bubbles", 2)
fish.show()
fish.speak()`,
        order: 2
      },
      {
        id: 'class-methods',
        title: 'Class Methods & Static Methods',
        explanation: 'Class methods are methods that are bound to the class rather than the object. They can modify class state that applies across all instances. Static methods don\'t have access to instance or class state. They are utility functions that belong to the class.',
        keyConcepts: '@classmethod decorator creates class methods. @staticmethod decorator creates static methods. Class methods receive cls as first parameter. Static methods don\'t receive self or cls. Use class methods for factory methods. Use static methods for utility functions.',
        realWorld: 'Factory methods for creating objects, utility functions, counting instances, and managing class-level state.',
        code: String.raw`class Person:
    # Class attribute
    number_of_people = 0
    GRAVITY = -9.8

    def __init__(self, name):
        self.name = name
        Person.add_person()

    @classmethod
    def get_people_count(cls):
        return cls.number_of_people

    @classmethod
    def add_person(cls):
        cls.number_of_people += 1

# Static methods for utilities
class Math:
    @staticmethod
    def add5(x):
        return x + 5

    @staticmethod
    def multiply(x, y):
        return x * y

# Using class methods
p1 = Person("Alice")
p2 = Person("Bob")
p3 = Person("Charlie")

print(f"Total people: {Person.get_people_count()}")
print(f"Gravity: {Person.GRAVITY}")

# Using static methods
print(f"5 + 5 = {Math.add5(5)}")
print(f"3 * 4 = {Math.multiply(3, 4)}")`,
        order: 3
      },
      {
        id: 'encapsulation',
        title: 'Encapsulation',
        explanation: 'Encapsulation is one of the fundamental concepts in object-oriented programming. It describes the idea of bundling data and methods that work on that data within a single unit, like a class in Python. This puts restrictions on accessing variables and methods directly.',
        keyConcepts: 'Public attributes (no underscore). Protected attributes (single underscore _). Private attributes (double underscore __). Property decorators for getters and setters. Hiding implementation details. Controlling access to data.',
        realWorld: 'Banking systems (account balances), user authentication (passwords), and any system where data integrity and access control are important.',
        code: String.raw`class BankAccount:
    def __init__(self, account_number, initial_balance):
        self.account_number = account_number
        self.__balance = initial_balance  # Private attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited \${amount}. New balance: \${self.__balance}")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrew \${amount}. New balance: \${self.__balance}")
        else:
            print("Insufficient funds")

    def get_balance(self):
        return self.__balance

    @property
    def balance(self):
        return self.__balance

# Using the account
account = BankAccount("12345", 1000)
account.deposit(500)
account.withdraw(200)

print(f"Current balance: \${account.balance}")

# Cannot directly access private attribute
# print(account.__balance)  # This would raise an AttributeError`,
        order: 4
      }
    ]
  },
  {
    id: 'file-handling',
    title: 'File Handling',
    description: 'Learn to read, write, and manage files in Python.',
    icon: 'FileText',
    order: 6,
    topics: [
      {
        id: 'reading-writing',
        title: 'Reading & Writing Files',
        explanation: 'The key function for working with files in Python is the open() function. The open() function takes two parameters: filename and mode. There are four different methods (modes) for opening a file: "r" - Read, "a" - Append, "w" - Write, "x" - Create.',
        keyConcepts: 'File modes: r (read), w (write), a (append), r+ (read and write). Always close files or use "with" statement. The "with" statement automatically closes files. Different file formats: text (.txt, .csv) and binary (.jpg, .pdf). Error handling for file operations.',
        realWorld: 'Saving logs, reading configuration files, exporting reports, data persistence, processing user uploads, and batch file processing.',
        code: String.raw`# Writing to a file
with open('example.txt', 'w') as f:
    f.write('Hello, Python!\n')
    f.write('This is a file handling example.\n')

# Reading from a file
with open('example.txt', 'r') as f:
    content = f.read()
    print("File content:")
    print(content)

# Reading line by line
with open('example.txt', 'r') as f:
    print("\nReading line by line:")
    for line in f:
        print(line.strip())

# Appending to a file
with open('example.txt', 'a') as f:
    f.write('This line was appended.\n')

# Using context manager for multiple files
with open('example.txt', 'r') as source, \
     open('copy.txt', 'w') as destination:
    destination.write(source.read())

print("File copied successfully!")`,
        order: 1
      },
      {
        id: 'json-files',
        title: 'Working with JSON',
        explanation: 'JSON (JavaScript Object Notation) is a popular data format used for data interchange. Python has a built-in json module that makes working with JSON data easy. JSON is commonly used for APIs, configuration files, and data storage.',
        keyConcepts: 'json.load() to read JSON from file. json.dump() to write JSON to file. json.loads() to parse JSON string. json.dumps() to convert object to JSON string. Handling nested JSON structures. Working with lists and dictionaries in JSON.',
        realWorld: 'API responses, configuration files, data storage, web applications, and exchanging data between different systems.',
        code: String.raw`import json

# Writing JSON to file
data = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York',
    'skills': ['Python', 'JavaScript', 'SQL']
}

with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("JSON data written to file")

# Reading JSON from file
with open('data.json', 'r') as f:
    loaded_data = json.load(f)

print("\nLoaded data:")
print(loaded_data)

# Working with JSON strings
json_string = '{"name": "Bob", "age": 30}'
parsed = json.loads(json_string)
print(f"\nParsed: {parsed}")

# Convert to JSON string
person_dict = {'name': 'Charlie', 'age': 35}
json_output = json.dumps(person_dict)
print(f"JSON string: {json_output}")`,
        order: 2
      }
    ]
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    description: 'Learn to handle exceptions and write robust code.',
    icon: 'AlertTriangle',
    order: 7,
    topics: [
      {
        id: 'try-except',
        title: 'Try...Except Blocks',
        explanation: 'The try block lets you test a block of code for errors. The except block lets you handle the error. The else block lets you execute code when there is no error. The finally block lets you execute code, regardless of the result of the try- and except blocks.',
        keyConcepts: 'Catch specific exceptions (ValueError, TypeError, etc.). Use generic except as last resort. Multiple except blocks for different errors. else block executes if no exception. finally block always executes. Raise custom exceptions.',
        realWorld: 'Handling network failures, missing files, invalid user input, database errors, and API failures gracefully without crashing the application.',
        code: String.raw`# Basic try-except
try:
    print(x)  # x is not defined
except NameError:
    print('Variable x is not defined')
except:
    print('Something else went wrong')

# Multiple exceptions
try:
    result = 10 / 0
except ZeroDivisionError:
    print('Cannot divide by zero')
except ValueError:
    print('Invalid value')
except Exception as e:
    print(f'An error occurred: {e}')

# Try-except-else-finally
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Please enter a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print(f"Result: {result}")
finally:
    print("This always executes")

# Practical example - file handling
try:
    with open('nonexistent.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("File not found")
except PermissionError:
    print("Permission denied")
except Exception as e:
    print(f"An error occurred: {e}")`,
        order: 1
      },
      {
        id: 'raising-exceptions',
        title: 'Raising Exceptions',
        explanation: 'As a Python developer you can choose to throw an exception if a condition occurs. To throw (or raise) an exception, use the raise keyword. You can define your own custom exceptions by creating a new class that inherits from the built-in Exception class.',
        keyConcepts: 'Use raise keyword to throw exceptions. Create custom exception classes. Include meaningful error messages. Raise exceptions for invalid states. Use exceptions for error handling, not normal flow control.',
        realWorld: 'Validating input, enforcing business rules, creating domain-specific errors, and building robust APIs with proper error responses.',
        code: String.raw`# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 120:
        raise ValueError("Age is unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# Custom exception
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.message = f"Insufficient funds: balance={balance}, amount={amount}"
        super().__init__(self.message)

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Using custom exception
account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e.message}")`,
        order: 2
      }
    ]
  },
  {
    id: 'modules-packages',
    title: 'Modules & Packages',
    description: 'Learn to organize code with modules and use external packages.',
    icon: 'Package',
    order: 8,
    topics: [
      {
        id: 'importing',
        title: 'Importing Modules',
        explanation: 'A module is a file containing a set of functions you want to include in your application. To create a module just save the code you want in a file with the file extension .py. To use a module, you need to import it using the import keyword.',
        keyConcepts: 'import module_name - imports entire module. from module import name - imports specific item. from module import * - imports all (not recommended). Aliasing with as. Module __name__ attribute. The __main__ check for script execution.',
        realWorld: 'Using standard libraries (math, datetime, random), third-party packages (numpy, pandas), and organizing your own code into reusable modules.',
        code: String.raw`# Importing entire module
import math
print(f"Pi: {math.pi}")
print(f"Square root of 64: {math.sqrt(64)}")

# Importing specific functions
from math import pi, sqrt
print(f"Pi: {pi}")
print(f"Square root of 64: {sqrt(64)}")

# Importing with alias
import math as m
print(f"Pi: {m.pi}")

# Importing multiple items
from math import pi, e, sqrt
print(f"Pi: {pi}, E: {e}")

# Common standard library modules
import random
print(f"Random number: {random.randint(1, 100)}")

import datetime
print(f"Current date: {datetime.date.today()}")

import os
print(f"Current directory: {os.getcwd()}")`,
        order: 1
      },
      {
        id: 'creating-modules',
        title: 'Creating Your Own Modules',
        explanation: 'You can create your own modules by writing Python code in .py files. Any Python file can be imported as a module. You can also create packages by organizing modules in directories with an __init__.py file. This helps organize large projects.',
        keyConcepts: 'Create .py files for modules. Use __init__.py for packages. Module search path. Relative imports. from . import module. Organizing code by functionality. Avoid circular imports.',
        realWorld: 'Organizing large projects, creating reusable libraries, building packages for distribution, and structuring applications.',
        code: String.raw`# This would be in a file called mymodule.py
# mymodule.py content:
def greet(name):
    return f"Hello, {name}!"

def calculate_area(length, width):
    return length * width

PI = 3.14159

# Then in another file:
# import mymodule
# print(mymodule.greet("Alice"))
# print(mymodule.calculate_area(5, 3))

# Creating a package structure:
# mypackage/
#     __init__.py
#     utils.py
#     constants.py

# In __init__.py:
# from .utils import greet, calculate_area
# from .constants import PI

# Then you can import:
# from mypackage import greet, calculate_area, PI
# print(greet("Alice"))

# Using __name__ == '__main__'
def main():
    print("This module is being run directly")

if __name__ == '__main__':
    main()`,
        order: 2
      }
    ]
  }
];

export const projects = [
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'A fully functional calculator with GUI that performs basic arithmetic operations. Learn about functions, error handling, and GUI programming.',
    difficulty: 'Beginner',
    icon: 'Calculator',
    path: 'calculator/Calculator.py',
    language: 'Python',
    codePreview: String.raw`def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error! Division by zero."
    return x / y`,
    features: ['Basic arithmetic operations', 'GUI with Tkinter', 'Error handling', 'Clear and reset functionality']
  },
  {
    id: 'quiz-game',
    title: 'Quiz Game',
    description: 'An interactive quiz application that tests your knowledge. Learn about dictionaries, file I/O, and game logic.',
    difficulty: 'Beginner',
    icon: 'HelpCircle',
    path: 'QuizGame/quiz.py',
    language: 'Python',
    codePreview: String.raw`import json

class QuizGame:
    def __init__(self):
        self.score = 0
        self.questions = self.load_questions()

    def load_questions(self):
        with open('questions.json', 'r') as f:
            return json.load(f)`,
    features: ['JSON-based questions', 'Score tracking', 'Interactive gameplay', 'Extensible question bank']
  },
  {
    id: 'to-do-list',
    title: 'To-Do List',
    description: 'A task management application to help you organize your daily activities. Learn about lists, file persistence, and CRUD operations.',
    difficulty: 'Beginner',
    icon: 'CheckSquare',
    path: 'to-do-list/to_do.py',
    language: 'Python',
    codePreview: String.raw`class TodoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append(task)

    def remove_task(self, index):
        if 0 <= index < len(self.tasks):
            self.tasks.pop(index)`,
    features: ['Add and remove tasks', 'Mark tasks as complete', 'Save to file', 'Persistent storage']
  },
  {
    id: 'contact-book',
    title: 'Contact Book',
    description: 'Manage your contacts with this comprehensive address book. Learn about dictionaries, JSON storage, and data validation.',
    difficulty: 'Intermediate',
    icon: 'Book',
    path: 'ContactBook/contact.py',
    language: 'Python',
    codePreview: String.raw`class ContactBook:
    def __init__(self):
        self.contacts = {}
        self.load_contacts()

    def add_contact(self, name, phone, email):
        self.contacts[name] = {
            'phone': phone,
            'email': email
        }
        self.save_contacts()`,
    features: ['Add, edit, delete contacts', 'Search functionality', 'JSON persistence', 'Data validation']
  },
  {
    id: 'student-grades',
    title: 'Student Grade Management',
    description: 'A system to manage student grades and calculate averages. Learn about classes, file I/O, and data analysis.',
    difficulty: 'Intermediate',
    icon: 'GraduationCap',
    path: 'StudentGradeManagementSystem/app.py',
    language: 'Python',
    codePreview: String.raw`class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}

    def add_grade(self, subject, grade):
        self.grades[subject] = grade

    def calculate_average(self):
        return sum(self.grades.values()) / len(self.grades)`,
    features: ['Student management', 'Grade tracking', 'Average calculation', 'Report generation']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure random passwords with customizable options. Learn about random module, string manipulation, and security best practices.',
    difficulty: 'Beginner',
    icon: 'Lock',
    path: 'password-generator/password.py',
    language: 'Python',
    codePreview: String.raw`import random
import string

def generate_password(length=12, use_symbols=True):
    characters = string.ascii_letters + string.digits
    if use_symbols:
        characters += string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))`,
    features: ['Customizable length', 'Include/exclude symbols', 'Copy to clipboard', 'Secure generation']
  },
  {
    id: 'file-organizer',
    title: 'File Organizer',
    description: 'Automatically sort files into folders based on their types. Learn about os module, file operations, and automation.',
    difficulty: 'Intermediate',
    icon: 'Folder',
    path: 'File Organizer (Automatic Folder Sorter)/fileorganizer.py',
    language: 'Python',
    codePreview: String.raw`import os
import shutil

def organize_files(source_dir):
    extensions = {
        'Images': ['.jpg', '.png', '.gif'],
        'Documents': ['.pdf', '.doc', '.txt'],
        'Music': ['.mp3', '.wav']
    }
    # Organize files based on extension`,
    features: ['Automatic file sorting', 'Custom categories', 'Batch processing', 'Undo functionality']
  },
  {
    id: 'number-guess',
    title: 'Number Guessing Game',
    description: 'A fun game where you guess a random number. Learn about random module, loops, and game logic.',
    difficulty: 'Beginner',
    icon: 'Target',
    path: 'games/NumberGuess.py',
    language: 'Python',
    codePreview: String.raw`import random

def guess_number():
    number = random.randint(1, 100)
    attempts = 0

    while True:
        guess = int(input("Guess a number (1-100): "))
        attempts += 1

        if guess == number:
            print(f"Correct! You got it in {attempts} attempts.")
            break`,
    features: ['Random number generation', 'Hint system', 'Attempt tracking', 'Multiple difficulty levels']
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'Classic two-player game with win detection. Learn about 2D arrays, game logic, and minimax algorithm.',
    difficulty: 'Intermediate',
    icon: 'Grid',
    path: 'games/tictactoe.py',
    language: 'Python',
    codePreview: String.raw`class TicTacToe:
    def __init__(self):
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'

    def print_board(self):
        for row in self.board:
            print('|'.join(row))

    def check_winner(self):
        # Check rows, columns, and diagonals`,
    features: ['Two-player mode', 'Win detection', 'Draw detection', 'Restart game']
  },
  {
    id: 'text-adventure',
    title: 'Text Adventure Game',
    description: 'An interactive story game with save/load functionality. Learn about game state, file I/O, and narrative design.',
    difficulty: 'Intermediate',
    icon: 'BookOpen',
    path: 'TextBasedAdventureGame/textGame.py',
    language: 'Python',
    codePreview: String.raw`class TextAdventure:
    def __init__(self):
        self.player = {'health': 100, 'inventory': []}
        self.current_room = 'start'

    def play(self):
        while self.player['health'] > 0:
            self.describe_room()
            action = input("What do you do? ")
            self.process_action(action)`,
    features: ['Interactive storytelling', 'Save/load game state', 'Inventory system', 'Multiple endings']
  },
  {
    id: 'sudoku',
    title: 'Sudoku Generator & Solver',
    description: 'Generate and solve Sudoku puzzles using backtracking algorithm. Learn about recursion, algorithms, and puzzle generation.',
    difficulty: 'Advanced',
    icon: 'Puzzle',
    path: 'SudokuGeneratorSolver/sudoku_Backtracking_algorithmn.py',
    language: 'Python',
    codePreview: String.raw`def solve_sudoku(board):
    empty = find_empty(board)
    if not empty:
        return True

    row, col = empty
    for num in range(1, 10):
        if is_valid(board, num, row, col):
            board[row][col] = num
            if solve_sudoku(board):
                return True
            board[row][col] = 0
    return False`,
    features: ['Puzzle generation', 'Backtracking solver', 'Difficulty levels', 'Timer and hints']
  },
  {
    id: 'mini-interpreter',
    title: 'Mini Programming Language',
    description: 'Build a simple programming language interpreter. Learn about parsing, tokenization, and language design.',
    difficulty: 'Advanced',
    icon: 'Terminal',
    path: 'Mini Programming Language Interpreter/interpreter.py',
    language: 'Python',
    codePreview: String.raw`class Interpreter:
    def __init__(self):
        self.variables = {}

    def run(self, code):
        tokens = self.tokenize(code)
        for token in tokens:
            if token.type == 'ASSIGN':
                self.variables[token.name] = token.value
            elif token.type == 'PRINT':
                print(self.variables.get(token.name))`,
    features: ['Custom syntax', 'Variable storage', 'Arithmetic operations', 'Error handling']
  }
];
