import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {gql, useMutation, useQuery} from "@apollo/client";

export default function LoginScreen({setUser}) {
    const GET_USER = gql`
      query getUserData($email: String!) {
        userByEmail(email: $email) {
          name
          email
        }
      }
      `;
    const CREATE_USER = gql`
          mutation CreateUser($name: String!, $email: String!) {
            createUser(userData: {name: $name, email: $email}) {
                user {
                name
                email
              }
            }
          }
    `;

    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email");
    const [createUser] = useMutation(CREATE_USER);
    const {loading: getUserLoading, error: getUserError, data: getUserData} = useQuery(GET_USER, {
        variables: {email: email}
    });

    function handleLogin() {
        if (!getUserLoading) {
            try {
                if (getUserData && getUserData.userByEmail && getUserData.userByEmail.name) {
                    setUser({name: getUserData.userByEmail.name, email: email});
                } else {
                    createUser({variables: {name: name, email: email}});
                    setUser({name: name, email: email});
                }
            } catch (e) {
                console.error(e);
            }
        }
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