import React, { Component } from "react";
import style from "./characters.module.css";
import { Button, Card, Accordion } from 'react-bootstrap';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      index: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickMovies = this.handleClickMovies.bind(this);
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
        .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(res);
        })
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

  callAPIMovies(url) {
    var tab = url.split("/");
    var id = tab[tab.length - 2];

    fetch(`https://swapi.dev/api/films/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        for (var i = 0; i < this.state.characters.length; i++) {
          for (var j = 0; j < this.state.characters[i]["films"].length; j++) {
            if (this.state.characters[i]["films"][j] == url) {
              this.state.characters[i]["films"][j] = res["title"];
            }
          }
        }
        this.setState({
          characters: this.state.characters
        })
      }).catch(err => {
        console.error(err);
      });

  }

  componentDidMount() {
    this.callAPI(10);
  }

  handleClick() {
    this.callAPI(5);
  }

  handleClickMovies(character) {
    for (var i = 0; i < character["films"].length; i++) {
      let url = character["films"][i];
      if (url.startsWith("http")) {
        this.callAPIMovies(url);
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.characters.map(co => (
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" onClick={this.handleClickMovies.bind(null, co)}>
                <h3>{co.name}</h3>
                <br />
                <pre><b>Gender:</b> {co.gender}        <b>Birth year:</b> {co.birth_year}</pre>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <pre><b>Weight:</b> {co.mass}        <b>Height:</b> {co.height}</pre>
                  <b>Movies</b>
                  {co["films"].map(f => (
                    <div>{f}</div>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
        <div class="btn-group my-5" role="group" aria-label="First group">
          <Button class="btn" variant="outline-dark" onClick={this.handleClick}>Load more</Button>
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