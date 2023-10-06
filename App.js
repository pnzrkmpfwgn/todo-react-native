import { useState } from 'react';
import { Button,TouchableWithoutFeedback,Keyboard, FlatList, ScrollView, StyleSheet, Text, Alert ,TextInput, TouchableOpacity, View } from 'react-native';
import Header from './components/header';
import ToDoItem from './components/todoItem';
import AddToDo from './components/addToDo';


export default function App() {
  const [todos,setTodos] = useState([
    {text:'Buy Coffee',key:'1'},
    {text:'Create an App',key:'2'},
    {text:'Play on the Switch',key:'3'},
  ]);

  const pressHandler = (key) => {
      setTodos((prev)=>{
        return prev.filter(todo => todo.key !== key);
      })
  }

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodos((prev) => {
        return[
          {text:text, key:Math.random().toString()},
          ...prev
        ]
      })
    }else{
      Alert.alert('OOPS!','Todos must be over 3 characters long.',[
        {text:'Understood!',onPress:() => console.log('alert closed')}
      ])
    }
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log("Dissmissed keyboard");
    }}>
      <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddToDo submitHandler={submitHandler} />
        <View style={styles.list} >
          <FlatList
            data={todos}     
            renderItem={({item})=>(
              <ToDoItem item={item} pressHandler={pressHandler} >{item.text}</ToDoItem>
            )}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    flex:1,
    padding:40,
  },  
  list:{
    flex:1,
    marginTop:20,
  }
});
