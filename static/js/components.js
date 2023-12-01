let margin=3

class houseFront{
  constructor(dom, size=80, color="#1a1a1a"){
    // console.log(dom)
    this.dom=dom
    this.size=size
    this.container=SVG().addTo("#"+dom).size(200,200)
    this.rect=this.container.rect(0, 0).attr({"stroke": "white", "stroke-width": 3, "fill": color})

    this.highlight_path = this.container.line(0, 0, 0, 0).attr({ "stroke": "var(--accent-color)", "stroke-width": 3})
  }

  updateTag(a,b=0){
    try{
      let string=""
      if(a%1===0){
        string+=a/1000+"m"
      }else{
        string+="~"+roundTo(a/1000,2)+"m"
      }
      if(b!=0){
        string+=" x<br>"
        if(b%1===0){
          string+=b/1000+"m"
        }else{
          string+="~"+roundTo(b/1000,2)+"m"
        }
      }
      document.getElementById(this.dom).querySelectorAll("p")[1].innerHTML=toComma(string)
    }catch{}finally{}
  }

  update(time=300){
    [this.x, this.y]=normalize(this.size, x, y)
    this.rect.animate(time).size(this.x, this.y)
    this.container.animate(time).size(this.x+margin*2, this.y+margin*2)
    this.rect.move(margin,margin)
    this.updateTag(x, y)
    this.drawHighlight(time)
  }

  drawHighlight(time){
    switch (highlight) {
      case 1:
        this.highlight_path.animate(time).plot(margin-1.5,margin,this.x+margin+1.5,margin)
        break;
      case 2:
        this.highlight_path.animate(time).plot(margin,margin-1.5,margin,this.y+margin+1.5)
        break;
      default:
        this.highlight_path.plot(0,0,0,0)
        break;
    }
  }
}

class houseSide extends houseFront{
  constructor(dom,size=80, color="#1a1a1a"){
    super(dom,size,color)
    this.rect=[]

    this.rect[0]=this.container.rect(0, 0).attr({"stroke": "white", "stroke-width": 3, "fill": color})
    this.rect[1]=this.container.rect(0, 0).attr({"stroke": "white", "stroke-width": 3, "fill": color})

    this.top_triangle=[]
    this.top_triangle[0]=[]
    this.top_triangle[1]=[]

    this.top_triangle[0][0]=this.container.line(0,0,0,0).attr({"stroke": "white", "stroke-width": 3})
    this.top_triangle[0][1]=this.container.line(0, 0, 0, 0).attr({ "stroke": "white", "stroke-width": 3 })

    this.top_triangle[1][0]=this.container.line(0,0,0,0).attr({"stroke": "white", "stroke-width": 3})
    this.top_triangle[1][1]=this.container.line(0, 0, 0, 0).attr({ "stroke": "white", "stroke-width": 3 })
    this.highlight_path = this.container.line(0, 0, 0, 0).attr({ "stroke": "var(--accent-color)", "stroke-width": 3 })
  }

  update(time){
    // console.log(x,y,z)
    [this.y, this.y1, this.z, this.z1]=normalize(this.size, y, y1, z, z1, z+z1, y+y1)
    
    if(double_slope){
      this.rect[0].animate(time).size(this.z,this.y)
      this.rect[0].move(margin,this.y1+margin)

      this.rect[1].animate(time).size(this.z1,this.y)
      this.rect[1].move(margin+this.z,this.y1+margin)

      // this.top_triangle[0][0].animate(time).plot(margin,margin,margin,this.y1+margin)
      this.top_triangle[0][1].animate(time).plot(margin+this.z,margin,margin,this.y1+margin)

      this.top_triangle[1][0].animate(time).plot(margin+this.z,margin,margin+this.z,this.y1+margin)
      this.top_triangle[1][1].animate(time).plot(margin+this.z,margin,this.z1+this.z+margin,this.y1+margin)

      this.container.animate(time).size(this.z+this.z1+margin*2,this.y+this.y1+margin*2)
      this.updateTag(z, y+y1)
      this.drawHighlight(time)
      return
    }
    this.rect[0].size(0,0)
    this.rect[1].animate(time).size(this.z,this.y)
    this.rect[1].move(margin,this.y1+margin)
    this.container.animate(time).size(this.z+margin*2,this.y+this.y1+margin*2)

    this.top_triangle[1][0].animate(time).plot(margin,margin,margin,this.y1+margin)
    this.top_triangle[1][1].animate(time).plot(margin,margin,this.z+margin,this.y1+margin)
    this.top_triangle[0][1].plot(0,0,0,0)

    this.updateTag(z, y+y1)
    this.drawHighlight(time)
  }

