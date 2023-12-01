function addHistComponent(timestamp, values){
  let d=new Date(timestamp).getDate().toString()
  let m=new Date(timestamp).getMonth().toString()
  let y=new Date(timestamp).getFullYear().toString()
  let h=new Date(timestamp).getHours().toString()
  let min=new Date(timestamp).getMinutes().toString()

  let component_template=`
    <div class="hist-element">
      <p class="time-string">`+h+`:`+min+` `+d+`-`+m+`-`+y+`</p>
      <table>
        <tr>
          <th>
            Szerokość frontu
          </th>
          <th>
            Wysokość frontu
          </th>
          <th>
            Głebokość domu (1)
          </th>
          <th>
            Głębokość domu (2)
          </th>
          <th>
            Wysokość poddasza
          </th>
        </tr>
        <tr>
          <td>`+toComma(values[0]/1000)+`m </td>
          <td>`+toComma(values[1]/1000)+`m </td>
          <td>`+toComma(values[2]/1000)+`m </td>
          <td>`+toComma(values[3]/1000)+`m </td>
          <td>`+toComma(values[4]/1000)+`m </td>
        </tr>
        <tr>
          <th>
            Margines dachu (1)
          </th>
          <th>
            Margines dachu (2)
          </th>
          <th>
            Margines dachu (3)
          </th>
          <th>
            Margines dachu (4)
          </th>
        </tr>
        <tr>
          <td>`+toComma(values[5]/1000)+`m </td>
          <td>`+toComma(values[6]/1000)+`m </td>
          <td>`+toComma(values[7]/1000)+`m </td>
          <td>`+toComma(values[8]/1000)+`m </td>
        </tr>
      </table>
      <div class="load-button">Pokaż</div>
    </div>
  `
  return component_template
}

async function showHist(){
  console.log("hist")
  clearHeader()
  document.querySelector("main").style.paddingTop="75px"

  document.querySelector("header").querySelector("p").innerHTML="Historia"

  await injectHTML("main", "hist.html")
  loadData().history.forEach(element => {
    document.getElementById("hist-container").innerHTML+=addHistComponent(element.timestamp,element.data)
  });

  Array.from(document.getElementsByClassName("load-button")).forEach((button) => {
    button.onclick=async (button)=>{
      // console.log(button)
      let index=Array.from(document.getElementsByClassName("hist-element")).indexOf(button.srcElement.parentElement)
      console.log(button.srcElement.parentElement)
      console.log(loadData().history[index].data)
      localStorage.setItem("current_values", JSON.stringify(loadData().history[index].data))
      await showPage()
    }
  })
}
