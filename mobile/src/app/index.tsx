import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StatusBar } from 'react-native'
import { View } from 'react-native'


export default function Home() {
    const [ code, setCode ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleAcessCredencial() {
        try {
            if(!code.trim()) {
                return Alert.alert("Ingresso", "insira o codigo do ingresso")
            }
            setIsLoading(true)

            const { data } = await api.get(`/attendees/${code}/badge`)
            badgeStore.save(data.badge)
            
        } catch (error) {
            console.log(error)
            setIsLoading(false)

            Alert.alert("Ingresso", "Ingresso não encontrado!")

        }
    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href="/ticket" />
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
                    <MaterialCommunityIcons
                        name="ticket-confirmation-outline"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field
                        placeholder="Código do ingresso"
                        onChangeText={setCode}
                    />
                    </Input>

                    <Button 
                        title='acessar credencial'
                        onPress={handleAcessCredencial}
                        isLoading={isLoading}
                    />

                    <Link
                        href="/register"
                        className="text-gray-100 text-base font-bold text-center mt-8"
                    >
                        Ainda não possui ingresso?
                    </Link>
            </View>
        </View>
    )
}