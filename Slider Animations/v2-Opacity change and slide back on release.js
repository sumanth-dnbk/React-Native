import React, { useState } from 'react';
import { Text, View, Animated, Button, PanResponder, Dimensions } from 'react-native';

var toggle = 0;
var w = 100;

const App = () => {
  let sliderWidth = Dimensions.get('screen').width - 60
  let sliderHeight = 60;
  const rollerDi = 60;
  const margins = 30;
  let eventDispatched = false, initX = rollerDi, initY= 0.5, endingDx;

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

  const pan = useState(new Animated.ValueXY({ x: initX, y: initY }))[0];

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        eventDispatched = false;
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
        pan.x.setValue(0)
        pan.y.setValue(0)
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          return;
        }
        endingDx = gesture.dx;
        if (gesture.dx > (sliderWidth - margins - sliderHeight/2)) {
          console.log("entered with gesture value", gesture.dx);
          if (!eventDispatched) {
            eventDispatched = true;
            alert('acting confirmed')
          }
          return;
        }

        console.log({ ...pan.x },gesture.dx/sliderWidth)
        pan.x.setValue(gesture.dx)
        pan.y.setValue(gesture.dx/sliderWidth)
      },
      onPanResponderRelease: (_,gesture) => {
        console.log("ending with gesture value", gesture.dx);
        pan.flattenOffset();
        // pan.x.setValue(sliderWidth - margins - sliderHeight / 2 -5)
        //  pan.x.setValue(gesture.dx)
        // pan.setOffset({
        //   x: 0,
        //   y: 0
        // });
        Animated.timing(pan,{
          duration:1000,
          toValue: {x: initX, y:initY},
          useNativeDriver:false
        }).start()
      }
    })
  )[0];
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  return (
    <View style={{ flex: 1, flexDirection: 'row',  justifyContent: 'space-between', alignContent: 'space-between' , backgroundColor:'#ffffff'}}>
      <View style={{ flexDirection: 'row',marginTop: 300,alignItems:'center', backgroundColor: colors.frostGlass, width: sliderWidth, maxHeight: sliderHeight, flex: 1, marginHorizontal: margins, borderRadius: sliderHeight,}}>
        <Text adjustsFontSizeToFit={true} allowFontScaling={true} numberOfLines={1} style={{ marginLeft: 100, position: 'absolute', alignSelf: 'center', width: sliderWidth, paddingHorizontal: 10 }}>SLIDE TO CONFIRM</Text>
        <Animated.View style={[{ flexDirection: 'row-reverse' }, {alignItems:'center', height: sliderHeight, width: pan.x, borderRadius: sliderHeight / 2, backgroundColor: colors.glassBlue,opacity:pan.y, paddingRight:30 }]}  >
          <View style={{ height: rollerDi, width: rollerDi, borderRadius: rollerDi / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} {...panResponder.panHandlers}>
            <View style={{ height: rollerDi / 2, width: rollerDi / 2, borderRadius: rollerDi / 4, backgroundColor: '#c0c0c0' }}>

            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};


let colors ={
  outerOrange: '#FFB266',
  innerOrange: '#FFCC99',
  glassBlue: '#dcf0ef',
  frostGlass:'#a8ccd7',
  green: '#CCFFE5',

}

export default App;
