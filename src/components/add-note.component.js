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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.topic,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
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
    // ...
  }
}