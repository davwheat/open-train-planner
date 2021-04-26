/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { BottomTabParamList, WelcomeParamList, LiveTrainsParamList, TrainPlannerParamList } from '../types'

import WelcomeScreen from '../screens/WelcomeScreen'
import LiveTrainsScreen from '../screens/LiveTrains/LiveTrainsScreen'
import TrainPlannerScreen from '../screens/TrainPlannerScreen'
import { Host } from 'react-native-portalize'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <Host>
      <BottomTab.Navigator initialRouteName="Welcome" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-outline" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Live Trains"
          component={LiveTrainsNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-stopwatch-outline" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Train Planner"
          component={TrainPlannerNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-map-outline" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </Host>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const tabIconStyle = { marginBottom: -3 }
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={tabIconStyle} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const WelcomeStack = createStackNavigator<WelcomeParamList>()

function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerTitle: 'Welcome' }} />
    </WelcomeStack.Navigator>
  )
}

const LiveTrainsStack = createStackNavigator<LiveTrainsParamList>()

function LiveTrainsNavigator() {
  return (
    <LiveTrainsStack.Navigator>
      <LiveTrainsStack.Screen name="Live Trains" component={LiveTrainsScreen} options={{ headerTitle: 'Live Trains' }} />
    </LiveTrainsStack.Navigator>
  )
}

const TrainPlannerStack = createStackNavigator<TrainPlannerParamList>()

function TrainPlannerNavigator() {
  return (
    <TrainPlannerStack.Navigator>
      <TrainPlannerStack.Screen name="Train Planner" component={TrainPlannerScreen} options={{ headerTitle: 'Train Planner' }} />
    </TrainPlannerStack.Navigator>
  )
}
