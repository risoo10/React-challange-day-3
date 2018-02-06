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
                      {
                          text: 'Cook dinner tonight',
                          done: true,
                      },
                      {
                          text: 'Photoshoot with friend',
                          done: false,
                      },
                      {
                          text: 'Dinner with Janka and Boris',
                          done: false,
                      },
                      {
                          text: "Push to github today's challange",
                          done: true,
                      },
                      {
                          text: 'Meet with students tomorrow',
                          done: false,
                      },
                      {
                          text: 'Say good night to Janka',
                          done: false,
                      },
                  ],
                  color: 'red',
              },
              {
                  name: 'Work',
                  tasks: [
                      {
                          text: "Call Milan and talk about web page",
                          done: false,
                      },
                      {
                          text: 'Change DNS records',
                          done: true,
                      },
                      {
                          text: 'Send CV as react developer',
                          done: false,
                      },
                  ],
                  color: 'blue'
              },
              {
                  name: 'Shopping',
                  tasks: [
                      {
                          text: "Buy softbox for better photoshoots",
                          done: true,
                      },
                      {
                          text: 'Buy funny accessories for photoshoots',
                          done: false,
                      },
                      {
                          text: 'Lights for photobackdrop',
                          done: true,
                      },
                  ],
                  color: 'green'
              },
          ],
            activeListIndex: 0,
            fullname: 'Richard Mocak',

        }
    }

    changeActiveListIndex(listIndex){
        this.setState({
            activeListIndex: listIndex
        })
    }

    addToDoItem(toDoText){
        const lists = this.state.lists;
        const newTodoItem = {
            text: toDoText,
            done: false,
        }
        lists[this.state.activeListIndex].tasks.push(newTodoItem);
        this.setState({
            lists: lists
        })
    }


    hadleToggleItemsState(listIndex, todoItemIndex){
        const lists = this.state.lists.slice();
        const list = lists[listIndex];
        const toDoItem = list.tasks[todoItemIndex];
        toDoItem.done = !toDoItem.done;
        this.setState({
            lists: lists
        })
    }

    handleDeleteToDoItem(listIndex, todoIndex){
        const lists = this.state.lists.slice();
        const list = lists[listIndex];
        list.tasks.splice(todoIndex, 1)
        this.setState({
            lists: lists
        })
    }


    render() {
    return (
      <Wrapper>
        <ToDoListsPanel
            toDos={this.state.lists}
            handleToggleToDoState={(listIndex, todoIndex) => this.hadleToggleItemsState(listIndex, todoIndex)}
            handleDeleteToDo={(listIndex, todoIndex) => this.handleDeleteToDoItem(listIndex, todoIndex)}
            changeActiveListIndex={(listIndex) => this.changeActiveListIndex(listIndex)}
            activeListIndex={this.state.activeListIndex}
        ></ToDoListsPanel>
        <CreateToDoListPanel
            createNewToDo={(todoText) => this.addToDoItem(todoText)}
            fullname={this.state.fullname}
            activeList={this.state.lists[this.state.activeListIndex]}
        ></CreateToDoListPanel>
      </Wrapper>
    );
  }
}

export default App;
