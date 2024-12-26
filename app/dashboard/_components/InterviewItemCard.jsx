import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const InterviewItemCard = ({interview}) => {

    const router = useRouter()
    const onStart = ()=>{
        router.push("/dashboard/interview/"+interview?.mockId)
    }
    const onFeedback = ()=>{
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
    }
  return (
    <div className="border border-gray-500 shadow-sm rounded-lg text-xl p-5 " >
        <h2 className='font-bold text-primary my-2 ' >{interview?.jobPosition.toUpperCase()}</h2>
        <h2 className=' text-gray-600 text-lg dark:text-white' >{interview?.jobExperience} Years of experience</h2>
        <h2 className="text-sm text-gray-400 dark:text-white my-2 font-bold" >Created At:  {interview.createdAt}</h2>

        <div className='flex justify-between mt-2 gap-5 ' >
            <Button onClick={onFeedback} size="sm"  className="w-full my-2 bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900" >Feedback</Button>
            <Button onClick={onStart} size="sm"  className="w-full my-2 bg-slate-400 hover:bg-slate-600  dark:bg-blue-600 dark:text-white rounded dark:hover:bg-blue-900">Start</Button>
        </div>
    </div>

  )
}

export default InterviewItemCard