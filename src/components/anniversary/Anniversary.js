import React, {Component} from 'react'
import Navbar from "../Navbar";
import Footer from "../Footer";
import Timeline from "./Timeline"
import "../../styles/anniversary.css"

class Anniversary extends Component {
  state = {}

  componentDidMount(){
    console.log("We should loot some more info here I guess")
  }

  render() { 
    return ( 
      <>
        <Navbar />
        <div className="container">
          <div className="vh-85">
            <h1 className="centerH">Drammen Sacred Music Festival fyller 10 år!</h1>
            <article>
              <p>Not actually sure if text goes here, maybe big dick image or collage video or smth. idkwat</p>
              <p>Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text. Here goes super cool ultra text.</p>
            </article>
            <Timeline />
          </div>
        </div>
        <Footer />
      </>
     );
  }
}
 
export default Anniversary;