import React, { Component } from "react";

export default class Hero extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      show: false,
      data: null,
    };
    this.handleReset = this.handleReset.bind(this);
  }
  handleClick(p) {
    alert("class comp " + p);
  }
  handleReset() {
    console.log("ok");
    this.setState({ count: 0 });
  }
  render() {
    return (
      <div>
        <h2>
          {this.props.title} {this.state.count}
        </h2>
        <button
          className="border"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Increment
        </button>
        <button
          disabled={this.state.count <= 0}
          className="border disabled:bg-slate-200"
          onClick={() => this.setState({ count: this.state.count - 1 })}
        >
          Decrement
        </button>
        {this.state.count ? (
          <button className="border" onClick={this.handleReset}>
            reset
          </button>
        ) : (
          <></>
        )}
        <button onClick={() => this.handleClick(6)}>click</button>
        <br />
        <button onClick={() => this.setState({ show: !this.state.show })}>
          Show {this.state.show ? "less" : "more"}
        </button>
        {this.state.show && (
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            voluptate mollitia molestiae laudantium odio corrupti nihil illo?
            Consequatur incidunt repudiandae magnam. Fuga tempora vitae expedita
            fugit ipsam quis, eum illum perferendis quidem? Unde voluptatum
            atque veritatis eveniet aut, tempora repellendus dolor cum facilis
            quae deleniti esse saepe maxime libero ipsa, consectetur velit
            debitis excepturi dolores ratione doloremque ipsum quidem magnam.
            Deserunt mollitia nihil at minima praesentium alias est aperiam
            ducimus iure iusto! Voluptas natus quas obcaecati, placeat tempora
            labore non vitae totam sed voluptates assumenda quae doloremque
            inventore officiis temporibus in. Placeat commodi aperiam quaerat,
            quasi illum facilis laborum officia.
          </p>
        )}
      </div>
    );
  }
}
