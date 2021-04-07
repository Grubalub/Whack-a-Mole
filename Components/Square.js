import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { addScore } from '../redux'
import { connect } from  'react-redux'

const Square = (props) => {
    const [moleActive, setMoleActive] = useState(false)
    const [isGameover, setGameOver] = useState(false)

    const randomTime = Math.random() * 20000
    let timerId

    useEffect(() => {
        timerId = setInterval(() => {
            setMoleActive(true)
            setTimeout(() => {setMoleActive(false)},900)
        }, randomTime)
        setTimeout(endGame, 60 * 1000)
    }, [])

    function endGame() {
        clearInterval(timerId)
        setGameOver(true)
    }

    return (
        <TouchableOpacity onPress={moleActive? props.addScore : null}>
        <Image 
        source={moleActive? require('../assets/Untitled-2.png'): require('../assets/Untitled-1.png')}
        style={moleActive? styles.mole : styles.sqaure}>
        </Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
sqaure: {
    flex: 1.5,
    minWidth: 80,
    minHeight: 80,
    margin: 10,
   width: '100%'
},
mole : {
    flex: 1,
    minWidth: 80,
    minHeight: 80,
    margin: 10,
    width: '10%'
}
})

const mapStateToProps = state => {
    return {
        score: state.score
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScore: () => dispatch(addScore())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Square)