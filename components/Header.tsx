import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const {colors} = useTheme()
    const homeStyles = createHomeStyles(colors)
    const completedCount = 10;
    const totalCount = 22;
    const Progresspercentage = totalCount> 0 ? (completedCount/totalCount) *100:0
  return (
    <View style={homeStyles.header}>
        <View style={homeStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} 
            style={homeStyles.iconContainer}>
                <Ionicons name='flash-outline' size={28} color="#ffffff"/>

            </LinearGradient>

            <View style={homeStyles.titleTextContainer}>
                <Text style={homeStyles.title}>Onfon dating media</Text>
                <Text style={homeStyles.subtitle}>
                    {completedCount}of{totalCount}Matches

                </Text>
            </View>

        </View>
        {true   && (
            <View style={homeStyles.progressContainer}>
                <View style={homeStyles.progressBarContainer} >
                    <View style={homeStyles.progressBar}>
                        <LinearGradient
                        colors={colors.gradients.success}
                        style={[homeStyles.progressFill,{width:`${Progresspercentage}%`}]}
                        />
                    </View>
                    <Text style={homeStyles.progressText}>{Math.round(Progresspercentage)}</Text>
                </View>
            </View>
        )}
    </View>
  )
}

export default Header