import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { Alert, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

import colors from '../../assets/colors';
import { useAuth } from '../../store/auth';

import { Container, Header, Location, Title } from './styles';
import { sendMessageOnWhatsApp } from '../../utils/openwpp';

const Drawer: React.FC<DrawerContentComponentProps> = ({ ...props }) => {
  const { logout, setLocation, location, auth } = useAuth();

  const handlePressLogout = useCallback(() => {
    Alert.alert(
      'Sair',
      'Tem certeza de que deseja sair da sua conta?',
      [{ text: 'Sim', onPress: logout }, { text: 'Não' }],
      { cancelable: true },
    );
  }, [logout]);

  const getLocation = useCallback(() => {
    if (!location) return '';

    if (location.state && !location.city) return `${location.state.uf}`;

    return `${location.city?.nome}, ${location.state?.uf}`;
  }, [location]);


  const openWhatsapp = () => {
    sendMessageOnWhatsApp('5521996850678', 'Olá tudo bem, venho através do aplicativo CSF.');
  };

  const handlePressHeader = useCallback(() => {
    if (auth) props.navigation.navigate('Profile');
    else props.navigation.navigate('SignIn');
  }, [auth, props.navigation]);

  return (
    <Container>
      <Header onPress={handlePressHeader}>
        {auth ? (
          <Title>{auth?.user.name}</Title>
        ) : (
          <Title>Entrar / Criar conta</Title>
        )}
        {location && <Location>{getLocation()}</Location>}
      </Header>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          {...props}
          style={[drawerItemStyle]}
          labelStyle={[drawerLabelStyle]}
          activeTintColor={colors.in_primary}
          inactiveTintColor={colors.primary}
          activeBackgroundColor={colors.primary}
          inactiveBackgroundColor={colors.in_primary}
          label="Mudar localização"
          onPress={() => setLocation(null)}
        />
        <DrawerItem
          {...props}
          style={[drawerItemStyle]}
          labelStyle={[drawerLabelStyle]}
          activeTintColor={colors.in_primary}
          inactiveTintColor={colors.primary}
          activeBackgroundColor={colors.primary}
          inactiveBackgroundColor={colors.in_primary}
          label="Whatsapp CSF"
          onPress={openWhatsapp}
        />
      </View>
      {auth?.user && (
        <DrawerItem
          {...props}
          label="Sair"
          onPress={handlePressLogout}
          style={[drawerItemStyle]}
          labelStyle={[drawerLabelStyle]}
          activeTintColor={colors.in_primary}
          inactiveTintColor={colors.primary}
          activeBackgroundColor={colors.primary}
          inactiveBackgroundColor={colors.in_primary}
        />
      )}
    </Container>
  );
};

const drawerContentContainerStyle: StyleProp<ViewStyle> = {
  paddingHorizontal: 0,
  marginHorizontal: 0,
};

const drawerStyle: StyleProp<ViewStyle> = {
  padding: 0,
  paddingHorizontal: 0,
  marginHorizontal: 0,
};

const drawerItemStyle: StyleProp<ViewStyle> = {
  padding: 0,
  marginVertical: 0,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginHorizontal: 0,
  borderRadius: 0,
};

const drawerLabelStyle: StyleProp<TextStyle> = {
  paddingVertical: 8,
  fontSize: 16,
};

export const drawerContentOptions: DrawerNavigationOptions = {
  drawerContentContainerStyle,
  drawerStyle,
  drawerItemStyle,
  drawerLabelStyle,
  drawerActiveBackgroundColor: colors.primary,
  drawerActiveTintColor: colors.in_primary,
  drawerInactiveTintColor: colors.primary,
  drawerInactiveBackgroundColor: colors.background,
};

export default Drawer;
