import {  ScrollView, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Preferences from '@/components/Preferences';


const SettingsScreen = () => {

  const{colors} = useTheme()

  const settingsStyles = createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>

      <SafeAreaView style={settingsStyles.safeArea}>
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} 
            style={settingsStyles.iconContainer}>
              <Ionicons name='settings' size={28} color="#ffff"/>
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
        style={settingsStyles.scrollView}
        contentContainerStyle={settingsStyles.content}
        showsVerticalScrollIndicator={false}
        
        >
          <Preferences/>

        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}

export default SettingsScreen

