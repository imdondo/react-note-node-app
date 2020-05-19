import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDescription = this.onChangeSearchDescription.bind(this);
    this.retrieveNotes = this.retrieveNotes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
    this.removeAllNotes = this.removeAllNotes.bind(this);
    this.searchDescription = this.searchDescription.bind(this);

    this.state = {
      notes: [],
      currentNote: null,
      currentIndex: -1,
      searchDescription: ""
    };
  }

  componentDidMount() {
    this.retrieveNotes();
  }

  onChangeSearchDescription(e) {
    const searchDescription = e.target.value;

    this.setState({
      searchDescription: searchDescription
    });
  }

  retrieveNotes() {
    NoteDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNotes();
    this.setState({
      currentNote: null,
      currentIndex: -1
    });
  }

  setActiveNote(note, index) {
    this.setState({
      currentNote: note,
      currentIndex: index
    });
  }

  removeAllNotes() {
    NoteDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDescription() {
    NoteDataService.findByDescription(this.state.searchDescription)
      .then(response => {
        this.setState({
          notes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchDescription, notes, currentNote, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by description"
              value={searchDescription}
              onChange={this.onChangeSearchDescription}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDescription}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Note List</h4>

          <ul className="list-group">
            {notes &&
              notes.map((note, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNote(note, index)}
                  key={index}
                >
                  {note.description}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNotes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentNote ? (
            <div>
              <h4>Note</h4>
              <div>
                <label>
                  <strong>Topic:</strong>
                </label>{" "}
                {currentNote.topic}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNote.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentNote.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/notes/" + currentNote.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Note...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