  drawHighlight(time){
    if(double_slope){
      switch (highlight) {
        case 2:
          this.highlight_path.animate(time).plot(margin,margin+this.y1-1.5,margin,this.y+this.y1+margin+1.5)
          break;
        case 3:
          this.highlight_path.animate(time).plot(margin-1.5,margin+this.y1+this.y,this.z+margin+1.5,margin+this.y1+this.y)
          break;
        case 4:
          this.highlight_path.animate(time).plot(margin-1.5+this.z,margin+this.y1+this.y,this.z+margin+1.5+this.z1,margin+this.y1+this.y)
          break;
        case 5:
          this.highlight_path.animate(time).plot(margin+this.z, margin, margin+this.z, margin+this.y1+1.5)
          break;
        default:
          this.highlight_path.plot(0,0,0,0)
          break;
      }
      return
    }
    switch (highlight) {
      case 2:
        this.highlight_path.animate(time).plot(margin,margin+this.y1-1.5,margin,this.y+this.y1+margin+1.5)
        break;
      case 3:
        this.highlight_path.animate(time).plot(margin-1.5,margin+this.y1+this.y,this.z+margin+1.5,margin+this.y1+this.y)
        break;
      case 5:
        this.highlight_path.animate(time).plot(margin, margin, margin, margin+this.y1+1.5)
        break;
      default:
        this.highlight_path.plot(0,0,0,0)
        break;
    }
  }
}

class houseFloor extends houseFront{
  constructor(dom,size=80,color="#1a1a1a") {
    super(dom, size, color)  
  }

  update(time = 300) {
    [this.x, this.z, this.z1, this.calc_z] = normalize(this.size, x, z, z1, z+z1)
    this.rect.animate(time).size(this.x, this.calc_z)
    this.container.animate(time).size(this.x + margin * 2, this.calc_z + margin * 2)
    this.rect.move(margin, margin)
    this.updateTag(x, z+z1)
    this.drawHighlight(time)
  }

  drawHighlight(time) {
    switch (highlight) {
      case 1:
        this.highlight_path.animate(time).plot(margin-1.5, margin, this.x+margin+1.5, margin)
        break;
      case 3:
        this.highlight_path.animate(time).plot(margin, margin-1.5, margin, this.z+margin+1.5)
        break;
      case 4:
        this.highlight_path.animate(time).plot(margin, margin-1.5+this.z, margin, this.calc_z+margin+1.5)
        break;
      default:
        this.highlight_path.plot(0, 0, 0, 0)
        break;
    }
  }
}

class houseRoof extends houseFront{
  constructor(dom, size=80,color="#1a1a1a"){
    super(dom,size, color)
    this.roof_margins={}
    // this.rect.attr({"fill": "var(--icons-off-color)", "stroke": "none"})
    this.margins_rect=this.container.rect(100,100).attr({"stroke": "var(--margins-color)", "stroke-width": 3, "fill": "var(--margins-color)"})
    this.rect=this.container.rect(0, 0).attr({"stroke": "white", "stroke-width": 3, "fill": color})
    this.roof_join=this.container.line(0,0,0,0).attr({"stroke": "white", "stroke-width": 3})
    this.highlight_path=this.container.line(0,0,0,0).attr({ "stroke": "var(--accent-color)", "stroke-width": 3})
  }

  updateTag(a,a1=0,b=0){
    try{
      let string=""
      if(a%1===0){
        string+=a/1000+"m"
      }else{
        string+="~"+roundTo(a/1000,2)+"m"
      }
      if(a1!=0){
        string+=" +<br>"
        if(a1%1===0){
          string+=a1/1000+"m"
        }else{
          string+="~"+roundTo(a1/1000,2)+"m"
        }
      }
      if(b!=0){
        string+=" x<br>"
        if(b%1===0){
          string+=b/1000+"m"
        }else{
          string+="~"+roundTo(b/1000,2)+"m"
        }
      }
      document.getElementById(this.dom).querySelectorAll("p")[1].innerHTML=toComma(string)
    }catch{}finally{}
  }

