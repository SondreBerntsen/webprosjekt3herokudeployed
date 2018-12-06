import React, {Component} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EventList from "../EventList";
import "../../styles/home.css";
import "../../styles/anniversary.css"
import { Link } from "react-router-dom";

class Home extends Component{
  state = {
    year: '',
    content: {}
  }

  componentDidMount = () => {
    this.getData()
  }
  getData = () => {
    fetch("http://localhost:5000/home")
      .then(response => response.json())
      .then(response => {
        this.checkStatus(response.data[0])
      })
      .catch(err => console.log(err));
  }
  checkStatus = (data) => {
    let content = {}
    //content for no anniversary
    content.anniversary = (data.anniversary === "on" ? true : false)
    if(data.status === "active"){
      content.pitch = data.pitch
      content.date = data.dateHeader_txt
    }
    else{
      content.pitch = data.pitch
      content.inactive = data.inactiveHeader_txt
    }
    let date = new Date();
    let year = date.getFullYear();
    this.setState({year: year, content: content})
  }
  checkAnniversary = () => {
    if(this.state.content.anniversary === true){
      return(
        <div className="row col-md-8 btnHeaderDiv">
          <Link to="/tilbakeblikk/10ar" className="btnHeader btn col-sm-12 col-md-10 col-lg-5">De siste 10 årene!</Link>
        </div>
      )
    }
  }

  render(){
    return (
      <React.Fragment>
        <Navbar />
        <div className="headerImage">
          <div className="container-fluid contentHeader  col-12 col-sm-10 col-lg-8 col-md-8 col-xl-6 ">
            <img className="logoImg  col-8 col-sm-6 col-md-6 col-lg-6 col-xl-5" src={require('../../img/logo.png')} alt="logo" />
            {<p className="headerText pitch">{this.state.content.pitch}</p>}
            <p className="dateHeader">{this.state.content.date}</p>
            {this.checkAnniversary()}
            <div className="row col-md-8 btnHeaderDiv">
              <Link to="/program" className="btnHeader btn col-sm-12 col-md-10 col-lg-5">Program</Link>
              <a href="#eventsHome" className="btnHeader btn col-sm-12 col-md-10 col-lg-5">Lineup</a>
            </div>
          </div>
          <div className="container mx-auto" id="eventsHome">
            <div className="row "><EventList year={this.state.year} /></div>
          </div>

          <div className="timeline">
            <div className="containerTimeline leftTimeline">
              <div class="contentTimeline">
                <h2>2017</h2>
                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
              </div>
            </div>
            <div className="containerTimeline rightTimeline">
              <div className="contentTimeline">
                <h2>2016</h2>
                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
              </div>
            </div>
          </div>
        </div>


        <Footer />
      </React.Fragment>
    )
  }
}

export default Home;