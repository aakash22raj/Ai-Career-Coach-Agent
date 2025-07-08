import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
//   DialogTrigger,
} from "@/components/ui/dialog"
import { File, Loader2Icon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';


const ResumeUploadDialog = ({openResumeUpload, setOpenResumeDialog}: any) => {


    const [file, setFile]=useState<any>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { has } = useAuth();

    useEffect(() => {
      setFile(null);
    }, [openResumeUpload])

    const onFileChange = (event: any)=> {
        const file=event.target.files?.[0];
        if(file){
            console.log(file.name);
            setFile(file);
        }
    }

    const onUploadAnalyze = async()=> {
        if(!file) return;

        setLoading(true);
        const recordId = uuidv4()
        const formData = new FormData();
        formData.append('recordId', recordId);
        formData.append('resumeFile',file);
        // formData.append('aiAgentType', '/ai-tools/ai-resume-analyzer');



        // Subcription manage 
        // @ts-ignore
        const hasSubscriptionEnabled = await has({plan: 'pro'})
        if(!hasSubscriptionEnabled) {
          const resultHistory = await axios.get('/api/history');
          const historyList = resultHistory.data;
          const isPresent = await historyList.find((item: any)=>item?.aiAgentType=='/ai-tools/ai-resume-analyzer');
          router.push('/billing')
          if(isPresent) {
            return null;
          }
        }


        
        // Send FormData to Backend Server
        // console.log("📤 Uploading resume...");
        try {
          const result = await axios.post("/api/ai-resume-agent", formData);
           if(result.data) {
            // console.log("✅ Resume uploaded:", result.data);
            
            // first redirect then Close dialog
            setOpenResumeDialog(false);
            router.push(`/ai-tools/ai-resume-analyzer/${recordId}`);
          } else {
            throw new Error("No data received from server");
          }

          setOpenResumeDialog(false);
        } catch (err) {
          console.error("❌ Upload Failed:", err);
        }finally {
          setLoading(false);
        }
    }


  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload resume pdf file</DialogTitle>
            <DialogDescription>
              <div>
                <label 
                    htmlFor='resumeUpload' 
                    className='flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-green-100 cursor-pointer mt-2'
                >
                    <File className='h-10 w-10'/>
                    {file ? 
                        <h2 className='mt-3 text-green-700'>{file?.name}</h2> : 
                        <h2 className='mt-3'>Click here to Upload PDF file</h2>
                    }
                </label>
                <input 
                    type="file" 
                    id='resumeUpload' 
                    accept='application/pdf' 
                    className='hidden' 
                    onChange={onFileChange}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant={'outline'}  
              onClick={() => setOpenResumeDialog(false)}
            >Cancel</Button>
            <Button disabled={!file || loading} onClick={onUploadAnalyze}>
                {loading ? <Loader2Icon className='animate-spin' /> : <Sparkles/>}
                Upload & Analyze
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ResumeUploadDialog