  update(time = 300) {
    if(z1==0){
      [this.x, 
        this.z, 
        this.z1,
        this.roof_margins.top, 
        this.roof_margins.right, 
        this.roof_margins.bottom, 
        this.roof_margins.left, 
        this.calc_x, 
        this.calc_z] = normalize(
          this.size,
          x, 
          Math.sqrt(z*z+y1*y1),
          0, 
          roof_margins.top, 
          roof_margins.right, 
          roof_margins.bottom, 
          roof_margins.left, 
          roof_margins.top+x+roof_margins.bottom, 
          roof_margins.left+Math.sqrt(z*z+y1*y1)+roof_margins.right
      )
    }else{
      [this.x, 
        this.z, 
        this.z1,
        this.roof_margins.top, 
        this.roof_margins.right, 
        this.roof_margins.bottom, 
        this.roof_margins.left, 
        this.calc_x, 
        this.calc_z] = normalize(
          this.size,
          x, 
          Math.sqrt(z*z+y1*y1),
          Math.sqrt(z1*z1+y1*y1), 
          roof_margins.top, 
          roof_margins.right, 
          roof_margins.bottom, 
          roof_margins.left, 
          roof_margins.top+x+roof_margins.bottom, 
          roof_margins.left+Math.sqrt(z*z+y1*y1)+Math.sqrt(z1*z1+y1*y1)+roof_margins.right
      )
    }

    this.rect.animate(time).size(this.z+this.z1, this.x)
    this.container.animate(time).size(this.calc_z+margin*2, this.calc_x+margin*2)
    this.rect.animate(time).move(margin+this.roof_margins.left, margin+this.roof_margins.top)

    this.margins_rect.animate(time).size(this.calc_z, this.calc_x)
    this.margins_rect.move(margin,margin)

    if(double_slope){
      this.roof_join.plot(this.z+margin+this.roof_margins.left,margin-1.5,this.z+margin+this.roof_margins.left,this.calc_x+margin+1.5)
      this.updateTag(Math.sqrt(z*z+y1*y1)+roof_margins.left, Math.sqrt(z1*z1+y1*y1)+roof_margins.right, x+roof_margins.top+roof_margins.bottom)
    }else{
      this.roof_join.plot(0,0,0,0)
      this.updateTag(Math.sqrt(z*z+y1*y1)+roof_margins.left+roof_margins.right, 0, x+roof_margins.top+roof_margins.bottom)
    }

    this.drawHighlight(time)
  }

  async drawHighlight(time) {
    switch (highlight) {
      case 1:
        this.highlight_path.animate(time).plot(margin+this.roof_margins.left, margin-1.5+this.roof_margins.top, margin+this.roof_margins.left, this.x+margin+1.5+this.roof_margins.top)
        break;
      // case 3:
      //   this.highlight_path.animate(time).plot(margin-1.5+this.roof_margins.left, margin+this.roof_margins.top, this.z+margin+1.5+this.roof_margins.left, margin+this.roof_margins.top)
      //   break;
      // case 4:
      //   this.highlight_path.animate(time).plot(margin-1.5+this.roof_margins.left+this.z, margin+this.roof_margins.top, margin+3-this.roof_margins.left+this.z+this.z1, margin+this.roof_margins.top)
      //   break;
      case 11:
        this.highlight_path.animate(time).plot(this.calc_z/2-10+margin, margin, this.calc_z/2+10+margin, margin)
        break;
      case 12:
        this.highlight_path.animate(time).plot(this.calc_z+margin, this.calc_x/2-10+margin, this.calc_z+margin, this.calc_x/2+10+margin)
        break;
      case 13:
        this.highlight_path.animate(time).plot(this.calc_z/2-10+margin, this.calc_x+margin, this.calc_z/2+10+margin, this.calc_x+margin)
        break;
      case 14:
        this.highlight_path.animate(time).plot(margin, this.calc_x/2-10+margin, margin, this.calc_x/2+10+margin)
        break; 
      default:
        this.highlight_path.plot(0, 0, 0, 0)
        break;
    }
  }
}
