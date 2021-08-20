

const Slider = (props) => {
	let eventDispatched = false;

	var pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

	const panResponder = useState(
		PanResponder.create({
			onStartShouldSetPanResponder: () => {
				console.log("start")
				eventDispatched = false;
				return true;
			},
			onMoveShouldSetPanResponder: () => true,
			onPanResponderTerminationRequest: (evt, gestureState) =>
				true,
			onPanResponderGrant: () => {
				// console.log('Granted')
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value,
				});
				pan.x.setValue(0);
				pan.y.setValue(0);
			},
			onPanResponderMove: (_, gesture) => {
				// console.log('Moving')
				if (gesture.dx > 120) {
					props.onSlideRight(props.item)
					pan.x.setValue(0);
					return;
				}
				if (gesture.dx < -120) {
					props.onSlideLeft(props.item)
					pan.x.setValue(0);
					return;
				}
				// console.log({ ...pan.x }, { ...gesture });
				pan.x.setValue(gesture.dx);
			},
			onPanResponderEnd: (evt, gesture) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
				eventDispatched = false;
				console.log('Touch with gesture value', gesture.dx);
				pan.flattenOffset();
				Animated.timing(pan, {
					duration: 1000,
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
				}).start();
			},
			onPanResponderTerminate: (evt, gesture) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
				eventDispatched = false;
				console.log('TERMINATING with gesture value', gesture.dx);
				pan.flattenOffset();
				Animated.timing(pan, {
					duration: 1000,
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
				}).start();
			},
		}),
	)[0];

	return (
		<>
			<View style={{ flex: 1, width: Dimensions.get('screen').width, backgroundColor: 'red', flexDirection: 'row', height: 60 }}>
				<View style={{ flex: 1, width: Dimensions.get('screen').width, backgroundColor: 'orange', justifyContent: 'center', zIndex: 1 }} >
					<Text style={{ alignSelf: 'flex-start', fontSize: 10, fontFamily: mobTheme.FontFamily.MuliBoldItalic, marginHorizontal: 10 }}>News</Text>
				</View>
				<View style={{ flex: 1, width: Dimensions.get('screen').width, backgroundColor: mobTheme.Colors.lightBlue, justifyContent: 'center', zIndex: 1 }} >
					<Text style={{ alignSelf: 'flex-end', fontSize: 10, fontFamily: mobTheme.FontFamily.MuliBoldItalic, marginHorizontal: 10 }}>Data Integration</Text>
				</View>

				<Animated.View
					style={{
						flex: 1,
						zIndex: 2, position: 'absolute',
						transform: [{ translateX: pan.x }, { translateY: pan.y }]
					}}>
					<View style={{
						width: Dimensions.get('screen').width,
					}} {...panResponder.panHandlers} >{props.rows}</View>
				</Animated.View>
			</View>
		</>
	);
};


