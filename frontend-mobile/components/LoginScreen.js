import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button,Text, View, StyleSheet, Animated } from 'react-native';

const Stack = createStackNavigator();

export default class LoginScreen extends Component {

    componentWillMount() {
	this.animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
	Animated.loop(
	    Animated.timing(this.animatedValue, {
		toValue: 200,
		duration: 1500
	    })
	).start();
    }

    render() {
	const interpolateColor = this.animatedValue.interpolate({
	    inputRange: [0, 100, 200],
	    outputRange: ["white", "#23275f", "white"]
	})
	const animatedStyle = {
	    backgroundColor: interpolateColor
	}
	return (
	    <Animated.View style={[styles.view, animatedStyle]}>
	    <View style={styles.buttonView}>
	    <Button
	    title="Login"
	    style={styles.button}
	    onPress={() => this.props.navigation.navigate('Tabs')}
	    />
	    </View>
	    </Animated.View>
	)
    }
}

const styles = StyleSheet.create({
    view: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center"
    },
    buttonView: {
	backgroundColor: "white",
	borderRadius: 100,
	borderWidth: 3,
	borderColor: "black"
    },
    button: {
	padding: 100
    }
})
