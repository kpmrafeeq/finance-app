import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, Surface, Chip } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import UploadInstructions from '../../components/upload/UploadInstructions';
import * as colors from '../../utils/colors';

export default function UploadScreen() {
  const router = useRouter();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      setFile(result.assets[0]);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleUpload = () => {
    setIsLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      router.push('/processing');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upload Bank Statement</Text>
          <Text style={styles.headerSubtitle}>
            Upload your bank statement PDF to analyze your transactions
          </Text>
        </View>

        <UploadInstructions />
        
        <Surface style={styles.uploadContainer}>
          {file ? (
            <View style={styles.fileInfo}>
              <Chip
                icon="file-pdf"
                mode="outlined"
                style={styles.fileChip}
              >
                {file.name}
              </Chip>
              <Button
                mode="text"
                onPress={() => setFile(null)}
                style={styles.removeButton}
                labelStyle={styles.removeButtonLabel}
              >
                Remove
              </Button>
            </View>
          ) : (
            <Button
              mode="outlined"
              icon={({ size, color }) => (
                <Feather name="upload" size={size} color={color} />
              )}
              onPress={handleFilePick}
              style={styles.uploadButton}
              labelStyle={styles.uploadButtonLabel}
            >
              Select PDF Statement
            </Button>
          )}
          
          <View style={styles.passwordContainer}>
            <MaterialCommunityIcons 
              name="file-lock-outline" 
              size={20} 
              color="#4A5568" 
              style={styles.passwordIcon} 
            />
            <TextInput
              label="PDF Password (if required)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              right={
                <TextInput.Icon
                  icon={({ size, color }) => (
                    isPasswordVisible ? 
                      <Feather name="eye-off" size={size} color="#4A5568" /> : 
                      <Feather name="eye" size={size} color="#4A5568" />
                  )}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
              style={styles.passwordInput}
              mode="outlined"
              outlineColor="#CBD5E0"
              activeOutlineColor="#3AAFB9"
            />
          </View>
        </Surface>

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleUpload}
            style={[
              styles.processButton,
              (!file || isLoading) && styles.disabledButton
            ]}
            labelStyle={[
              styles.processButtonLabel,
              (!file || isLoading) && styles.disabledButtonLabel
            ]}
            loading={isLoading}
            disabled={!file || isLoading}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? 'Uploading...' : 'Upload Statement'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0A2463',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  uploadContainer: {
    padding: 24,
    borderRadius: 12,
    marginVertical: 16,
    elevation: 2,
  },
  uploadButton: {
    borderColor: '#3AAFB9',
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 100,
    justifyContent: 'center',
    borderRadius: 8,
  },
  uploadButtonLabel: {
    fontFamily: 'Inter-Medium',
    color: '#3AAFB9',
  },
  fileInfo: {
    marginBottom: 16,
  },
  fileChip: {
    backgroundColor: '#EBF8FF',
    paddingVertical: 8,
  },
  removeButton: {
    marginTop: 8,
  },
  removeButtonLabel: {
    color: '#E53E3E',
    fontSize: 12,
  },
  passwordContainer: {
    marginTop: 24,
    position: 'relative',
  },
  passwordIcon: {
    position: 'absolute',
    top: 27,
    left: 12,
    zIndex: 1,
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
  },
  actionContainer: {
    marginTop: 'auto',
    marginBottom: 24,
  },
  processButton: {
    paddingVertical: 8,
    backgroundColor: '#0A2463',
    borderRadius: 8,
  },
  processButtonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    paddingVertical: 4,
    color: colors.primary.contrast,
  },
  disabledButton: {
    backgroundColor: colors.primary.disabled,
  },
  disabledButtonLabel: {
    color: colors.primary.contrast,
  },
  buttonContent: {
    height: 48,
  },
});