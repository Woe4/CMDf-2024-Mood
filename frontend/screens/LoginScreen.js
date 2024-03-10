import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
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
                    justifyContent: 'center',
                    borderWidth: 3, 
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                    marginBottom: 35
                }}>
                    <Text 
                    style={{
                        fontSize: 30,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>LOGIN</Text>
            </View>

            <View
                style={{
                    flexDirection: 'row'
                }}>
                    <Text
                        style={{
                            marginTop: 4,
                            marginRight: 7,
                            fontSize: 15
                        }}>Name: </Text>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: 'black',
                        borderWidth: 0.75,
                        width: 100,
                        marginBottom: 10
                    }}>
                    <TextInput
                        editable
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{paddingHorizontal: 2}}
                    />
                </View>
            </View>
            <View
                style={{ flexDirection: 'row', }}>
                <Text
                    style={{
                        marginTop: 4,
                        marginRight: 7,
                        fontSize: 15
                    }}>Email: </Text>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: 'black',
                        borderWidth: 0.75,
                        width: 100,
                        marginBottom: 35
                    }}>
                    <TextInput
                        editable
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{paddingHorizontal: 2}}
                    />
                </View>
            </View>
            <Button
                title={"Login"}
                onPress={handleLogin}
                color={"#FFD3A5"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3DA',
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