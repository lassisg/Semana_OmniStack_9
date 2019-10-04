import React, { useState } from "react";
import {
    SafeAreaView,
    AsyncStorage,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
    const [date, setDate] = useState("");
    const id_spot = navigation.getParam("id_spot");

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem("user");
        await api.post(
            `/spots/${id_spot}/bookings`,
            {
                date
            },
            {
                headers: { user_id }
            }
        );

        Alert.alert("Solicitação de reserva enviada.");

        navigation.navigate("List");
    }

    function handleCancel() {
        navigation.navigate("List");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleCancel}
                style={[styles.button, styles.cancelButton]}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30
        // justifyContent: "center",
        // alignItems: "center"
    },

    // form: {
    //     alignSelf: "stretch",
    //     paddingHorizontal: 30,
    //     marginTop: 30
    // },

    label: {
        fontWeight: "bold",
        color: "#444444",
        marginBottom: 8,
        marginTop: 2
    },
    input: {
        borderWidth: 1,
        borderColor: "#dddddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: "#cccccc",
        marginTop: 10
    },

    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16
    }
});
