import React, { useState } from 'react';
import AppContainer from './src/navigator/app-navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Animated, Button, PanResponder, Dimensions } from 'react-native';
import { log } from './src/logger/log';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';

global.log = log;
var toggle = 0;
var w = 30;
const App = () => {
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]
  function moveBall(PressEvent) {
    toggle += 1;
    console.log(value)
    Animated.timing(value, {
      toValue: toggle % 2 == 0 ? { x: 300, y: 300 } : { x: 0, y: 0 },
      duration: 1000,
      useNativeDriver: true
    }).start()
  }
  const sliderWidth = Dimensions.get('screen').width-60
  const pan = useState(new Animated.ValueXY({x:sliderWidth, y:50}))[0];

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log("Ente#a8ccd7 on touch should set responder");
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        console.log("Ente#a8ccd7 on move should set responder");
        return true;
      },
      onPanResponderGrant: () => {
        console.log("PAN RESPONDER GRANT")
        w = pan.x;
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (_, gesture) => {
        if(gesture.dx<0 || gesture.dx>325)
        {
          return;
        }
        console.log({ ...pan.x })
        pan.x.setValue(-gesture.dx)
        pan.y.setValue(gesture.dy)
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        pan.x.setValue(sliderWidth)
      }
    })
  )[0];
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor:'white' }}>
      <View style={{  flex: 1, maxHeight: 30, flexDirection: 'row' , justifyContent:'space-between', alignContent:'space-between'}}>
        
        <View style={{flexDirection:'row-reverse', backgroundColor:'green',width:sliderWidth,height:30, flex:1, marginLeft:30,marginRight:30, borderRadius:50/2}}>
          <Text adjustsFontSizeToFit={true} allowFontScaling={true} numberOfLines={1} style={{position:'absolute', alignSelf:'center',width:sliderWidth, paddingHorizontal:10}}>Order being sent to the stock exchange servers.</Text>
        <Animated.View style={[{  alignSelf: 'flex-end' }, {  height: 30,width:pan.x, borderRadius: 50 / 2, backgroundColor: '#a8ccd7' }]} {...panResponder.panHandlers} >
        <View style={{height:30, width:30,  borderRadius:15, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
        <View style={{height:30/2, width:30/2,  borderRadius:15/2, backgroundColor:'#a8ccd7'}}>

        </View>
        </View>
        </Animated.View>
        {/* <Text  numberOfLines={1} style={{position:'absolute',width:sliderWidth, paddingHorizontal:10}}>Order being sent to the stock exchange servers.</Text> */}
        </View>
        {/* <Button title="Press this" onPress={(ev)=>{console.log(ev); moveBall()}}/> */}
      </View>
    </View>
  );
};

export default App;
