import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNote = this.getNote.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      currentNote: {
        id: null,
        topic: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTopic(e) {
    const topic = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNote: {
          ...prevState.currentNote,
          topic: topic
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentNote: {
        ...prevState.currentNote,
        description: description
      }
    }));
  }

  getNote(id) {
    NoteDataService.get(id)
      .then(response => {
        this.setState({
          currentNote: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentNote.id,
      topic: this.state.currentNote.topic,
      description: this.state.currentNote.description,
      published: status
    };

    NoteDataService.update(this.state.currentNote.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNote: {
            ...prevState.currentNote,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNote() {
    NoteDataService.update(
      this.state.currentNote.id,
      this.state.currentNote
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The note was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNote() {    
    NoteDataService.delete(this.state.currentNote.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/notes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNote } = this.state;

    return (
      <div>
        {currentNote ? (
          <div className="edit-form">
            <h4>Note</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Topic</label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  value={currentNote.topic}
                  onChange={this.onChangeTopic}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNote.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentNote.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentNote.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNote}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNote}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Note...</p>
          </div>
        )}
      </div>
    );
  }
}