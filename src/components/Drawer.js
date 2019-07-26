import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

export default class Drawer extends React.Component {
    goTo = () => {
        console.log('aqui')
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Image source={require('../assets/1.jpg')} style={styles.image} />
                </View>
                <FlatList
                    data={[
                        { key: 'Perfil'},
                        { key: 'Confirmadas'},
                        { key: 'Buscar'},
                        { key: 'Sair'}
                    ]}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={this.goTo} style={styles.button}>
                            <Text key={item.key} style={styles.btnText}>{item.key}</Text>
                        </TouchableOpacity>
                    )
                }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        left: 22,
        width: 300,
        flex: 1
    },
    image: {
        width: 300,
        height: 300,
        left: 0,
        top: 0,
    },
    button: {
        paddingVertical: 10,
        width: 284,
        backgroundColor: '#fff'
    },
    btnText: {
        textAlign: 'center'
    }
})