import React, { Component } from 'react';
import styled from 'styled-components';
import ToDoListsPanel from './ToDoListsPanel';
import CreateToDoListPanel from './CreateToDoListPanel';
import fire from './fire'
import _ from 'lodash';

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
            lists: [],
            fullname: 'Anonymous',
            activeListIndex: 0,
        }
    }

    componentDidMount() {
        const rootRef = fire.database().ref();
        const fullNameRef = rootRef.child('fullname');
        const listsRef = rootRef.child('lists');
        fullNameRef.on('value', snap => {
            this.setState({
                fullname: snap.val()
            })
        })
        listsRef.on('value', snap => {
            const lists = [];
            snap.forEach( list => {
                const tasksArray = [];
                const tasks = list.val().tasks;

                if(tasks) {
                    const keys = _(tasks).keys();
                    keys.forEach(key => {
                        const task = _.clone(tasks[key]);
                        task.key = key;
                        tasksArray.push(task);
                    })
                }

                let clonedList = _.clone(list.val());
                clonedList.key = list.key;
                clonedList.tasks = tasksArray;
                lists.push(clonedList);
            })
            this.setState({
                lists: lists
            });
        })
    }

    changeActiveListIndex(listIndex){
        this.setState({
            activeListIndex: listIndex
        })
    }

    render() {
    return (
        <Wrapper>
            <ToDoListsPanel
                toDos={this.state.lists}
                changeActiveListIndex={(listIndex) => this.changeActiveListIndex(listIndex)}
                activeListIndex={this.state.activeListIndex}
            ></ToDoListsPanel>
            <CreateToDoListPanel
                fullname={this.state.fullname}
                activeList={this.state.lists[this.state.activeListIndex]}
            ></CreateToDoListPanel>
        </Wrapper>
    );
  }
}

export default App;
