import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { get, save } from './Storage';

const ThemeSwitch = ({ onValueChange }) => {
  const [themeValue, setThemeValue] = useState('light');

  const handleToggleColorScheme = () => {
    const newTheme = themeValue === 'dark' ? 'light' : 'dark';
    setThemeValue(newTheme);
    save('Theme', newTheme); 
    if (onValueChange) {
      onValueChange(newTheme);
    }
  };

  useEffect(() => {
    // Obtener el tema guardado en el almacenamiento si está disponible
    const getThemeFromStorage = async () => {
      const theme = await get('Theme');
      if (theme) {
        setThemeValue(theme);
      }
    };

    getThemeFromStorage();
  }, []);

  return (
    <TouchableOpacity onPress={handleToggleColorScheme} style={styles.switchContainer}>
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.23)' }]}>
        <FontAwesomeIcon icon={themeValue === 'dark' ? faMoon : faSun} size={21} color={themeValue === 'dark' ? '#fff' : '#FFD700'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 50, 
    padding: 10,
  },
});

export default ThemeSwitch;