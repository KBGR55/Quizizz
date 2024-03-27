import AsyncStorage from '@react-native-async-storage/async-storage';

export const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
  } catch (error) {
    console.error("Error al obtener el valor del almacenamiento:", error);
    return null;
  }
};

export const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error al guardar el valor en el almacenamiento:", error);
  }
};