import { View , Text, StyleSheet,Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const GoBackBtn = ({text}) => {
    const navigation = useNavigation()
    return(
        <View style={styles.header}>
        <Pressable
        onPress={()=> navigation.goBack()}
        >
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>{text}</Text>
        </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    },
})



export default GoBackBtn