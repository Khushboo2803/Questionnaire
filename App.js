import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import React from 'react';
import Questions from './data'
import CountDown from 'react-native-countdown-component';
import { RadioButton } from 'react-native-paper';
import { Card} from 'react-native-elements';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export default class quiz extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value : [],
      checked : []
    }
  }

  testSubmission = (title= "Results") => {
    let responseArray =[];
    let score=0;
    Questions.map((question, index)=>{
      if(this.state.checked[question.qs_id]!=undefined)
      {
        if(this.state.checked[question.qs_id]==question.answer)
        {
          let str = "Question"+ (index+1) +" \t Answered ? Yes \t Option Selected : "+this.state.checked[question.qs_id]+". "+question.options[this.state.checked[question.qs_id]] + "\t Correct ? Yes";
          responseArray.push(str);
          score=score+1;
        }
        else{
          let str = "Question"+ (index+1) + " \t Answered ? Yes \t Option Selected : "+this.state.checked[question.qs_id]+". "+question.options[this.state.checked[question.qs_id]] + "\t Correct ? No";
          responseArray.push(str);
        }
      }
      else{
        let str = "Question"+ (index+1) + " \t Answered ? No";
        responseArray.push(str);
      }
    })
    responseArray.map((response)=>{
      console.log(response);
    })
    console.log("Score is ", score, " out of", Questions.length);
    Alert.alert(title, "Your score is "+score+" out of "+Questions.length,
    [
      {
        text : "ok",
        onPress : ()=>BackHandler.exitApp()
      }
    ]);
  }

  render(){
    console.log(this.state.checked, "is ");
    return(
      <View>
        <View style={styles.timer}>
          <CountDown
            until={300}
            //duration of countdown in seconds
            timetoShow={('M', 'S')}
            //formate to show
            onFinish={() => this.testSubmission("Time Up !")}
            //on Finish call
            onPress={() => alert('Complete your test in a given time. All the Best.')}
            //on Press call
            size={20}
          />
        </View>
        <View style={styles.questions}>
          <ScrollView style={{marginBottom :200}}>
              {
                Questions.map((ques, index)=>{
                  return(
                    <Card key={ques.qs_id}
                    containerStyle={
                      {
                        borderRadius: 9,
                        borderColor: 'grey',
                        marginBottom: '3%',
                        shadowOpacity : 6,
                      }
                    }
                   >
                      <View>
                        <Text style={styles.questions}>{'Ques '+ (ques.qs_id+1)  + '. ' + ques.qs}</Text>
                        <RadioButton.Group >
                          <View style={{flexDirection : 'row'}}>
                            <RadioButton
                               value="a"
                               status={ this.state.checked[ques.qs_id] == 'a' ? 'checked' : 'unchecked' }
                               onPress={() => {
                                 let arr =  this.state.checked;
                                 arr[ques.qs_id]="a"
                                 this.setState({checked : arr})
                               } }
                            />
                            <Text style={styles.options}>{ques.options.a}</Text>
                          </View>
                          <View style={{flexDirection : 'row'}}>
                            <RadioButton
                               value="b"
                               status={ this.state.checked[ques.qs_id] == 'b' ? 'checked' : 'unchecked' }
                               onPress={() => {
                                 let arr =  this.state.checked;
                                 arr[ques.qs_id]="b"
                                 this.setState({checked : arr})
                               } }
                            />
                            <Text style={styles.options}>{ques.options.b}</Text>
                          </View>
                          <View style={{flexDirection : 'row'}}>
                            <RadioButton
                              value="c"
                              status={ this.state.checked[ques.qs_id] == 'c' ? 'checked' : 'unchecked' }
                              onPress={() => {
                                let arr =  this.state.checked;
                                arr[ques.qs_id]="c"
                                this.setState({checked : arr})
                              } }
                            />
                            <Text style={styles.options}>{ques.options.c}</Text>
                          </View>

                          <View style={{flexDirection : 'row'}}>
                            <RadioButton
                              value="d"
                              status={ this.state.checked[ques.qs_id] == 'd' ? 'checked' : 'unchecked' }
                              onPress={() => {
                                let arr =  this.state.checked;
                                arr[ques.qs_id]="d"
                                this.setState({checked : arr})
                              } }
                            />
                            <Text style={styles.options}>{ques.options.d}</Text>
                          </View>
                        </RadioButton.Group>
                      </View>
                    </Card>
                  )
                })
              }
              <TouchableOpacity style={styles.submitButton} onPress={()=>{
                this.testSubmission();
              }}>
                <Text style={styles.submitText}>Submit Answers</Text>
              </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  timer : {
    marginTop : 10,
    marginLeft : 200
  },
  questions : {
    fontSize :16,
    fontWeight : 'bold',
    marginLeft :10,
    marginBottom :15
  },
  options : {
    alignContent : 'center',
    alignItems : 'center',
    alignSelf : 'center',
    fontSize : 15,
    fontWeight : 'bold',
    fontFamily : 'monospace'
  },
  submitButton : {
    width : Width * 0.45,
    height : Height * 0.05,
    backgroundColor : '#32cd32',
    alignContent : 'center',
    alignItems : 'center',
    alignSelf : 'center',
    borderRadius : 10,
    borderColor : 'black',
    borderWidth : 1,
    margin : 5
  },
  submitText : {
    fontSize : 20,
    fontWeight : 'bold',
    padding : 5
  }
})