import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ou qualquer biblioteca de ícones que você estiver usando
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={35} color={colors.regular} />
    </TouchableOpacity>
  );
};

export default BackButton;
