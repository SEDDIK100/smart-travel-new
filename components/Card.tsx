import { View, Text } from 'react-native'
import React from 'react'

type CardOption ={
  title :  string,
  description :string,
  icon : React.ReactNode
}

type Props ={
  option: CardOption
}


const Card = ({option}:Props) => {

  return (
    <View className='bg-[rgb(26,34,53)] flex-row items-center justify-between gap-2 mb-4 rounded-2xl mx-6 p-6'>
      <View className='flex-col gap-3'>
      <Text className='text-white text-2xl font-bold text-bold  '> {option.title} </Text>
      <Text className='text-white text-base'> {option.description} </Text>
    </View>
    <View className='mr-6 '>
        {option.icon}
      </View>
    </View>
  )
}

export default Card