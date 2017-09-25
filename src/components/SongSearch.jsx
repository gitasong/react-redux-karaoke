import React from "react";
import styles from "./../styles/SongSearch.css";
import { fetchSongId } from "./../actions";
import { connect } from "react-redux";

class SongSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let { _title } = this.refs;
    if (!_title.value.trim()) {
      return;
    }
    this.props.dispatch(fetchSongId(_title.value.trim()));
    _title.value = "";
  }

  render() {
    let input;
    return (
      <div className = {styles.songSearch}>
        <form onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }

          // this is where custom logic goes
          console.log("SEARCHED SONG:");
          console.log(input.value.trim());
          //

          input.value = "";
        }}>
          <input placeholder="Song Title" ref={node => {
            input = node;
          }}></input>
          <button>search</button>
        </form>
      </div>
    );
  }
}

export default connect()(SongSearch);
