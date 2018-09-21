import React from 'react';
import {connect} from 'react-redux'
import {writeName} from '../store'

class NameEntry extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.write(event.target.value)
    }
    render(){
        return (
            <form className="form-inline">
                <label htmlFor="name">Your name:</label>
                <input
                    type="text"
                    name="name"
                    value={this.props.nameEntry}
                    placeholder="Enter your name"
                    className="form-control"
                    onChange={this.handleChange}
                />
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        write : (name) => dispatch(writeName(name))
    }
}

const mapStateToProps = state => {
    return {
        nameEntry : state.nameEntry
    }
}

const ConnectedNameEntry = connect(mapStateToProps, mapDispatchToProps)(NameEntry)
export default ConnectedNameEntry