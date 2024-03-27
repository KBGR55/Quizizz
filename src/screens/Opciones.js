import React, { useState } from 'react'; // Importa useState
import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import questions1 from '../data/opcion1/questions';
import questions2 from '../data/opcion2/questions';
import questions3 from '../data/opcion3/questions';
import questions4 from '../data/opcion4/questions';
import { useNavigation } from "@react-navigation/native";


const SettingsScreens = ({ theme }) => {
  const navigation = useNavigation();

  const medicionDispositivos = [
    { nombre: 'Razonamiento Lógico', icon: 'book', questions: questions1 },
    { nombre: 'Razonamiento Numérico', icon: 'calculator', questions: questions2 },
    { nombre: 'Razonamiento Verbal', icon: 'comment', questions: questions3 },
    { nombre: 'Atención y Concentración', icon: 'star', questions: questions4 },
  ];

  const windowWidth = Dimensions.get('window').width;
  const [showPreguntas, setShowPreguntas] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(null);


  const handleIconPress = (questions) => {
    Alert.alert(`${questions.nombre}`);
    setCurrentQuestions(questions.questions);
    setShowPreguntas(true);
  };

  if (showPreguntas) {
    navigation.navigate("Preguntas", { questions: currentQuestions });
  }

  return (
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoDetails}>
          <Text style={styles.infoDetailsText}>MATERIAS DISPONIBLES</Text>
          <View style={styles.cardsContainer}>
            {medicionDispositivos.map((area, index) => (
              <View key={index} style={[styles.infoDetailsCard, index % 2 !== 0 && styles.infoDetailsCardRight]}>
                <FontAwesome name={area.icon} size={24} color="white" style={styles.iconTopLeft} />
                <Text style={styles.infoDetailsCardWeekDay}>{area.nombre}</Text>
                <MaterialIcons name="arrow-forward" size={24} color="white" style={styles.iconBottomRight} onPress={() => handleIconPress(area)} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  infoDetails: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  infoDetailsText: {
    color: "#FFF",
    marginTop: 35,
    fontSize: 22,
    fontWeight: "600",
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  infoDetailsCard: {
    width: '48%',
    height: 250,
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: 'relative',
  },
  infoDetailsCardRight: {
    marginLeft: 'auto',
  },
  infoDetailsCardWeekDay: {
    fontSize: 18,
    color: "#FFF",
    textAlign: 'center',
    fontWeight: "450",
    marginBottom: 8,
  },
  iconTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  iconBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default SettingsScreens;