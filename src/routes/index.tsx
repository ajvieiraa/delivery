import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CustomDrawer, { drawerContentOptions } from '../components/Drawer';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Categories from '../screens/Categories';
import colors from '../assets/colors';
import Products from '../screens/Products';
import Cart from '../screens/Cart';
import Payment from '../screens/Payment';
import Suppliers from '../screens/Suppliers';
import MyOrders from '../screens/MyOrders';
import MySales from '../screens/MySales';
import Profile from '../screens/Profile';

import { useAuth } from '../store/auth';
import Supplier from '../screens/Supplier';

import rem from '../utils/rem';

import HeaderLeftButton from '../components/HeaderLeftButton';
import LocationSelect from '../components/LocationSelect';
import ForgotPassword from '../screens/ForgotPassword';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import Storage from '../services/storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AnonymousRoutes: React.FC = () => {
  const { auth, logout } = useAuth();

  useEffect(() => {
    if (auth && !auth.user) logout();
  }, [auth, logout]);

  return (
    <Stack.Navigator
      initialRouteName={auth ? 'AuthRoutes' : 'AuthRoutes'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Nunito_700Bold',
          color: colors.regular,
        },
        headerStyle: { elevation: 1 },
      }}
    >
      {auth === undefined && (
        <Stack.Screen name="Loading" options={{ headerShown: false }}>
          {() => (
            <>
              <LoadingSpinner />
              <StatusBar
                style="dark"
                translucent={false}
                backgroundColor="#FFFFFF"
              />
            </>
          )}
        </Stack.Screen>
      )}

      {auth === null && (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: '', headerLeft: () => <BackButton /> }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Cadastrar-se',
              headerTitle: 'Cadastre-se',
              headerLeft: () => <BackButton />
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: 'Esqueci minha senha',
              headerTitle: '',
              headerLeft: () => <BackButton />
            }}
          />
        </>
      )}

      <Stack.Screen
        name="AuthRoutes"
        component={AuthRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
          title: 'Voltar',
        }}
      />

      {auth && (
        <>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              title: 'Meu perfil',
              headerTitle: 'Meu perfil',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export const OrderStack: React.FC = () => {
  const { dispatch } = useNavigation();
  const { location, loading } = useAuth();

  const handlePress = useCallback(() => {
    dispatch(DrawerActions.toggleDrawer());
  }, [dispatch]);

  if (loading && Platform.OS === 'ios') {
    return null // Coloque seu componente de loading aqui
  } 
  
  if (loading && Platform.OS === 'android') {
    return <LoadingSpinner />;
  }

  return (
      <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={{
          headerStyle: { elevation: 1, height: rem(7) },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            color: colors.regular,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerTitle: 'Categorias',
            headerShown: true,
            title: 'Categorias',
            headerLeft: (props) => (
              <HeaderLeftButton {...props} onPress={handlePress} />
            ),
          }}
        />
        <Stack.Screen
          name="Suppliers"
          component={Suppliers}
          options={{
            headerTitle: 'Unidades',
            headerShown: true,
            title: 'Unidades',
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Supplier"
          component={Supplier}
          options={{
            headerTitle: '',
            headerShown: true,
            title: 'Unidade',
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerTitle: 'Produtos',
            headerShown: true,
            title: 'Produtos',
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="SupplierProducts"
          component={Products}
          options={{
            headerTitle: 'Produtos',
            headerShown: true,
            title: 'Produtos',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerTitle: 'Carrinho',
            headerShown: true,
            title: 'Carrinho',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerTitle: 'Forma de pagamento',
            headerShown: true,
            title: 'Pagamento',
          }}
        />

        <Stack.Screen
        name="MinhasVendas"
        component={MySales}/>
      </Stack.Navigator>
  );
};

export const AuthRoutes: React.FC = () => {
  const { isPdv, isClient, auth, location, loading } = useAuth();

  if (loading && Platform.OS === 'ios') {
    return null // Coloque seu componente de loading aqui
  } 
  
  if (loading && Platform.OS === 'android') {
    return <LoadingSpinner />;
  }

  if (!location) {
    return <LocationSelect />;
  }

  return (
    <>
    <Drawer.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: { elevation: 1 },
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: 'Nunito_700Bold', color: colors.regular },
        ...drawerContentOptions
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >      
      {(isClient || !auth) && (
        <Drawer.Screen
          name="OrderStack"
          component={OrderStack}
          options={{ headerShown: false, drawerLabel: 'Pedir' }}
        />
      )}

      {isClient && auth && (
        <Drawer.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerShown: true,
            drawerLabel: 'Meus pedidos',
            headerTitle: 'Meus pedidos',
            title: 'Meus pedidos',
          }}
        />
      )}

      {isPdv && auth && (
        <>
          <Drawer.Screen
            name="OrderStack"
            component={OrderStack}
            options={{ headerShown: false, drawerLabel: 'Pedir' }}
          />
        </>
      )}

      {!isClient && !isPdv && !auth && (
        <>
          <Drawer.Screen
            name="OrderStack"
            component={OrderStack}
            options={{ headerShown: false, drawerLabel: 'Pedir' }}
          />
          {/* Coloque o componente para "Mudar localização" aqui, já que ele deve sempre aparecer */}
        </>
      )}

      {!isClient && isPdv && auth && (
        <>
          <Drawer.Screen
            name="OrderStack"
            component={OrderStack}
            options={{ headerShown: false, drawerLabel: 'Pedir' }}
          />
        </>
      )}

      {!isClient && !isPdv && auth && (
        <>
          <Drawer.Screen
            name="MySales"
            component={MySales}
            options={{
              headerShown: true,
              drawerLabel: 'Minhas vendas',
              headerTitle: 'Minhas vendas',
              title: 'Minhas vendas',
            }}
          />
        </>
      )}
    </Drawer.Navigator>
    </>
  );
};
