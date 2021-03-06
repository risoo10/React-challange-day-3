import React, {Component} from 'react';
import styled from 'styled-components';
import {H2, H3} from './Layout';
import Icon from 'react-icons-kit';
import {checkmark}  from 'react-icons-kit/icomoon/checkmark';
import {checkboxUnchecked}  from 'react-icons-kit/icomoon/checkboxUnchecked';
import {bin}  from 'react-icons-kit/icomoon/bin';
import fire from './fire';


const ListsWrapper = styled.div`
    position: relative;
    padding: 2em;
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
  box-shadow: ${props => props.active ? props.theme.shadowActive : props.theme.shadow};
  padding: 1em;
  min-width: 140px;
  height: 100px;
  margin-right: 1em;
  box-sizing: border-box;    
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(0, ${props => props.active ? '-0.3em' : '0'});
  
  > h2 {
    font-weight: ${props => props.active ? '700' : '400'};
  }
  
  &:hover{
    box-shadow: ${props => props.theme.shadowActive};
  }
`

export const ColorBox = styled.div`
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

    handleClick(listIndex){
        this.props.onChangeActiveList(listIndex);
    }

    render() {
        return (
            <ListsWrapper>
                <List>
                    {this.props.lists.map((list, listIndex) =>
                        <a onClick={() => this.handleClick(listIndex)}>
                            <ListItem active={this.props.activeListIndex === listIndex && true}>
                                <ColorBoxWrapper><ColorBox color={list.color}></ColorBox></ColorBoxWrapper>
                                <H2>{list.name}</H2>
                                <H3>{list.tasks ? list.tasks.length : '0'} tasks</H3>
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
`

const ToDoItem = styled.div`
    padding: 1em 0px;
    padding-left: 2em;
    display: flex;
    align-items: center;
    border-bottom: ${props => props.theme.baseBorder};
    
    > h2 {
      text-decoration: ${props => props.done ? 'line-through' : 'none'};
      color: ${props => props.done ? props.theme.mainGray : props.theme.mainBlack};
      width: 85%;
    }
`

const IconStyled = styled(Icon)`
    margin-right: 1em;
    color: ${props => {
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
    }}
`

const TrashIcon = styled(Icon)`
  color: ${props => props.theme.mainGray};
  
  &:hover{
   color: ${props => props.theme.mainBlack};
  }
`

class ToDoItems extends Component{

    toggleItemState(item){
        // Toggle state change
        const listKey = this.props.list.key;
        const taskRef = fire.database().ref().child('lists').child(listKey).child('tasks').child(item.key);
        taskRef.update({done: !item.done});
    }

    deleteToDoItem(item){
        // Delete item
        const listKey = this.props.list.key;
        const taskRef = fire.database().ref().child('lists').child(listKey).child('tasks').child(item.key);
        taskRef.remove();
    }

    render() {
        const list = this.props.list;
        return (
            <ToDoItemsWrapper>
                {list.tasks.map(
                    (item) => <ToDoItem done={item.done}>
                        <a onClick={() => this.toggleItemState(item)}>
                            <IconStyled
                                color={list.color}
                                size={16}
                                icon={item.done ? checkmark : checkboxUnchecked}
                            ></IconStyled></a>
                        <H2> {item.text}</H2>

                        <TrashIcon
                            onClick={() => this.deleteToDoItem(item)}
                            icon={bin} size={16}
                        ></TrashIcon>
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

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: ${props => props.theme.mainGray}; 
  font-size: ${props => props.theme.h3FontSize};   
`

class ToDoListsPanel extends Component {
    render() {
        const activeListIndex = this.props.activeListIndex
        return (
            <Wrapper>
                <ListsPanel lists={this.props.toDos}
                            onChangeActiveList={
                                (listIndex) => this.props.changeActiveListIndex(listIndex)
                            }
                            activeListIndex={activeListIndex}
                ></ListsPanel>
                {this.props.toDos[activeListIndex] ?
                <div>
                    <ToDoItems
                        list={this.props.toDos[activeListIndex]}
                    ></ToDoItems>
                </div>
                :
                <LoadingWrapper>
                    Loading ...
                </LoadingWrapper>}
            </Wrapper>
        );
    }
}

export default ToDoListsPanel;
