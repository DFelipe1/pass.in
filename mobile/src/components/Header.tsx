import { Text, View } from "react-native";

type Props = {
    title: string
}

export function Header({ title }: Props) {
    return (
        <View className="w-full h-32 px-8 pb-4 flex-row items-end bg-black/20 border-b border-white/10">
            <Text className="flex-1 text-center text-white text-lg font-medium">
                { title }
            </Text>
        </View>
    )
}