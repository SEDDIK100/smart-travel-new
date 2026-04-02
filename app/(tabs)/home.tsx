import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Press from '../../components/Press'
const Home = () => {
  return (
     <SafeAreaView className='flex-1 bg-[#0d0d0d]'>
   {/*header*/}
    <View className='flex-row items-center justify-between mx-6 '>
       <Text className='text-white'> seaRock </Text>
     
       <TouchableOpacity className='h-20 w-20 '>
          <Image className='h-full w-full' resizeMode='contain' source={(require('../../assets/rock4.png'))} />
       </TouchableOpacity>
    </View>

    


    


 {/*logo*/}
        <View className=' items-center w-full h-72 '>
          <Image className='w-full h-full' resizeMode='contain' source={(require('@/assets/rock4.png'))}  />
        </View>


     {/*fields*/}

  <View className='flex-col gap-6 mb-8'>
    <View className='items-center flex-row justify-center gap-5 '>
      <Text className='text-white text-7xl font-semibold '>
         Sorry 
      </Text>
      <FontAwesome6 name="face-smile-wink" size={80} color="white" />
      </View>
      <View className='items-center mx-6'>

        <Text className='text-white text-4xl text-center font-normal mb-3' >
          Don t miss new destibnations and vibes  </Text>
           <Text className='text-gray-300 text-2xl text-center font-light' >
          Sign in to see updates from around the worlds 
           </Text>


        
      </View>
    </View>


    {/*btn*/}
      <TouchableOpacity onPress={()=>router.push('/(screens)/vibe')} className='items-center '>
                     <Press title="sign" link={'/(auth)/signin'}/>
                  </TouchableOpacity>
    































    </SafeAreaView>






































  )
}

export default Home