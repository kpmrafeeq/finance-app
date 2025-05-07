import { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Button } from 'react-native-paper';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleGoogleSignIn = () => {
    // In a real app, implement Google Sign In
    router.replace('/(tabs)');
  };

  const handleContinueAsGuest = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
          style={styles.logoImage} 
        />
        <Text style={styles.appName}>FinTrack</Text>
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Track Your Finances</Text>
        <Text style={styles.subtitle}>
          Upload statements, analyze spending patterns, and set budgets to take control
          of your financial health.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="google"
          onPress={handleGoogleSignIn}
          style={styles.googleButton}
          labelStyle={styles.buttonLabel}
        >
          Sign in with Google
        </Button>
        
        <Button
          mode="outlined"
          onPress={handleContinueAsGuest}
          style={styles.guestButton}
          labelStyle={[styles.buttonLabel, styles.guestButtonLabel]}
        >
          Continue as Guest
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#0A2463',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#0A2463',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#4A5568',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
  googleButton: {
    marginBottom: 16,
    backgroundColor: '#0A2463',
    paddingVertical: 8,
    borderRadius: 8,
  },
  guestButton: {
    borderColor: '#0A2463',
    borderWidth: 1.5,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    paddingVertical: 4,
  },
  guestButtonLabel: {
    color: '#0A2463',
  },
});