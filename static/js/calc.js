let data

function initializeObjects(){
  preview_objects.push(new houseFront("preview-element-0", 60))
  preview_objects.push(new houseSide("preview-element-1", 60))
  preview_objects.push(new houseFloor("preview-element-2", 60))
  preview_objects.push(new houseRoof("preview-element-3", 60))

  value_objects.push(new houseFront("user-values-preview-0", 90, "black"))
  value_objects.push(new houseSide("user-values-preview-1", 90, "black"))
  value_objects.push(new houseRoof("user-values-preview-2", 90, "black"))

  update(1)
}

function update(time=300){
  console.log("highlight: "+highlight);
  [ x, y, z, z1, y1, roof_margins.top, roof_margins.right, roof_margins.bottom, roof_margins.left]=getValues();
  console.log(getValues())

  preview_objects.forEach((object)=>{
    object.update(time)
  })

  value_objects.forEach((object)=>{
    object.update(time)
  })
  saveData()
}

function showDoubleSlope(){
  double_slope=(document.getElementById("double-slope-select").value == "true")
  if(!double_slope){
    document.getElementById("optional-z-input").style.display="none"
    document.getElementById("optional-z-input-input").value="0"
  }else{
    document.getElementById("optional-z-input").style.display="table-row"
    document.getElementById("optional-z-input-input").value="10"
    if(data.current_values[3]!=0){
      document.getElementById("optional-z-input-input").value=data.current_values[3]/1000
    }
  }
}

async function showCalc(){
  console.log("calc")

  document.querySelector("header").querySelector("p").innerHTML="Kalkulator"

  data=loadData()
  
  await Promise.all([injectHTML("main", "calc.html"), injectHTML("preview-container", "preview.html")]);
  // await injectHTML("main", "calc.html")
  // await injectHTML("preview-container", "preview.html")
  document.getElementById("main").style.paddingTop="150px"

  document.getElementById("preview-container").onclick=()=>{
    // console.log(document.getElementById("preview-container").style.display)
    if(document.getElementById("preview-content").style.display=="none"){
      document.getElementById("preview-content").style.removeProperty("display")
      document.getElementById("preview-arrow").style.transform="rotate(0deg)"
      document.getElementById("preview-arrow").style.rotate="0deg"
      document.querySelector("main").style.paddingTop="500px"
      return
    }
    document.getElementById("preview-content").style.display="none"
    document.getElementById("main").style.paddingTop="150px"
    document.getElementById("preview-arrow").style.rotate="-180deg"
    
  }

  Array.from(document.getElementsByClassName("user-values-inputs-input")).forEach((input) => {
    setInputFilter(input, function(value) {
      return /^\d{0,9}(\,|\.)?\d{0,5}$/.test(value);
    }, "Tylko liczby są dozwolone");

    let index=Array.from(document.getElementsByClassName("user-values-inputs-input")).indexOf(input)
    input.value=(data.current_values[index]/1000).toString().replace(".",",")
    input.oninput=()=>update()
    input.onfocus=()=>{
      if (index<5){
        highlight=index+1
        update()
        return
      }
      highlight=index+6
      update()
      return
    }
  });

  Array.from(document.getElementsByClassName("user-values-inputs-select")).forEach((select)=>{
    select.onchange=()=>update()
  });

  if(data.current_values[3]!=0){
    document.getElementById("double-slope-select").value="true"
    showDoubleSlope()
  }
  
  document.getElementById("double-slope-select").onchange=()=>{
    showDoubleSlope()
    update()
  }

  document.getElementById("summary-button").onclick=()=>{
    showSummary()
  }

  initializeObjects()
  // showSummary()
}