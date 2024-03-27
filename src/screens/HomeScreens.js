import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Colors } from '../theme';

const Home = ({ theme }) => {
  const navigation = useNavigation();
  const [themeValue, setThemeValue] = useState('light');
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    setThemeValue(theme); 
    setBannerUrl(getBannerUrl(theme));
  }, [theme]);

  const handleShowOpciones = () => {
    navigation.navigate("Opciones");
  };

  const getBannerUrl = (theme) => {
    // Definir las URLs de las imágenes para los diferentes temas
    const bannerUrls = {
      light: 'https://i.postimg.cc/9F5CR7tr/1.png',
      dark: 'https://i.postimg.cc/sXKc7Sb7/2.png', // Cambiar por la URL de la imagen para el tema oscuro
    };
    return bannerUrls[theme];
  };

  const styles = styling(themeValue);

  return (
    <View style={[styles.container, { backgroundColor: Colors[themeValue]?.themeColor }]}>
      <Text style={[styles.title, { color: Colors[themeValue]?.white }]}>
        {'QUIZIZZ DE PREGUNTAS'}
      </Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: bannerUrl,
          }}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={handleShowOpciones} style={styles.button}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 60,
    },
    banner: {
      height: 350,
      width: 350,
    },
    bannerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    button: {
      width: '80%',
      backgroundColor: Colors[theme]?.sky,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 25,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors[theme]?.commonWhite,
    },
});

export default Home;
