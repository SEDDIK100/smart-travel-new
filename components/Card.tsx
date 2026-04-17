import { View, Text,Image } from 'react-native'
import React from 'react'

type CardOption ={
  title :  string,
  description :string,
  icon : any,
}

type Props ={
  option: CardOption,
  style: any
}


const Card = ({option,style}:Props) => {

  return (
    <View className={`bg-[rgb(26,34,53)] flex-row items-center border-4 border-gray-700  justify-center  gap-x-8 mb-4 rounded-2xl mx-6 px-5 py-4  ${style} `}>
      <View className='flex-col w-3/4 gap-2'>
      <Text className='text-white text-2xl font-bold text-bold  '> {option.title} </Text>
      <Text className='text-white'> {option.description} </Text>
    </View>                                                                         
    <View className=''>
        <Image source={option.icon} className='w-10 h-10'/>
      </View>
    </View>
  )
}

export default Card