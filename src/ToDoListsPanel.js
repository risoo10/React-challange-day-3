import React, {Component} from 'react';
import styled from 'styled-components';
import {H1, H2, H3} from './Layout';

const Avatar = styled.img`
  border-radius: 0px 0px 1em 0px;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: auto;
`

const ListsWrapper = styled.div`
    position: relative;
    padding: 2em;
    padding-left: 5em;
    padding-bottom: 0px;
    border-bottom: ${props => props.theme.baseBorder};
`

const List = styled.div`
    margin: 1em 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 1em;
    width: 100%;
`

const ListItem = styled.div`
  background-color: white;
  box-shadow: ${props => props.theme.shadow};
  padding: 1em;
  min-width: 140px;
  height: 100px;
  margin-right: 1em;
  box-sizing: border-box;    
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover{
    box-shadow: ${props => props.theme.shadowActive};
  }
`

const ColorBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${props => {
      const color = props.color;
      if(color === 'red'){
          return props.theme.redColor
      } else if(color === 'blue'){
          return props.theme.blueColor
      } else if(color === 'green'){
          return props.theme.greenColor
      } else if(color === 'violet'){
          return props.theme.violetColor
      }
  }};
  width: 10px;
  height: 10px;
  display: inline-block;   
`

const ColorBoxWrapper = styled.div`
  text-align: right;    
`

class ListsPanel extends Component{

    handleClick(list){
        this.props.onChangeActiveList(list);
    }

    render() {
        return (
            <ListsWrapper>
                <Avatar src="avatar.jpg"></Avatar>
                <H3>Lists</H3>
                <List>
                    {this.props.lists.map(list =>
                        <a onClick={() => this.handleClick(list)}>
                            <ListItem>
                                <ColorBoxWrapper><ColorBox color={list.color}></ColorBox></ColorBoxWrapper>
                                <H2>{list.name}</H2>
                                <H3>{list.tasks.length} tasks</H3>
                            </ListItem>
                        </a>
                    )}
                </List>
            </ListsWrapper>
        );
    }

}


const ToDoItemsWrapper = styled.div`
  padding:0px;
  overflow: auto;
  max-height: 395px;
  width: 100%;
`

const ToDoItem = styled.div`
    padding: 1em 0px;
    padding-left: 5em; 
    border-bottom: ${props => props.theme.baseBorder};
`

class ToDoItems extends Component{
    render() {
        return (
            <ToDoItemsWrapper>
                {this.props.toDoItems.map(
                    item => <ToDoItem>
                        <H2> - {item}</H2>
                    </ToDoItem>
                )}
            </ToDoItemsWrapper>
        );
    }

}

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  border-right: ${props => props.theme.baseBorder};
`

class ToDoListsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeList: props.toDos[0]
        }
    }

    changeActiveList(list){
        this.setState({
            activeList: list
        })
    }


    render() {
        return (
            <Wrapper>
                <ListsPanel lists={this.props.toDos} onChangeActiveList={
                    (list) => this.changeActiveList(list)
                }></ListsPanel>
                <ToDoItems toDoItems={this.state.activeList.tasks}></ToDoItems>
            </Wrapper>
        );
    }
}

export default ToDoListsPanel;
