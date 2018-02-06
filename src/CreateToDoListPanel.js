import React, {Component} from 'react';
import styled from 'styled-components';
import {H2, H3} from './Layout';
import {ColorBox} from './ToDoListsPanel'


const Wrapper = styled.div`
    padding: 2em;
    padding-left: 5em;
    width: 350px;
    position: relative;
`
const Avatar = styled.img`
  border-radius: 0px 0px 1em 0px;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: auto;
`

const Input = styled.input`
  border: none;
  color: ${props => props.theme.mainGray};
  font-size: ${props => props.theme.h1FontSize};
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  
  &::placeholder {
    color: ${props => props.theme.mainGray};
  }
`

const ActiveListWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5em;
    > h2 {
      margin-left: 0.5em;
      color: ${props => props.theme.mainGray}
    }
`

class CreateToDoListPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoInput: '',
        }
    }

    onChange(event) {
        const newInput = event.target.value;
        this.setState({
            todoInput: newInput,
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.createNewToDo(this.state.todoInput);
        this.setState({
            todoInput: '',
        })

    }

    render() {
        return (
            <Wrapper>
                <Avatar src="avatar.jpg"></Avatar>
                <H3>{this.props.fullname}</H3>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <Input
                        placeholder="What do you want to do ?"
                        value={this.state.todoInput}
                        onChange={(event) => this.onChange(event)}
                    />
                </form>
                <ActiveListWrapper>
                    <ColorBox color={this.props.activeList.color}></ColorBox>
                    <H2>{this.props.activeList.name}</H2>
                </ActiveListWrapper>
            </Wrapper>
        );
    }
}

export default CreateToDoListPanel;
