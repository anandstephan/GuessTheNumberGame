import React,{useState,useRef, useEffect} from 'react'
import { Button, StyleSheet,View,Text, Alert } from 'react-native'
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min,max,exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude)
    }else{
        return rndNum;
    }
}


const GameScreen = props =>{
    const [currentGuess, setCurrentGuess] = useState((generateRandomBetween(1,99,props.userChoice)))
    const [numofRounds, setNumofRounds] = useState(0)

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice,onGameOver} = props

    useEffect(()=>{
        if(currentGuess == props.userChoice){
            props.onGameOver(numofRounds)
        }
    },[userChoice,currentGuess,onGameOver])

    const nextGameHandler = direction =>{

        if((direction === 'lower' && currentGuess<props.userChoice) || (direction === 'greater' && currentGuess>props.userChoice)){
            Alert.alert("Don\'t lie", 'You know that is wrong...',[{text:'Sorry !',style:'cancel'}])
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess(nextNumber);
        setNumofRounds(prev => prev + 1)
    }


    return (
        <View style={styles.screen}> 
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button title="LOWER" onPress={()=>nextGameHandler('lower')}/>
                <Button title="GREATER" onPress={()=>nextGameHandler('greater')}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
})

export default GameScreen