import { StyleSheet, View, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import { AlertCircle } from 'lucide-react-native';

const UploadInstructions = () => {
  return (
    <Surface style={styles.container}>
      <View style={styles.headerContainer}>
        <AlertCircle size={20} color="#3AAFB9" />
        <Text style={styles.title}>Instructions</Text>
      </View>
      
      <View style={styles.instructionsList}>
        <View style={styles.instructionItem}>
          <View style={styles.bullet} />
          <Text style={styles.instructionText}>
            Download your bank statement in PDF format
          </Text>
        </View>
        
        <View style={styles.instructionItem}>
          <View style={styles.bullet} />
          <Text style={styles.instructionText}>
            Make sure the PDF contains transaction details
          </Text>
        </View>
        
        <View style={styles.instructionItem}>
          <View style={styles.bullet} />
          <Text style={styles.instructionText}>
            If your PDF is password-protected, enter the password below
          </Text>
        </View>
        
        <View style={styles.instructionItem}>
          <View style={styles.bullet} />
          <Text style={styles.instructionText}>
            Your data stays on your device and is never stored on servers
          </Text>
        </View>
      </View>
      
      <View style={styles.supportedBanks}>
        <Text style={styles.supportedTitle}>Supported Banks:</Text>
        <Text style={styles.banksText}>
          Chase, Bank of America, Wells Fargo, Citi, Capital One, and more
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#0A2463',
    marginLeft: 8,
  },
  instructionsList: {
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3AAFB9',
    marginTop: 6,
    marginRight: 8,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
    lineHeight: 20,
  },
  supportedBanks: {
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 8,
  },
  supportedTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#3AAFB9',
    marginBottom: 4,
  },
  banksText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#2D3748',
    lineHeight: 18,
  },
});

export default UploadInstructions;