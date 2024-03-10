import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default function LoginScreen({setUser}) {
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email");

    function createUser(name, email) {
        // TODO: link to endpoint
        return undefined;
    }

    function handleLogin() {
        createUser(name, email);
        setUser({name: name, email: email});
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <TextInput
                    editable
                    value={name}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View
                style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <TextInput
                    editable
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <Button
                title={"Login"}
                onPress={handleLogin}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF5AF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        flex: 1,
        padding: 20
    },
    button: {
        backgroundColor: "#FF5733",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12
    },
    text: {
        color: "white",
    }
});