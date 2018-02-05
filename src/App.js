import React, { Component } from 'react';
import styled from 'styled-components';
import ToDoListsPanel from './ToDoListsPanel';
import CreateToDoListPanel from './CreateToDoListPanel';

const Wrapper = styled.div`
    background-color: ${props => props.theme.contentBackgroundColor};
    box-shadow: ${props => props.theme.shadow};
    display: flex;
    flex-direction: row;
`

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          lists: [
              {
                  name: 'Personal',
                  tasks: [
                      'Cook dinner tonight',
                      'Photoshoot at night',
                      'Watch movie with wife',
                      'Cook dinner tonight',
                      'Photoshoot at night',
                      'Watch movie with wife',
                      'Cook dinner tonight',
                      'Photoshoot at night',
                      'Watch movie with wife',
                  ],
                  color: 'red',
              },
              {
                  name: 'Work',
                  tasks: [
                      'Send mails',
                      'Meeting at six',
                      'Lunch tomorrow'
                  ],
                  color: 'blue'
              },
              {
                  name: 'Shopping',
                  tasks: [
                      'Buy a shampoo',
                      'Buz milk',
                      'Hello folly'
                  ],
                  color: 'green'
              },
          ]
        }
    }


    render() {
    return (
      <Wrapper>
        <ToDoListsPanel toDos={this.state.lists}></ToDoListsPanel>
        <CreateToDoListPanel></CreateToDoListPanel>
      </Wrapper>
    );
  }
}

export default App;
