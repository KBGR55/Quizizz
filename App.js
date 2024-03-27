import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/HomeScreens";
import OPCIONES from "./src/screens/Opciones";
import Preguntas from "./src/screens/Preguntas";
import { Colors } from './src/theme';
import { get } from './src/utiles/Storage';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ThemeSwitch from "./src/utiles/ThemeSwitch";

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(DefaultTheme); // Estado para almacenar el tema
  const [themeValue, setThemeValue] = useState('light');

  // Función para obtener el tema guardado en el almacenamiento
  const getThemeFromStorage = async () => {
    const savedTheme = await get('Theme');
    // Si hay un tema guardado, actualizar el estado con el tema correspondiente
    if (savedTheme && savedTheme.theme) {
      setTheme(savedTheme.theme === 'dark' ? DarkTheme : DefaultTheme);
    }
  };

  useEffect(() => {
    getThemeFromStorage(); // Llamar a la función al montar el componente
  }, []); // El segundo parámetro del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  const handleToggleColorScheme = (newTheme) => {
    setThemeValue(newTheme);
    setTheme(newTheme === 'dark' ? DarkTheme : DefaultTheme);
  };
  return (
    <NavigationContainer
      theme={theme}
      onStateChange={() => {
        getThemeFromStorage(); // Llamar a la función cada vez que cambie el estado de la navegación
      }}
    >
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.switchContainer}>
              <ThemeSwitch onValueChange={handleToggleColorScheme} />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors[theme.dark ? 'dark' : 'light'].sky, // Utilizar el color primario del tema
          },
          headerTintColor: Colors[theme.dark ? 'dark' : 'light'].commonWhite, // Utilizar el color de texto del tema
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Stack.Screen name="Inicio">
          {props => <Home {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Opciones">
          {props => <OPCIONES {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Preguntas">
          {props => <Preguntas {...props} theme={themeValue} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginRight: 10, // Espacio de margen a la derecha para separar el interruptor de tema de otros elementos
  },
});
