const htmlElement = (id) => document.querySelector(id);

const cssClass = (selector="", action="", cssClass="", element=htmlElement(selector)) => {
    switch (action) {
      case "add":
        element.classList.add(cssClass);
        break;
      case "remove":
        element.classList.remove(cssClass);
        break;
      case "toggle":
        element.classList.toggle(cssClass);
        break;
      default:
        break;
    }
  }
  
  const changeText = (selector="", txt="", element=htmlElement(selector)) => element.textContent=txt;

  function addGlobalEventListener(typeOfEvent, callback, selector, stopPropagation=true) {
    document.addEventListener(typeOfEvent, (eventObj) => {
      if (eventObj.target.matches(selector)) callback(eventObj);
      if (stopPropagation) eventObj.stopPropagation();
    })
  }