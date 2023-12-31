// --- Array of special characters to be included in password ---
const specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];

// --- Array of numeric characters to be included in password ---
const numericCharacters = ['0','1','2','3','4','5','6','7','8','9'];

// --- Array of lowercase characters to be included in password ---
const lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// --- Array of uppercase characters to be included in password ---
const upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/* const minLength = 8;
const maxLength = 128;
let range = [];
function loop (arr=[], num=minLength, max=maxLength){
  arr.push(num);
  //console.log(arr);
  num += 1;
  if(num < max+1){
    loop(arr, num);
  }// else return {arr: arr}
}
loop(range); */
//const range = loop().arr;
//console.log(range);

const passSlider = htmlElement("#password-slider");
const outputPassLength = htmlElement("#password-length-value");
// --- display inital value in HTML before any input with slider ---
outputPassLength.value = passSlider.value;
// --- update value in page when slider handle moves ---
passSlider.oninput = () => outputPassLength.value = passSlider.value;
outputPassLength.oninput = () => passSlider.value = outputPassLength.value;

/* let passwordLength = (length) => {
  return length = length<minLength || length>maxLength ? Math.floor(Math.random()*(maxLength-minLength)+minLength) : length;
}; */

// --- Build characters array according to selected password options ---
const characters = (eventObj) => {
  const checked = document.getElementsByClassName("checkbox");
  let checkedCount = 0;
  for(let i=0; i<checked.length; i++) if(checked[i].checked) checkedCount++;
  if (checkedCount===0 && eventObj!==undefined) eventObj.target.checked = true;
  const arr = [];
  if (htmlElement("#special-checkbox").checked) arr.push(specialCharacters);
  if (htmlElement("#numbers-checkbox").checked) arr.push(numericCharacters);
  if (htmlElement("#lowercase-checkbox").checked) arr.push(lowerCasedCharacters);
  if (htmlElement("#uppercase-checkbox").checked) arr.push(upperCasedCharacters);
  return arr;
};

// --- Function for getting a random element from an array ---
const getRandom = (arr) => arr[Math.floor(Math.random()*arr.length)];

/* let userInput = 0;
function PromptUser () {
  userInput = Number(prompt("Enter a number between 8 - 128 for the password length."));
  if(!range.includes(userInput)) {
    alert("Please enter a whole number between 8 - 128");
    PromptUser();
  }
} */

// --- Function to generate password with user input ---
function generatePassword() {
  //PromptUser();
  //console.log(userInput);
  //let passLength = passwordLength(userInput);
  //alert(`Password Length is ${passLength}`);
  const passLength = Number(passSlider.value) || Number(outputPassLength.value);
  let pass = [];
  // --- Created loop without for-loop using tail recursion ---
  function loop (i=0, usedIndecies=[], newCharIndex)
  {
    let p = getRandom(characters()[Math.floor(Math.random()*characters().length)]);
    if(pass.length!==passLength){pass[i]=p;}
    i++;
    if (i===passLength)
    {
      console.log("before:",pass.join(''));
      for(let index=0; index<characters().length; index++){
        if(!containsCharacters(pass.join(''), characters()[index])){
          do newCharIndex = Math.floor(Math.random(passLength)*passLength);
          while(usedIndecies.includes(newCharIndex));
          pass[newCharIndex] = getRandom(characters()[index]);
          usedIndecies.push(newCharIndex);
          console.log(pass[newCharIndex]);
          console.log(usedIndecies);
        }
        if(index===characters().length-1){
          pass = pass.join('');
          console.log("after:",pass);
        }
      }
    }
    else if (i<passLength) loop(i, pass.join(''));
  }
  loop();
  return {pass: pass, passLength: passLength};
}

const containsCharacters = (inputString, charArray) => charArray.some(char => inputString.includes(char));
//alert(`Password is: ${generatePassword().pass}\nPassword Length is: ${generatePassword().passLength}`);

// Write password to the #password input
function writePassword(eventObj) {
  const password = generatePassword().pass;
  const passwordText = htmlElement("#password");
  passwordText.value = password;
}

function passCopy(eventObj) {
  const passwordText = htmlElement("#password");
  navigator.clipboard.writeText(passwordText.value);
  copyBtnText("add", "Copied!")
  //const copiedText = passwordText.value;
  //alert("Copied: " + copiedText);
}

function copyBtnText(action="", text=""){
  changeText("#copy", text)
  cssClass("#copy", action, "copied");
}

// Toggle password options displaying on screen
function toggleOptions(eventObj, css="hidden", id="#password-options"){
  cssClass(id, "toggle", css)
}

// Add event listener to 'generate', 'copy' and 'options' buttons
addGlobalEventListener('click', toggleOptions, '#options');
addGlobalEventListener('click', passCopy, '#copy');
addGlobalEventListener('click', writePassword, '#generate');
addGlobalEventListener('click', characters, ".checkbox")