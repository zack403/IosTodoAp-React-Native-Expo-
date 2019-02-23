import * as React from 'react';
import { Text, View, StyleSheet, AppRegistry, TextInput,  Button, Platform, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
// import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      text : '',
      todo: [],
      error: ''
    }
  }

  addTodo = () => {
    const todos  = [...this.state.todo];
    if(this.state.text === '') return this.setState({error: "This field is required"});
    const isTodoExist = todos.indexOf(this.state.text);
    if(isTodoExist !== -1) return this.setState({error : "This todo already exist"});
    todos.push(this.state.text);
    this.setState({todo : todos, text: ''});
    
  }

  deleteTodo = (item) => {
    const todo = [...this.state.todo];
    const todoToBeDeleted = todo.indexOf(item);
    todo.splice(todoToBeDeleted, 1);
    this.setState({todo});
    alert(`${item} todo deleted successfully`);
  }

  render() {

    return (
      <View style={styles.wholeStyle}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Todo ios App with Expo and React Native.
        </Text>
        {this.state.error !== 0 && <Text style={{color: 'red'}} >{this.state.error}</Text>}
        <TextInput style={{height: 40, borderColor:'white', borderWidth: 1}} value={this.state.text}       placeholder="Enter Todos"  
        // onSubmitEditing={() => this.handleSubmitEditing(this.state.text)} 
        onChangeText ={text => this.setState({text : text, error : ''})} />        
        <Button
        onPress={this.addTodo}
        title="Add Todo"
        color='white'
        /> 
        {this.state.todo.map(item => 
        // <>
        <Text style={styles.todo} onPress={() => this.deleteTodo(item)} key={item}>{item}</Text> 
        // <Button style={{backgroundColor: 'red'}} title="x" onPress={() => this.deleteTodo(item)}/> 
        // </>
        )}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wholeStyle: {
  backgroundColor: '#0288D1',
  flex : 1
  },
  container: {
    marginTop : Platform.OS === "android" ? 10 : 30,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    marginTop : 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  todo: {
    color: 'white',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent("IosTodoApp", App);