import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import { CheckCircle, FileText, Ban } from 'lucide-react-native';

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [statusMessage, setStatusMessage] = useState('Uploading your statement...');
  
  const rotation = useSharedValue(0);
  
  // Animation for the processing icon
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Start processing steps
  useEffect(() => {
    // Start rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1, // Infinite repetitions
      false // No bounce back
    );

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 0.95) {
          clearInterval(uploadInterval);
          setCurrentStep(2);
          setStatusMessage('Analyzing transactions...');
          return 1;
        }
        return prev + 0.1;
      });
    }, 500);

    // Simulate parsing delay
    setTimeout(() => {
      if (currentStep === 2) {
        const parseInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 0.95) {
              clearInterval(parseInterval);
              setCurrentStep(3);
              setStatusMessage('Finalizing...');
              return 1;
            }
            return prev + 0.15;
          });
        }, 600);
      }
    }, 5000);

    // Simulate completion
    setTimeout(() => {
      setStatus('success');
      setStatusMessage('Statement processed successfully!');
      
      // Navigate to dashboard after success
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1500);
    }, 10000);

    return () => {
      clearInterval(uploadInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {status === 'processing' && (
            <Animated.View style={animatedStyle}>
              <FileText size={72} color="#3AAFB9" />
            </Animated.View>
          )}
          
          {status === 'success' && <CheckCircle size={72} color="#38A169" />}
          
          {status === 'error' && <Ban size={72} color="#E53E3E" />}
        </View>
        
        <Text style={styles.title}>
          {status === 'processing' ? 'Processing Statement' : 
           status === 'success' ? 'Processing Complete' : 'Processing Failed'}
        </Text>
        
        <Text style={styles.message}>{statusMessage}</Text>
        
        {status === 'processing' && (
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              color="#3AAFB9"
              style={styles.progressBar}
            />
            <View style={styles.stepIndicator}>
              <View style={[styles.step, currentStep >= 1 && styles.activeStep]}>
                <Text style={styles.stepText}>Upload</Text>
              </View>
              <View style={[styles.step, currentStep >= 2 && styles.activeStep]}>
                <Text style={styles.stepText}>Analyze</Text>
              </View>
              <View style={[styles.step, currentStep >= 3 && styles.activeStep]}>
                <Text style={styles.stepText}>Finalize</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0A2463',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    opacity: 0.5,
  },
  activeStep: {
    opacity: 1,
  },
  stepText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0A2463',
  },
});