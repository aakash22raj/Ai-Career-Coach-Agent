"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyState from '../_components/EmptyState'
import axios from 'axios'
import Markdown from 'react-markdown'
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';



type Message = {
  content:string,
  role:string,
  type:string
}



const AiChat = () => {

  const [userInput, setUserInput]=useState<string>('');
  const [loading,setLoading]=useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const {chatid} : any = useParams();
  const router = useRouter();


  useEffect(() => {
    chatid && GetMessageList();
  }, [chatid])
  
  const GetMessageList = async() => {
    console.log('Fetching roadmap for ID:', chatid);
    const result = await axios.get('/api/history?recordId='+ chatid);
    console.log('💪 Get Roadmap history:', result.data);
    setMessageList(result.data?.content)
  }


  const onSend = async()=> {
    if (!userInput.trim()) return;

    const input = userInput; // backup before clearing
    setUserInput('');
    setLoading(true);

    setMessageList(prev=>[...prev,{
      content:userInput,
      role:'user',
      type:'text'
    }]);

    
    try {
      const response = await axios.post('/api/ai-career-chat-agent',{
        userInput: input
      });
  
      // console.log(response.data); 
      setMessageList(prev => [...prev, response.data])
      // setLoading(false);

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error (Axios):", {
          message: error.message,
          response: error.response?.data || "No response body",
          status: error.response?.status || "No status code",
          stack: error.stack,
        });
      } else {
        console.error("API Error (Unknown):", error);
    }

      setMessageList(prev => [
        ...prev,
        {
          content: "Sorry, something went wrong. Please try again.",
          role: "assistant",
          type: "text"
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  // console.log(messageList);

  
  useEffect(() => {
    // Save message into Database
    messageList.length > 0 && updateMessageList();
  }, [messageList])

  const updateMessageList = async()=> {
    const result = await axios.put('/api/history', {
      content:messageList,
      recordId: chatid
    });
    // console.log(result);
  }


  const onNewChat = async()=> {
    // Create New record to History Table
    const id = uuidv4();
    const result = await axios.post('/api/history', {
      recordId: id,
      content: []
    });
    // console.log(result);
    router.replace("/ai-tools/ai-chat/" + id)
  }



  return (
    <div className='px-1 md:px-10 lg:px-20 xl:px-30 h-[75vh] overflow-auto'>
      <div className='flex items-center justify-between gap-8'>
        <div>
          <h2 className='font-bold text-lg'>AI Career Q/A Chat</h2>
          <p>Smarter career decisions start here get tailored advice and real time market insights.</p>
        </div>
        <Button onClick={onNewChat}>+ New Chat</Button>
      </div>

      <div className='flex flex-col h-[65vh] mt-4'>
        {messageList?.length <= 0 &&
          <div className='mt-5'>
            {/* Empty State Option */}
            <EmptyState selectedQuestion={(question:string)=>setUserInput(question)}/>
          </div>
        }
  
        <div className='flex-1 pb-4'>
          {/* Message List */}
          {messageList?.map((message, index) => (
            <div key={`${message.role}-${index}`}>
              <div className={`flex mb-2 ${message.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`p-3 rounded-lg gap-2 ${message.role === 'user' ?
                    'bg-gray-200 text-black rounded-lg' : 
                    "bg-gray-50 text-black"
                  }`}
                >
                  <Markdown>
                    {message.content}
                  </Markdown>
                </div>
              </div>
            </div>
          ))}

          {loading && ( 
            <div className='flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2'>
              <LoaderCircle className='animate-spin' /> Thinking...
            </div>
          )}
        </div>
  
        <div className='flex justify-between items-center gap-4 absolute bottom-5 w-[83%] md:w-[60%]'>
          {/* Input Field */}
          <Input 
            placeholder='Type here...' 
            value={userInput ?? ''}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button onClick={onSend} disabled={loading || !userInput.trim()}>
            <Send/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AiChat