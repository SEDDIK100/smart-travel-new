import { Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

type props = {
  title: string,
  link :any
}

const Press = ({title,link} :props) => {
  return (
    
         <TouchableOpacity onPress={()=>router.push(link)}
          className='bg-[#A3E635] w-3/5 border border-white py-3  rounded-2xl'>
            <Text className='text-center text-2xl ' > {title}  </Text>
        </TouchableOpacity>
    
  )
}

export default Press