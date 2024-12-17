
function Message(){
    //jsx = javaScript XML, typeScript version is tsx

    const name = "Lekan";

    if (name)
        return <h1>Hello {name}</h1>;
    else return <h1>Hello World</h1>
}

export default Message;