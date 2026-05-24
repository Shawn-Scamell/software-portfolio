function init() {
    addElement()
    // addUl("Listen UP!!")
}




function addElement() {

    // create a new div element
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createTextNode("Hello World!");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

}

function addUl(textContent) {
    const newUl = document.createElement("ul")
    const newLi = document.createElement("li")
    const newContent = document.createTextNode(`${textContent}`)
    newUl.appendChild(newLi);
    newLi.appendChild(newContent)
    const currentUl = document.getElementById("ul1")
    document.body.insertBefore(newUl, currentUl)
}


init()

