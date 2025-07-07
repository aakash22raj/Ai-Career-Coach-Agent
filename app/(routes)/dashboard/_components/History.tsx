"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { aiToolsList } from './AiToolsList';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


const History = () => {

    const [userHistory, setUserHistory] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      GetHistory();
    }, [])

    const GetHistory = async() => {
      setLoading(true);
      const result = await axios.get('/api/history');
      console.log(result.data);
      setUserHistory(result.data);
      setLoading(false);
    }

    const GetAgentName = (path: string) => {
      const agent = aiToolsList.find(item => item.path == path);
      return agent
    }



  return (
    <div className='mt-5 p-5 border rounded-xl'>
        <h2 className='font-bold text-lg'>Previous History</h2>
        <p>What Your previously work on, You can find here</p>

        {loading &&
          <div>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index}>
                <Skeleton className="h-[50px] mt-4 w-full rounded-md" />
              </div>
            ))}
          </div>
        }

        {userHistory?.length == 0 && !loading ?
          <div className='flex items-center justify-center mt-5 flex-col'>
            <Image src={'/history.png'} alt='Img' width={50} height={50}/> 
            <h2 className='mt-2'>You do not Have any History</h2>
            <Button className='mt-5'>Explore AI Tools</Button>
          </div>
        :
          <div>
            {userHistory?.map((history: any, index: number) => (
              <Link 
                href={history?.aiAgentType + "/" + history?.recordId}
                key={index} 
                className='flex flex-col sm:flex-row justify-between items-start sm:items-center my-3 border p-3 rounded-md hover:bg-green-100'
              >
                <div className='flex gap-3 sm:gap-5 items-center mb-2 sm:mb-0'>
                  <Image 
                    src={GetAgentName(history?.aiAgentType)?.icon} 
                    alt={'image'}
                    width={20}
                    height={20} 
                    className="w-6 h-6"
                  />
                  <h2 className="text-sm sm:text-base">{GetAgentName(history?.aiAgentType)?.name}</h2>
                </div>
                <h2 className="text-xs sm:text-sm text-gray-500 sm:text-gray-700">{history.createdAt}</h2>
              </Link>
            ))}
          </div>
        }
    </div>
  )
}

export default History