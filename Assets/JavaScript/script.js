/* Generate a password when the button is clicked
Present a series of prompts for password criteria
Length of password
At least 8 characters but no more than 128.
Character types
Lowercase
Uppercase
Numeric
Special characters ($@%&*, etc)
Code should validate for each input and at least one character type should be selected
Once prompts are answered then the password should be generated and displayed in an alert or written to the page */
// Array of special characters to be included in password

const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const minLength = 8;
const maxLength = 128;
let passwordLength = (length) => {
  return length = length<minLength || length>maxLength ? Math.floor(Math.random()*(maxLength-minLength)+minLength) : length;
};

const characters = [
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters
]

/* // Function to prompt user for password options
function getPasswordOptions() {

} */

// Function for getting a random element from an array
function getRandom(arr) {
  if(arr !== undefined) return arr[Math.floor(Math.random()*arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  let passLength = passwordLength(Number(prompt(
`Enter a number that you want the length of your password to be.
Any number not between 8 - 128 will default to a number in that range.`)));
  alert(`Password Length is ${passLength}`);
  let pass = "";
  for (let index = 0; index < passLength; index++) {
    pass = pass.concat(getRandom(characters[Math.floor(Math.random()*characters.length)]));
  }
  return {pass: pass, passLength: passLength};
}
//alert(`Password is: ${generatePassword().pass}\nPassword Length is: ${generatePassword().passLength}`);

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword().pass;
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);