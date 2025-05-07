import { StyleSheet, View, Text, ScrollView, Switch, Platform } from 'react-native';
import { Divider, Surface, Button } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  User, Moon, Bell, Lock, HelpCircle, LogOut, ChevronRight 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    // In a real app, implement proper logout
    router.replace('/');
  };
  
  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    action: React.ReactNode,
    divider = true
  ) => (
    <>
      <View style={styles.settingItem}>
        <View style={styles.settingTitleContainer}>
          {icon}
          <Text style={styles.settingTitle}>{title}</Text>
        </View>
        {action}
      </View>
      {divider && <Divider style={styles.divider} />}
    </>
  );
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Surface style={styles.profileSection}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <User size={32} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profileEmail}>Sign in to sync your data</Text>
          </View>
        </View>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.editProfileButton}
          labelStyle={styles.editProfileLabel}
        >
          Sign In
        </Button>
      </Surface>
      
      <Text style={styles.sectionTitle}>App Settings</Text>
      
      <Surface style={styles.settingsCard}>
        {renderSettingItem(
          <Moon size={20} color="#0A2463" style={styles.settingIcon} />,
          'Dark Mode',
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#CBD5E0', true: '#3AAFB9' }}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : darkMode ? '#FFFFFF' : '#F0F0F0'}
            ios_backgroundColor="#CBD5E0"
          />
        )}
        
        {renderSettingItem(
          <Bell size={20} color="#0A2463" style={styles.settingIcon} />,
          'Notifications',
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#CBD5E0', true: '#3AAFB9' }}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notificationsEnabled ? '#FFFFFF' : '#F0F0F0'}
            ios_backgroundColor="#CBD5E0"
          />
        )}
        
        {renderSettingItem(
          <Lock size={20} color="#0A2463" style={styles.settingIcon} />,
          'Privacy Settings',
          <ChevronRight size={20} color="#A0AEC0" />,
          false
        )}
      </Surface>
      
      <Text style={styles.sectionTitle}>Support</Text>
      
      <Surface style={styles.settingsCard}>
        {renderSettingItem(
          <HelpCircle size={20} color="#0A2463" style={styles.settingIcon} />,
          'Help & Support',
          <ChevronRight size={20} color="#A0AEC0" />,
          false
        )}
      </Surface>
      
      <Button 
        mode="outlined" 
        onPress={handleLogout}
        style={styles.logoutButton}
        icon={({ size, color }) => <LogOut size={size} color={color} />}
        labelStyle={styles.logoutLabel}
      >
        Log Out
      </Button>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3AAFB9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0A2463',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
  },
  editProfileButton: {
    backgroundColor: '#0A2463',
    borderRadius: 8,
  },
  editProfileLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
    marginTop: 8,
  },
  settingsCard: {
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2D3748',
  },
  divider: {
    backgroundColor: '#E2E8F0',
  },
  logoutButton: {
    marginVertical: 24,
    borderColor: '#E53E3E',
    borderWidth: 1.5,
    borderRadius: 8,
  },
  logoutLabel: {
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
    fontSize: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});