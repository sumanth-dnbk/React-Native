import React, {useState} from 'react';
import {Text, View, Animated, PanResponder} from 'react-native';

const Slider = (props) => {
  let sliderWidth = props.sliderWidth || 300;
  let sliderHeight = props.sliderHeight || 70;
  let rollerDi = props.rollerDiameter || props.sliderHeight || 60;
  let sliderColor = props.sliderColor || colors.frostGlass;
  let afterSlideColor =
    props.afterSlideColor || props.sliderColor || 'red';
  let eventDispatched = false,
    initX = rollerDi,
    initY = 0.5,
    confirmText = props.confirmText || 'EMERGENCY SOS',
    borderSace=15;

  var pan = useState(new Animated.ValueXY({x: initX, y: initY}))[0];

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        eventDispatched = false;
        return true;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.x.setValue(0);
        pan.y.setValue(0);
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          return;
        }

        if (gesture.dx > sliderWidth - rollerDi - borderSace) {
          console.log('entered with gesture value', gesture.dx);
          if (!eventDispatched && props.onSlideComplete) {
            eventDispatched = true;
            props.onSlideComplete()
            
          }
          return;
        }

        console.log({...pan.x}, gesture.dx / sliderWidth);
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dx / sliderWidth);
      },
      onPanResponderRelease: (_, gesture) => {
        console.log('ending with gesture value', gesture.dx);
        pan.flattenOffset();
        Animated.timing(pan, {
          duration: 1000,
          toValue: {x: initX, y: initY},
          useNativeDriver: false,
        }).start();
      },
    }),
  )[0];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: sliderColor,
        flex: 1,
        width: sliderWidth,
        maxHeight: sliderHeight,
        borderRadius: sliderHeight,
      }}>
      <Text
        adjustsFontSizeToFit={true}
        allowFontScaling={true}
        numberOfLines={1}
        style={{
          position: 'absolute',
          paddingHorizontal: 10,
          marginLeft: sliderWidth / 4,
        }}>
        {confirmText}
      </Text>
      <Animated.View
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          backgroundColor: afterSlideColor,
          opacity: pan.y,
          height: rollerDi,
          width: pan.x,
          borderRadius: sliderHeight / 2,
          marginRight:borderSace/2
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            height: rollerDi,
            width: rollerDi,
            borderRadius: rollerDi / 2,
          }}
          {...panResponder.panHandlers}>
          <View
            style={{
              backgroundColor: '#c0c0c0',
              height: rollerDi / 2,
              width: rollerDi / 2,
              borderRadius: rollerDi / 4,
            }}>
              <Text style={{fontWeight:'bold', fontSize:14}}>
                SOS
              </Text>
            </View>
        </View>
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
