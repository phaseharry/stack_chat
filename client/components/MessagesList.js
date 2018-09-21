import React, { Component } from 'react';
import {connect} from 'react-redux'
import Message from './Message';
import ConnectedNewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, { fetchMessages } from '../store'

class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState()
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    this.props.fetchInitialMessages()
  }

  render () {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <ConnectedNewMessageEntry channelId={channelId}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages : state.messages,
    author: state.nameEntry
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialMessages : () => dispatch(fetchMessages())
  }
}

const ConnectedMessagesList = connect(mapStateToProps, mapDispatchToProps)(MessagesList)
export default ConnectedMessagesList;
