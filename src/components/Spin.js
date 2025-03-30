import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDharmachakra } from "@fortawesome/free-solid-svg-icons";
import "./Wheel.css";
class SpinnerWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWheelOpen: false,
      wheelSpinning: false,
      prize: "",
    };
    this.wheelResultRef = React.createRef();
    this.prizeRef = React.createRef();
    this.couponTitleRef = React.createRef();
  }

  toggleWheel = () => {
    this.setState((prevState) => ({
      isWheelOpen: !prevState.isWheelOpen,
    }));
  };

  spinWheel = () => {
    if (this.state.wheelSpinning) return;

    this.setState({ wheelSpinning: true });

    const prizes = [
      "Free Coffee",
      "10% OFF",
      "Buy 1 Get 1",
      "Free Pastry",
      "15% OFF",
      "Free Dessert",
    ];

    // Random prize selection
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    // Simulate wheel spinning
    setTimeout(() => {
      this.setState({
        wheelSpinning: false,
        prize: selectedPrize,
      });
      if (this.wheelResultRef.current) {
        this.wheelResultRef.current.style.display = "block";
      }

      if (this.prizeRef.current && selectedPrize) {
        this.prizeRef.current.textContent = selectedPrize;
      }

      if (this.couponTitleRef.current && selectedPrize) {
        this.couponTitleRef.current.textContent = selectedPrize.toUpperCase();
      }
    }, 3000);
  };

  render() {
    const { isWheelOpen, wheelSpinning, prize } = this.state;

    return (
      <>
        {/* Spin Wheel Icon */}
        <div className="wheelicon" onClick={this.toggleWheel}>
          <FontAwesomeIcon icon={faDharmachakra} />
          <span className="wheellabel">Spin & Win</span>
        </div>

        {/* Spin Wheel Popup Container */}
        <div
          className="wheelpopup"
          style={{ display: isWheelOpen ? "block" : "none" }}
        >
          <div className="wheelpopupcontent">
            <span onClick={this.toggleWheel} className="closewheel">
              &times;
            </span>

            <div className="wheelheader">
              <h2>Spin to Win!</h2>
              <p>Try your luck and win exclusive coffee offers</p>
            </div>

            <div className="wheelcontainer">
              <div
                className={`wheel ${wheelSpinning ? "spinning" : ""}`}
                style={{
                  transform: wheelSpinning ? "rotate(1440deg)" : "rotate(0deg)",
                }}
              >
                <div
                  className="wheelsection"
                  style={{ "--i": 1, "--color": "#8b4513" }}
                >
                  <span>Free Coffee</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 2, "--color": "#a05a2c" }}
                >
                  <span>10% OFF</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 3, "--color": "#8b4513" }}
                >
                  <span>Buy 1 Get 1</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 4, "--color": "#a05a2c" }}
                >
                  <span>Free Pastry</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 5, "--color": "#8b4513" }}
                >
                  <span>15% OFF</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 6, "--color": "#a05a2c" }}
                >
                  <span>Free Dessert</span>
                </div>
              </div>
              <div className="wheelarrow"></div>
              <button
                onClick={this.spinWheel}
                className="spinbtn"
                disabled={wheelSpinning}
              >
                SPIN
              </button>
            </div>

            <div
              className="wheelresult"
              ref={this.wheelResultRef}
              style={{ display: prize ? "block" : "none" }}
            >
              <h3>Congratulations!</h3>
              <p id="prizetext">
                You won: <span id="prize" ref={this.prizeRef}>{prize}</span>
              </p>
              <div className="coupon">
                <div className="couponcontent">
                  <h4 id="coupontitle" ref={this.couponTitleRef}>{prize.toUpperCase()}</h4>
                  <p>
                    Use code: <span id="couponcode">CAFEWIN2025</span>
                  </p>
                  <p className="couponexpiry">Valid for 24 hours</p>
                </div>
              </div>
              <button className="claimbtn">Claim Your Prize</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SpinnerWheel;