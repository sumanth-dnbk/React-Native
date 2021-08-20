import React, {useState} from 'react';
import {Text, View, Animated, PanResponder} from 'react-native';

const Slider = (props) => {
  let sliderWidth = props.sliderWidth || 300;
  let sliderHeight = props.sliderHeight || 70;
  let rollerDi = props.rollerDiameter || props.sliderHeight || 60;
  let sliderColor = props.sliderColor || 'black';
  let eventDispatched = false,
    initX = sliderWidth,
    initY = 1,
    confirmText = props.children || (<Text style={{color:'red', fontSize:50}}>Slide to power off</Text>);

  var pan = useState(new Animated.ValueXY({x: initX, y: initY}))[0];

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        eventDispatched = false;
        return true;
      },
      onPanResponderGrant: () => {
        console.log('ON START', {...pan.x});
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.x.setValue(0);
        pan.y.setValue(0);
      },
      onPanResponderMove: (_, gesture) => {
        console.log('ON MOVE', {...pan.x}, {...gesture});
        if (gesture.dx < 0) {
          return;
        }
        if (-gesture.dx + pan.x._offset < rollerDi + 10) {
          if (!eventDispatched && props.onSlideComplete) {
            eventDispatched = true;
            props.onSlideComplete();
          }
          return;
        }
        pan.x.setValue(-gesture.dx);
        pan.y.setValue(-5 * (gesture.dx / sliderWidth));
      },
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        console.log('ON RELEASE', {...pan.x});
        Animated.timing(pan, {
          duration: 1000,
          toValue: {x: initX, y: initY},
          useNativeDriver: false,
        }).start();
      },
    }),
  )[0];

  return (
    <View style={{flexDirection: 'row-reverse',marginLeft:50}}>
      <Animated.View
        style={{
          flexDirection: 'row',
          backgroundColor: sliderColor,
          borderWidth: 1,
          width: pan.x,
          maxWidth: pan.x,
          height: sliderHeight + 2,
          borderRadius: rollerDi,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: rollerDi,
            width: rollerDi,
            borderRadius: rollerDi,
            marginLeft: 5,
          }}
          {...panResponder.panHandlers}>
          <Text style={{fontSize: 40}}>{'>'}</Text>
        </View>
        <Animated.Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            position:'absolute',
           paddingHorizontal: 10,
           marginLeft:sliderWidth/3,
            alignSelf: 'center',
            opacity: pan.y,
            fontSize:20
          }}>
          {confirmText}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

var colors = {
  outerOrange: '#FFB266',
  innerOrange: '#FFCC99',
  glassBlue: '#dcf0ef',
  frostGlass: '#a8ccd7',
  green: '#CCFFE5',
};

export default Slider;
