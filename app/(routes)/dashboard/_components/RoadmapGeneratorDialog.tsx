import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'





function RoadmapGeneratorDialog({openDialog, setOpenDialog}: any) {

  const [userInput, setUserInput] = useState<any>();
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();


  const GenerateRoadmap= async() => {
    if (!userInput) return;

    setLoading(true);
    const roadmapId = uuidv4();
    

    try {

      // Subcription manage 
      // @ts-ignore
      const hasSubscriptionEnabled = await has({plan: 'pro'})
      if(!hasSubscriptionEnabled) {
        const resultHistory = await axios.get('/api/history');
        const historyList = resultHistory.data;
        const isPresent = await historyList.find((item: any)=>item?.aiAgentType=='/ai-tools/ai-roadmap-agent');
        router.push('/billing')
        if(isPresent) {
          return null;
        }
      }


      const result = await axios.post('/api/ai-roadmap-agent', {
        roadmapId,
        userInput,
      })

      // console.log('💪 Roadmap generation started:', result.data);

      if (result.data) {
        setOpenDialog(false);
        router.push(`/ai-tools/ai-roadmap-agent/${roadmapId}`)
      } else {
        throw new Error("No data received from server");
      }

      setOpenDialog(false);

    } catch (e) {
      // setLoading(false);
      // console.log('😠 Failed to generate roadmap:', e);
    } finally {
      setLoading(false);
    }
  }


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-3'>Enter Position/Skills to Generate Roadmap</DialogTitle>
            <DialogDescription asChild>
              <div className='mt-3'>
                <Input 
                  placeholder='e.g Full Stack Developer'
                  value={userInput}
                  onChange={(event) => setUserInput(event?.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant={'outline'}
              onClick={() => setOpenDialog(false)}
            >Cancel</Button>
            <Button 
              onClick={GenerateRoadmap}
              disabled={loading || !userInput}
            > {loading ? <Loader2Icon className='animate-spin' /> : <SparklesIcon />} Generate</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default RoadmapGeneratorDialog