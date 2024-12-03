import { Linking, Platform } from 'react-native';
import { Touchable, TouchableTextDelete } from '../../screens/SignIn/styles';

const DeleteAccount = () => {
  const excluirConta = () => {
    const url = 'http://137.184.117.63/account/delete'; 
    Linking.openURL(url)
      .catch((err) => console.error('Erro ao abrir o link: ', err));
  };

  if (Platform.OS === 'android') {
    return null; // Retorna null para esconder o componente no iOS
  } else {
    return (
      <Touchable onPress={excluirConta}>
        <TouchableTextDelete>EXCLUIR MINHA CONTA</TouchableTextDelete>
      </Touchable>
    );
  }
};

export default DeleteAccount;