//Layout class for Creator Marketplace
//Developed by Claudio Lima

import React, { Component } from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";

class Market extends Component {

  //constructor
  constructor(props) {
      super(props);
      this.acceptListener = this.acceptListener.bind(this);
      this.rejectListener = this.rejectListener.bind(this);
  }

  //method to listen for accept button clicks
  acceptListener() {
    alert('Proposal Accepted!');
  }

  //method to listen for reject button clicks
  rejectListener() {
    alert('Proposal Rejected!');
  }

  render() {
    return (
      <div class="container-fluid">
        <Row>
          <Col>
            <Row>
              <Col>
                <Card className="text-dark">
                  <img
                    class="card-img-top"
                    alt="Bootstrap Thumbnail First"
                    src="https://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK-970-80.jpg.webp"
                  />
                  <Card.Body>
                    Brand name: Lenovo Ad: 100 CAD
                    <p>
                      <button class="btn btn-primary" href="#" onClick={this.acceptListener}>
                        Accept
                      </button>
                      <button class="btn" href="#" onClick={this.rejectListener}>
                        Reject
                      </button>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-dark">
                  <img
                    class="card-img-top"
                    alt="Bootstrap Thumbnail Second"
                    src="https://techcrunch.com/wp-content/uploads/2020/06/Trailze.jpg?w=1390&crop=1"
                  />
                  <Card.Body>
                    Brand name: Bird Ad: 500 CAD
                    <p>
                      <button class="btn btn-primary" href="#" onClick={this.acceptListener}>
                        Accept
                      </button>
                      <button class="btn" href="#" onClick={this.rejectListener}>
                        Reject
                      </button>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="text-dark">
                  <img
                    class="card-img-top"
                    alt="Bootstrap Thumbnail Third"
                    src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190705153821-takabisha-rollercoaster-006.jpg"
                  />
                  <Card.Body>
                    Brand name: Ottawa Park Ad: 1000 CAD
                    <p>
                      <button class="btn btn-primary" href="#" onClick={this.acceptListener}>
                        Accept
                      </button>
                      <button class="btn" href="#" onClick={this.rejectListener}>
                        Reject
                      </button>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Market;
