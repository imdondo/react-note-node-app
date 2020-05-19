import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.newNote = this.newNote.bind(this);

    this.state = {
      id: null,
      topic: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTopic(e) {
    this.setState({
      topic: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveNote() {
    var data = {
      topic: this.state.topic,
      description: this.state.description
    };

    NoteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          topic: response.data.topic,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newNote() {
    this.setState({
      id: null,
      topic: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newNote}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                className="form-control"
                id="topic"
                required
                value={this.state.topic}
                onChange={this.onChangeTopic}
                name="topic"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveNote} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}