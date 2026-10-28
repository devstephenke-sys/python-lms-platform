import { Quiz } from '@/types';

export const quizData: Quiz[] = [
  {
    id: 'intro-quiz',
    topicId: 'what-is-python',
    questions: [
      {
        id: 'q1',
        question: 'Who created Python?',
        options: ['Guido van Rossum', 'Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup'],
        correctAnswer: 0,
        explanation: 'Python was created by Guido van Rossum and first released in 1991.'
      },
      {
        id: 'q2',
        question: 'What year was Python first released?',
        options: ['1985', '1991', '1995', '2000'],
        correctAnswer: 1,
        explanation: 'Python was first released in 1991.'
      },
      {
        id: 'q3',
        question: 'Which of the following is NOT a use case for Python?',
        options: ['Web development', 'Data Science', 'Mobile app development', 'Automation scripts'],
        correctAnswer: 2,
        explanation: 'While Python can be used for some mobile development, it\'s not one of its primary use cases. It excels in web development, data science, and automation.'
      }
    ]
  },
  {
    id: 'variables-quiz',
    topicId: 'creating-variables',
    questions: [
      {
        id: 'q1',
        question: 'How do you create a variable in Python?',
        options: ['var x = 5', 'x = 5', 'let x = 5', 'declare x = 5'],
        correctAnswer: 1,
        explanation: 'In Python, you simply assign a value to create a variable: x = 5'
      },
      {
        id: 'q2',
        question: 'Which variable name is valid in Python?',
        options: ['2name', 'my-var', 'my_var', 'class'],
        correctAnswer: 2,
        explanation: 'Variable names can contain letters, numbers, and underscores, but cannot start with a number. "class" is a reserved keyword.'
      },
      {
        id: 'q3',
        question: 'What is the naming convention for variables in Python?',
        options: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'],
        correctAnswer: 2,
        explanation: 'Python follows the snake_case convention for variable names (my_variable).'
      }
    ]
  },
  {
    id: 'datatypes-quiz',
    topicId: 'numbers',
    questions: [
      {
        id: 'q1',
        question: 'What data type is 3.14 in Python?',
        options: ['int', 'float', 'str', 'complex'],
        correctAnswer: 1,
        explanation: '3.14 is a float (floating point number) because it has a decimal point.'
      },
      {
        id: 'q2',
        question: 'Which operator is used for exponentiation in Python?',
        options: ['^', '**', 'exp', '^^'],
        correctAnswer: 1,
        explanation: 'The ** operator is used for exponentiation in Python (e.g., 2 ** 3 = 8).'
      },
      {
        id: 'q3',
        question: 'What is the result of 10 // 3 in Python?',
        options: ['3.33', '3', '1', 'Error'],
        correctAnswer: 1,
        explanation: 'The // operator performs floor division, so 10 // 3 = 3.'
      }
    ]
  },
  {
    id: 'controlflow-quiz',
    topicId: 'if-else',
    questions: [
      {
        id: 'q1',
        question: 'What keyword is used for "else if" in Python?',
        options: ['else if', 'elif', 'elseif', 'elsif'],
        correctAnswer: 1,
        explanation: 'Python uses "elif" for "else if" conditions.'
      },
      {
        id: 'q2',
        question: 'What happens if the condition in an if statement is False?',
        options: ['The program crashes', 'The else block executes', 'Nothing happens', 'The next line runs'],
        correctAnswer: 1,
        explanation: 'If the if condition is False, the else block (if present) will execute.'
      },
      {
        id: 'q3',
        question: 'Which operator checks if two values are equal?',
        options: ['=', '==', '===', '!='],
        correctAnswer: 1,
        explanation: 'The == operator checks for equality in Python. = is for assignment.'
      }
    ]
  },
  {
    id: 'functions-quiz',
    topicId: 'defining-functions',
    questions: [
      {
        id: 'q1',
        question: 'What keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'The "def" keyword is used to define functions in Python.'
      },
      {
        id: 'q2',
        question: 'How do you return a value from a function?',
        options: ['return', 'output', 'yield', 'exit'],
        correctAnswer: 0,
        explanation: 'The "return" keyword is used to return a value from a function.'
      },
      {
        id: 'q3',
        question: 'What is a default parameter?',
        options: ['A parameter that must be provided', 'A parameter with a default value', 'A parameter that returns nothing', 'A parameter for testing'],
        correctAnswer: 1,
        explanation: 'A default parameter has a predefined value that is used if no argument is provided.'
      }
    ]
  },
  {
    id: 'oop-quiz',
    topicId: 'classes-objects',
    questions: [
      {
        id: 'q1',
        question: 'What is a class in Python?',
        options: ['A function', 'A blueprint for creating objects', 'A variable', 'A module'],
        correctAnswer: 1,
        explanation: 'A class is a blueprint or template for creating objects.'
      },
      {
        id: 'q2',
        question: 'What does the __init__ method do?',
        options: ['Destroys an object', 'Initializes an object', 'Prints an object', 'Compares objects'],
        correctAnswer: 1,
        explanation: 'The __init__ method is a constructor that initializes newly created objects.'
      },
      {
        id: 'q3',
        question: 'What does "self" refer to in a class method?',
        options: ['The class itself', 'The current instance', 'The parent class', 'A global variable'],
        correctAnswer: 1,
        explanation: '"self" refers to the current instance of the class being operated on.'
      }
    ]
  }
];
