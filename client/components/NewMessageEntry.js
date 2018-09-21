import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, sendMessage } from '../store'

class NewMessageEntry extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    //console.log(this)
    //console.log(this.props)
    this.props.write(event.target.value)
  }
  handleSubmit(event){
    event.preventDefault()
    console.log(this.props)
    const content = this.props.NewMessageEntry;
    const channelId = this.props.channelId;
    const name = this.props.author
    this.props.send({content, channelId, name})
  }
  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    NewMessageEntry : state.newMessageEntry,
    author: state.nameEntry
  }
}

const mapDispatchToProps = dispatch => {
  return {
    write : (text) => dispatch(writeMessage(text)),
    send : (message) => dispatch(sendMessage(message))
  }
}

const ConnectedNewMessageEntry = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
export default ConnectedNewMessageEntry