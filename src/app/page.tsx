import Image from 'next/image'

import Navbar from '../../components/Navbar';
import ViewChooser from '../../components/ViewChooser';


export default function Home() {


  return (
    <>
    

      <main className="flex fixed h-screen w-screen flex-col items-center pt-12">
        <div className='w-full pb-6 flex justify-between items-center z-20 shadow-md'>
          <Navbar />
        </div>

        <ViewChooser />
        
      </main>
    </>

  )
}