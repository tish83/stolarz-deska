function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalize(...args) {
  var target = args[0];
  args.splice(0, 1);
  var highest = 0;
  var dimensions = [];
  args.forEach((element) => {
    if (highest < element) {
      highest = element;
    }
  });
  args.forEach((element) => {
    dimensions.push((element / highest) * target);
  });
  return dimensions;
}

function roundTo(n, digits) {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = (n * -1).toFixed(digits);
  }
  return n;
}

function toComma(text) {
  return text.toString().replaceAll(".", ",");
}

function setInputFilter(textbox, inputFilter, errMsg) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
    "focusout",
  ].forEach(function (event) {
    textbox.addEventListener(event, function (e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

async function injectHTML(dom_element = "main", docs_file) {
  document.scrollingElement.scrollTop = 0;
  document.getElementById(dom_element).style.opacity = "0";
  await sleep(150);
  await fetch("docs/" + docs_file)
    .then((response) => response.text())
    .then((text) => (document.getElementById(dom_element).innerHTML = text));
  await sleep(150);
  document.getElementById(dom_element).style.opacity = "1";
}

function clearHeader() {
  document.getElementById("preview-container").innerHTML = "";
  document.querySelector("main").style.paddingTop = "150px";
}

function getValues() {
  let values = [];

  Array.from(
    document.getElementsByClassName("user-values-inputs-input")
  ).forEach((input) => {
    values.push(Number(input.value.replace(",", ".")));
  });

  Array.from(
    document.getElementsByClassName("user-values-inputs-select")
  ).forEach((select) => {
    let index = Array.from(
      document.getElementsByClassName("user-values-inputs-select")
    ).indexOf(select);
    values[index] *= Array.from(
      document.getElementsByClassName("user-values-inputs-select")
    )[index].value;
  });
  return values;
}

function saveData(save_hist = false) {
  localStorage.setItem("current_values", JSON.stringify(getValues()));
  if (save_hist) {
    let history = [];
    if (localStorage.getItem("history") != null) {
      history = JSON.parse(localStorage.getItem("history").toString());
    }
    history.unshift({
      timestamp: Date.now(),
      data: getValues(),
    });
    localStorage.setItem("history", JSON.stringify(history));
  }
}

function loadData() {
  let data = {};
  data.current_values = [
    50000, 50000, 50000, 0, 30000, 1000, 1000, 1000, 1000, 0, 0,
  ];
  if (localStorage.getItem("current_values") != null) {
    data.current_values = JSON.parse(
      localStorage.getItem("current_values").toString()
    );
  }
  data.history = [];
  if (localStorage.getItem("history") != null) {
    data.history = JSON.parse(localStorage.getItem("history").toString());
  }
  return data;
}
