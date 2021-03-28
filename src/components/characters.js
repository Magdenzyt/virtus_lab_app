import React, { Component } from "react";
import style from "./characters.module.css";
import { Button,  Card, Accordion } from 'react-bootstrap';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      index: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }


  callAPI(count) {
    var end = count + this.state.index;
    for (; this.state.index < end; this.state.index++) {
      fetch(`https://swapi.dev/api/people/${this.state.index}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            characters: [
              ...this.state.characters,
              res
            ]
          })
        }).catch(err => {
          console.error(err);
        });
    }
  }

  componentDidMount() {
    this.callAPI(10);
  }

  handleClick() {
    this.callAPI(5);
  }

  render() {
    return (
      <div>
        {this.state.characters.map(co => (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <h3>{co.name}</h3>
                <br></br>
                <pre><b>Gender:</b> {co.gender}        <b>Birth year:</b> {co.birth_year}</pre>               
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <pre><b>Weight:</b> {co.mass}        <b>Height:</b> {co.height}</pre>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
        <div class="btn-group my-5" role="group" aria-label="First group">
         <Button class ="btn" variant = "outline-dark" onClick={this.handleClick}>Load more</Button>
        </div>
      </div>
      /*<div className={style.text}>
        <br></br>
        {this.state.characters.map(co => (
          <ListGroup>
            <ListGroupItem>{co.name}</ListGroupItem>
          </ListGroup>
        ))}
        <Button onClick={this.handleClick}>Buy now</Button>
      </div>*/
    );
  }
}

export default Characters;