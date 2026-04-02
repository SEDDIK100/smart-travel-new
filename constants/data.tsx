import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'react-native';

export type Travel ={
    id:number,
    title: string,
    description: string,
    icon : React.ReactNode
}


export const travel : Travel[] =[
    {
        id: 1,
        title : 'Just me ',
        description: 'travel alone',
        icon : () => <Image className='w-full h-full'  source={(require('../assets/rock4.png'))}  />,

    },
     {
        id: 2,
        title : 'Couple', 
        description: 'travel in couple',
        icon : require('../assets/rock4.png')

        
    },
     {
        id: 3,
        title : 'Family',
        description: 'travel in three',
        icon:<MaterialIcons name="family-restroom" size={24} color="white" />
        
    },
     {
        id: 4,
        title : 'Friends',
        description: 'travel in four',
        icon: <MaterialIcons name="family-restroom" size={24} color="white" />
        
    }
]

export const vb : Travel[]=[
    {
        id: 1,
        title : 'advantures',
        description: 'For thrill seekers and explorers ',
        icon : <FontAwesome6 name="person" size={24} color="white" />

    },
     {
        id: 2,
        title : 'Romance',
        description: 'Perfect for couples and dreamy getaways.',
        icon : <MaterialIcons name="family-restroom" size={24} color="white" />

        
    },
     {
        id: 3,
        title : 'Relaxation',
        description: 'Slow down and recharge',
        icon:<MaterialIcons name="family-restroom" size={24} color="white" />
        
    },
     {
        id: 4,
        title : 'Party & Nightlife',
        description: 'Lively cities, beach clubs, and endless fun. ',
        icon: <MaterialIcons name="family-restroom" size={24} color="white" />
        
    },
    {
        id: 5,
        title : 'Party & Cultural Discovery',
        description: 'Explore history, traditions, and local life.',
        icon: <MaterialIcons name="family-restroom" size={24} color="white" />
        
    }
]

