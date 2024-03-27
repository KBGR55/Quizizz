import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Pressable, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../theme';

const QuizScreen = ({ route, theme }) => {
  const { questions } = route.params;
  const data = questions;
  const totalQuestions = data.length;
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [counter, setCounter] = useState(60);
  const [showResults, setShowResults] = useState(false);
  let interval = null;
  const progressPercentage = Math.floor((index / totalQuestions) * 100);
  const navigation = useNavigation();
  const [themeValue, setThemeValue] = useState('light');

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      const currentQuestion = data[index];
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
    setThemeValue(theme);
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(60);
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if ((index + 1 > data.length) || showResults) {
      clearTimeout(interval);
      setShowResults(true);
    }
  }, [index, showResults]);

  useEffect(() => {
    if (!interval) {
      setCounter(60);
    }
  }, [index]);

  useEffect(() => {
    if (showResults) {
      navigation.navigate("Opciones");
      showAnswersAlert();
    }
  }, [showResults]);

  const currentQuestion = data[index];

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const showAnswersAlert = () => {
    let correctAnswers = [];
    let incorrectAnswers = [];

    answers.forEach((item, index) => {
      if (item.answer) {
        correctAnswers.push(index + 1);
      } else {
        incorrectAnswers.push(index + 1);
      }
    });

    Alert.alert(
      "Respuestas",
      `Respuestas correctas: ${correctAnswers.join(", ")}\nRespuestas incorrectas: ${incorrectAnswers.join(", ")}`,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  const styles = styling(themeValue);
  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
      <View style={[styles.containerDos]}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Tiempo restante:</Text>
        <Pressable
          style={{ padding: 10, backgroundColor: '#535C91', borderRadius: 20 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {counter}
          </Text>
        </Pressable>
      </View>
      <View style={[styles.containerDos]}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Progreso:</Text>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          ({index}/{totalQuestions}) Preguntas constestadas
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.23)",
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 10,
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 20,
          marginLeft: 10,
        }}>
        <Text
          style={{
            backgroundColor: '#59CE8F',
            borderRadius: 12,
            position: 'absolute',
            left: 0,
            height: 10,
            right: 0,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 30,
          padding: 10,
          borderRadius: 6,
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme === 'dark' ? 'white' : 'black' }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion?.options.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                selectedAnswerIndex === null &&
                setSelectedAnswerIndex(index)
              }
              style={[styles.questionContainer, selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex ? {backgroundColor: '#59CE8F'} : selectedAnswerIndex != null && selectedAnswerIndex === index
                  ? {backgroundColor: '#FF204E',}:{}]}>
              {selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex ? (
                <AntDesign
                  style={[styles.questionItem]}
                  name="check"
                  size={20}
                  color="white"
                />
              ) : selectedAnswerIndex != null &&
                selectedAnswerIndex === index ? (
                <AntDesign
                  style={[styles.questionItem]}
                  name="closecircle"
                  size={20}
                  color="white"
                />
              ) : (
                <Text
                  style={[styles.questionItem,{color: theme === 'dark' ? 'white' : 'black'}]}>
                  {item.options}
                </Text>
              )}

              <Text style={{ marginLeft: 10, color: theme === 'dark' ? 'white' : 'black' }}>{item.answer}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={
          answerStatus === null
            ? null
            : {
              marginTop: 45,
              padding: 10,
              borderRadius: 7,
              height: 120,

            }
        }>
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : { fontSize: 17, textAlign: 'center', fontWeight: 'bold', color: theme === 'dark' ? 'white' : 'black' }
            }>
            {!!answerStatus ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}
          </Text>
        )}
        {index + 1 >= questions.length ? (
          <Pressable onPress={handleFinishQuiz} style={[styles.button]}>
            <Text style={[styles.buttonText]}>TERMINAR</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable onPress={() => setIndex(index + 1)} style={[styles.button]}>
            <Text style={[styles.buttonText]}>SIGUIENTE</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerDos: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      marginVertical: 10,
      borderRadius: 20,
      borderColor: theme === 'dark' ? 'white' : 'black'
    },
    questionItem: {
      textAlign: 'center',
      borderWidth: 0.5,
      width: 40,
      height: 40,
      borderRadius: 20,
      padding: 10,
      borderColor: theme === 'dark' ? 'white' : 'black'
    },
    button: {
      backgroundColor: '#59CE8F',
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      borderRadius: 6,
    },
    buttonText: {
      color: 'white',
    },
  });

export default QuizScreen;