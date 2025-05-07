import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { BarChart, Home, ListFilter, Upload, UserCog } from 'lucide-react-native';
import * as colors from '../../utils/colors';

export default function TabLayout() {
  const theme = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.neutral.text.muted,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
          height: 74,
          backgroundColor: colors.neutral.card,
          borderTopColor: colors.neutral.border.light,
          elevation: 8,
          shadowColor: colors.primary.main + '40',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: 4,
        },
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          fontSize: 18,
          color: colors.primary.main,
        },
        headerStyle: {
          backgroundColor: colors.neutral.card,
          borderBottomColor: colors.neutral.border.light,
          borderBottomWidth: 1,
          elevation: 0, // Remove Android shadow
          shadowOpacity: 0, // Remove iOS shadow
        },
        // Add disabled state styling
        tabBarItemStyle: {
          position: 'relative',
        },
        tabBarButtonStyle: {
          opacity: 1, // Override default opacity
        },
        // Define colors for disabled state
        tabBarIconStyle: {
          opacity: 1, // Keep icon fully visible
        },
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
      }}
      // Set proper colors for disabled items
      disabledStyle={{
        color: colors.neutral.text.disabled,
      }}
      // Use a custom disabledColor for tabs
      tabBarOptions={{
        disabledColor: colors.neutral.text.disabled,
        activeTintColor: colors.primary.main,
        inactiveTintColor: colors.neutral.text.muted,
        showLabel: true,
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, size }) => <Upload size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => <ListFilter size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, size }) => <BarChart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <UserCog size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}