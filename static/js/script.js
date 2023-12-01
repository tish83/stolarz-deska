let roof_margins={}
let preview_objects=[]
let value_objects=[]
let highlight=0
let double_slope=false

async function showPage(button=null){
  if(button==null){
    button=document.getElementById("calc")
  }        
  Array.from(document.getElementsByClassName("footer-button")).forEach((button) => {
    button.querySelector("svg").querySelector("path").style.fill="var(--icons-off-color)"
    button.querySelector("svg").style.transform="scale(1.1)"
    button.style.color="var(--icons-off-color)"
  })
  button.querySelector("svg").querySelector("path").style.fill="var(--accent-color)"
  button.querySelector("svg").style.transform="translate(0,-5px) scale(1.1)"
  button.style.color="var(--accent-color)"

  if(button.id=="calc"){
    await showCalc()
  }
  if(button.id=="hist"){
    await showHist()
  }
}

window.onload = async function() {
  Array.from(document.getElementsByClassName("footer-button")).forEach((button) => {
    button.onclick=()=>showPage(button)
  });
  await showPage()
};
