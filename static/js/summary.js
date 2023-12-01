let summary_objects=[]

function initializeSummaryObjects(){
  let objects_size=120
  summary_objects.push(new houseFront("summary-element-0", objects_size, "black"))
  summary_objects.push(new houseSide("summary-element-1", objects_size, "black"))
  summary_objects.push(new houseFloor("summary-element-2", objects_size, "black"))
  summary_objects.push(new houseRoof("summary-element-3", objects_size, "black"))

  summary_objects.forEach((object)=>{
    object.update(1)
  })
}

async function showSummary(){
  highlight=0
  saveData(true)
  clearHeader()
  document.querySelector("main").style.paddingTop="75px"
  document.querySelector("header").querySelector("p").innerHTML="Podsumowanie"
  await injectHTML("main", "summary.html")
  initializeSummaryObjects()
  let nom=1000

  let calculated_data=[
    toComma(roundTo(x/nom, 2)+"m&nbspx&nbsp"+roundTo(y/nom,2)+"m"),
    toComma(roundTo(x/nom*y/nom,2)+"m<sup>2</sup>"),
    toComma(roundTo(z/nom+z1/nom,2)+"m&nbspx&nbsp"+roundTo(y/nom,2)+"m"),
    toComma(roundTo(y1/nom,2)+"m"),
    toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom,2))+"m, ~"+toComma(roundTo(Math.sqrt(z1*z1+y1*y1)/nom,2)+"m"),
    toComma(roundTo(z/nom,2)+"m"),
    toComma(roundTo((z/nom+z1/nom)*y/nom,2)+"m<sup>2</sup>"),
    toComma("~"+roundTo((z/nom+z1/nom)*y1/nom/2,2)+"m<sup>2</sup>"),
    toComma(roundTo((z/nom+z1/nom)*y/nom+(z/nom+z1/nom)*y1/nom/2,2)+"m<sup>2</sup>"),
    toComma(roundTo(x/nom,2)+"m&nbspx&nbsp"+roundTo((z/nom+z1/nom),2)+"m"),
    toComma(roundTo(x/nom*(z/nom+z1/nom),2)+"m<sup>2</sup>"),
    toComma(roundTo((Math.sqrt(z*z+y1*y1)+Math.sqrt(z1*z1+y1*y1)+roof_margins.left+roof_margins.right)/nom,2)+"m&nbspx&nbsp"+roundTo((x+roof_margins.top+roof_margins.bottom)/nom,2)+"m"),
    toComma(roundTo((Math.sqrt(z*z+y1*y1)+Math.sqrt(z1*z1+y1*y1))/nom,2)+"m&nbspx&nbsp"+roundTo(x/nom,2)+"m"),
    toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom,2)+"m&nbspx&nbsp"+x/nom)+"m, "+toComma("~"+roundTo(Math.sqrt(z1*z1+y1*y1)/nom,2)+"m&nbspx&nbsp"+x/nom+"m"),
    toComma(roundTo(roof_margins.top/nom,2))+"m, "+toComma(roundTo(roof_margins.right/nom,2))+"m, "+toComma(roundTo(roof_margins.bottom/nom,2))+"m, "+toComma(roundTo(roof_margins.left/nom,2))+"m",
    toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom*x/nom,2))+"m<sup>2</sup>, "+toComma("~"+roundTo(Math.sqrt(z1*z1+y1*y1)/nom*x/nom,2)+"m<sup>2</sup>"),
    toComma("~"+roundTo((Math.sqrt(z*z+y1*y1)+Math.sqrt(z1*z1+y1*y1))/nom*x/nom,2))+"m<sup>2</sup>",
    toComma("~"+roundTo((Math.sqrt(z*z+y1*y1)+Math.sqrt(z1*z1+y1*y1)+roof_margins.left+roof_margins.right)/nom*(x+roof_margins.top+roof_margins.bottom)/nom,2)+"m<sup>2</sup>"),
    x/nom*y/nom*2+(y/nom*(z+z1)/nom+(z+z1)/nom*y1/nom/2)*2+x/nom*(z+z1)/nom
  ]

  if(z1==0){
    calculated_data[4]=toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom,2)+"m")
    calculated_data[5]="0m"
    calculated_data[11]=toComma(roundTo((Math.sqrt(z*z+y1*y1)+roof_margins.left+roof_margins.right)/nom,2)+"m&nbspx&nbsp"+roundTo((x+roof_margins.top+roof_margins.bottom)/nom,2)+"m")
    calculated_data[12]=toComma(roundTo(Math.sqrt(z*z+y1*y1)/nom,2)+"m&nbspx&nbsp"+x/nom+"m")
    calculated_data[13]=toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom,2)+"m&nbspx&nbsp"+x/nom+"m")
    calculated_data[15]=toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom*x/nom,2)+"m<sup>2</sup>")
    calculated_data[16]=toComma("~"+roundTo(Math.sqrt(z*z+y1*y1)/nom*x/nom,2)+"m<sup>2</sup>")
    calculated_data[17]=toComma("~"+roundTo((Math.sqrt(z*z+y1*y1)+roof_margins.left+roof_margins.right)/nom*(x+roof_margins.top+roof_margins.bottom)/nom,2)+"m<sup>2</sup>")
    calculated_data[18]+=(Math.sqrt(z*z+y1*y1)+roof_margins.left+roof_margins.right)/nom*(x+roof_margins.top+roof_margins.bottom)/nom
  } else{
    calculated_data[18]+=((Math.sqrt(z*z+y1*y1)+roof_margins.left)/nom*(x+roof_margins.top+roof_margins.bottom)/nom)+((Math.sqrt(z1*z1+y1*y1)+roof_margins.right)/nom*(x+roof_margins.top+roof_margins.bottom)/nom)
  }
  calculated_data[18]=toComma("~"+roundTo(calculated_data[18],2)+"m<sup>2</sup>")

  Array.from(document.getElementsByClassName("summary-data")).forEach((object)=>{
    let index=Array.from(document.getElementsByClassName("summary-data")).indexOf(object)
    object.innerHTML=calculated_data[index]
  })
}