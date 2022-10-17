class CallBackElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      value: this.props.value,
      controllerCallBackObject: this.props.controllerCallBackObject,
      elementName: this.props.elementName,
      elementDisplayName: this.props.elementDisplayName,
      cssTag: this.props.cssTag };

    this.registerWithController();
  }

  getIndex() {
    return index;
  }
  setIndex(props) {
    this.state.index = props.index;
  }
  getElementName() {
    return this.state.elementName;
  }

  getValue() {
    return this.state.value;
  }

  setValue(props) {
    //store input in state
    this.state.value = props.value;
    //trigger re-render
    this.setState({ value: this.state.value });
  }

  appendValue(props) {
    //store input in state
    if (this.state.value === undefined || this.state.value === "0")
    this.state.value = props.value;else
    this.state.value = this.state.value + "" + props.value;

    //trigger re-render
    this.setState({ value: this.state.value });
  }

  registerWithController() {
    //add newly created element to CallBack object elment array and capture the index of the newly created array element
    this.state.controllerCallBackObject.registerCallBackElementObject({
      callBackElementObject: this,
      callBackElementDisplayName: this.state.elementDisplayName });

  }

  //default render method
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "callBackElement",
        onKeyDown: (event) =>
        this.state.contorllerCallBackObject.handleEvent({
          callingObject: this,
          event: event }),


        onMouseDown: (event) =>
        this.state.contorllerCallBackObject.handleEvent({
          callingObject: this,
          event: event }) }, "elementName: ",



      this.state.elementName, ", elementDisplayName:", " ",
      this.state.elementDisplayName, ", value: ", this.state.value));


  }}


class CallBackController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: new Array(),
      inputs: new Array() };

  }

  getElements() {
    return this.state.elements;
  }

  getElement(props) {

    var item = this.state.elements.find(item => item.name === props.name);
    if (item !== undefined && item !== null)
    return item.element;else

    return null;
  }

  registerCallBackElementObject(props) {
    //add newly created element to CallBack object elment array and capture the index of the newly created array element
    var index = this.getElements().push({
      element: props.callBackElementObject,
      name: props.callBackElementDisplayName });

    props.callBackElementObject.setIndex({ index: index });
  }

  handleEvent(props) {
    var callingObject = props.callingObject;
    var event = props.event;
    var displayElement = this.getElement({ name: "Display" });
    var formulaDisplayElement = this.getElement({ name: "FormulaDisplay" });
    var mouseButton = event.buttons; //1 left, 2 right
    var keyCode = event.keyCode;

    event.preventDefault();

    var valuePressed = callingObject.getValue();

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "controller" }, "default"));



  }}


class InputDisplay extends CallBackElement {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: this.state.cssTag,
        tabIndex: this.state.index,
        onMouseDown: (event) =>
        this.state.controllerCallBackObject.handleEvent({
          callingObject: this,
          event: event }),


        onKeyDown: (event) =>
        this.state.controllerCallBackObject.handleEvent({
          callingObject: this,
          event: event }) },



      this.state.value));


  }}


class Button extends CallBackElement {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: this.state.cssTag,
        onMouseDown: (event) =>
        this.state.controllerCallBackObject.handleEvent({
          callingObject: this,
          event: event }) },



      this.state.elementName));


  }}


class CalculatorCallBackController extends CallBackController {
  constructor(props) {
    super(props);
  }


  handleEvent(props) {
    var callingObject = props.callingObject;
    var event = props.event;
    var displayElement = this.getElement({ name: "Display" });
    var formulaDisplayElement = this.getElement({ name: "FormulaDisplay" });
    var mouseButton = event.buttons; //1 left, 2 right
    var keyCode = event.keyCode;

    event.preventDefault();

    var valuePressed = callingObject.getValue();

    if (valuePressed >= 0 && valuePressed < 10)
    displayElement.appendValue({ value: valuePressed });

    if (
    valuePressed === "+" ||
    valuePressed === "-" ||
    valuePressed === "*" ||
    valuePressed === "/")
    {
      var inputNumber = displayElement.getValue();
      if (inputNumber === 0) return;

      var inputFormula = inputNumber + " " + valuePressed;
      formulaDisplayElement.appendValue({ value: inputFormula });

      //reset display
      displayElement.setValue({ value: "0" });
    } else if (valuePressed === "=") {
      var inputNumber = displayElement.getValue();

      //reset display
      displayElement.setValue({ value: "0" });
      formulaDisplayElement.appendValue({ value: inputNumber });

      //calculate result of formula
      var result = eval(formulaDisplayElement.getValue());

      displayElement.setValue({ value: result });
      formulaDisplayElement.setValue({ value: "" });
    } else if (valuePressed === "Del") displayElement.setValue({ value: "0" });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "controller" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(InputDisplay, {
        value: "0",
        controllerCallBackObject: this,
        elementName: "Display",
        elementDisplayName: "Display",
        cssTag: "input" })), /*#__PURE__*/


      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(InputDisplay, {
        value: "",
        controllerCallBackObject: this,
        elementName: "FormulaDisplay",
        elementDisplayName: "FormulaDisplay",
        cssTag: "formulaDisplay" })), /*#__PURE__*/


      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(Button, {
        value: 1,
        controllerCallBackObject: this,
        elementName: "1",
        elementDisplayName: "Button 1",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 2,
        controllerCallBackObject: this,
        elementName: "2",
        elementDisplayName: "Button 2",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 3,
        controllerCallBackObject: this,
        elementName: "3",
        elementDisplayName: "Button 3",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "+",
        controllerCallBackObject: this,
        elementName: "+",
        elementDisplayName: "Button +",
        cssTag: "button" })), /*#__PURE__*/


      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(Button, {
        value: 4,
        controllerCallBackObject: this,
        elementName: "4",
        elementDisplayName: "Button 4",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 5,
        controllerCallBackObject: this,
        elementName: "5",
        elementDisplayName: "Button 5",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 6,
        controllerCallBackObject: this,
        elementName: "6",
        elementDisplayName: "Button 6",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "-",
        controllerCallBackObject: this,
        elementName: "-",
        elementDisplayName: "Button -",
        cssTag: "button" })), /*#__PURE__*/


      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(Button, {
        value: 7,
        controllerCallBackObject: this,
        elementName: "7",
        elementDisplayName: "Button 7",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 8,
        controllerCallBackObject: this,
        elementName: "8",
        elementDisplayName: "Button 8",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: 9,
        controllerCallBackObject: this,
        elementName: "9",
        elementDisplayName: "Button 9",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "*",
        controllerCallBackObject: this,
        elementName: "*",
        elementDisplayName: "Button *",
        cssTag: "button" })), /*#__PURE__*/


      React.createElement("div", { className: "board-row" }, /*#__PURE__*/
      React.createElement(Button, {
        value: 0,
        controllerCallBackObject: this,
        elementName: "0",
        elementDisplayName: "Button 0",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "Del",
        controllerCallBackObject: this,
        elementName: "Del",
        elementDisplayName: "Button Del",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "=",
        controllerCallBackObject: this,
        elementName: "=",
        elementDisplayName: "Button =",
        cssTag: "button" }), /*#__PURE__*/

      React.createElement(Button, {
        value: "/",
        controllerCallBackObject: this,
        elementName: "/",
        elementDisplayName: "Button /",
        cssTag: "button" })))));





  }}


// ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(CalculatorCallBackController, null), document.getElementById("container"));