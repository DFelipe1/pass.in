import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/server/api'
import { colors } from '@/styles/colors'
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar } from 'react-native'
import { View } from 'react-native'

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"

export default function Register() {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    async function handleRegister() {
        try {
            if(!name.trim() || !email.trim()) {
                return Alert.alert("Register", "Preencha todos os campos")
            }
            setIsLoading(true)

            const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
                name,
                email,
            })

            if(registerResponse.data.attendeeId){
                Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
                    { text: "OK", onPress: () => router.push("/ticket") },
                ])
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)

            if(axios.isAxiosError(error)){
                if (
                    String(error.response?.data.message).includes("already registered")
                  ) {
                    return Alert.alert("Inscrição", "Este e-mail já está cadastrado!")
                  }
            }

            Alert.alert("Inscrição", "Não foi possível fazer a inscrição")
        }

    }


    return (
        <View className='flex-1 bg-green-500 items-center justify-center p-8'>
            <StatusBar barStyle='light-content'/>
            <Image 
                source={require('@/assets/logo.png')}
                className='h-16'
                resizeMode='contain'
            />

            <View className="w-full mt-12 gap-3">
                <Input>
                    <FontAwesome6
                        name="user-circle"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field
                        placeholder="Nome completo"
                        onChangeText={setName}
                    />
                </Input>
                <Input>
                    <MaterialIcons
                        name="alternate-email"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field
                        placeholder="email"
                        keyboardType='email-address'
                        onChangeText={setEmail}
                    />
                </Input>

                <Button 
                    title='Realizar inscrição'
                    onPress={handleRegister}
                    isLoading={isLoading}
                />

                <Link
                    href="/"
                    className="text-gray-100 text-base font-bold text-center mt-8"
                >
                    já possui ingresso?
                </Link>
            </View>
        </View>
    )
}