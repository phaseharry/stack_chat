import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'
import socket from './socket'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const AUTHOR_NAME = 'AUTHOR_NAME'

export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages,
});

export const writeMessage = text => ({
  type: WRITE_MESSAGE,
  text
})

export const writeName = name => ({
  type: AUTHOR_NAME,
  name
})


export const gotNewMessageFromServer = message => ({
  type:GOT_NEW_MESSAGE_FROM_SERVER,
  message
})

export const fetchMessages = () => {
  return async (dispatch, getState) => {
    const response = await axios.get('/api/messages')
    const action = gotMessagesFromServer(response.data)
    dispatch(action)
  }
}

export const sendMessage = (message) => {
  return async (dispatch, getState) => {
    const newMessage = await axios.post('/api/messages', message)
  // console.log(newMessage.data)
    dispatch(gotNewMessageFromServer(newMessage.data))
    socket.emit('new-message', newMessage.data)
  }
}

const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: ''
};

const reducer = (state =initialState, action) => {
  switch (action.type) {
    case AUTHOR_NAME:
      return {...state, nameEntry: action.name}
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: [...action.messages] };
    case WRITE_MESSAGE: 
      return {...state, newMessageEntry: action.text}
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]}
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
