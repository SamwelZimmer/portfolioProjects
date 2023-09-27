import Image from 'next/image'

import Navbar from '../../components/Navbar';
import ViewChooser from '../../components/ViewChooser';

import { getAllProjects } from '../../lib/firebase';

export interface Project {
  id: string;
  title?: string;
  summary?: string;
  coverPhoto?: string;
  datetime?: { seconds: number, nanoseconds: number };
  tags?: string;
  link?: string;
  categories?: Array<string>;
}

export default async function Home() {

  const projects: Project[] = await getAllProjects();

  console.log(projects)


  return (
    <>
      <main className="flex fixed h-screen w-screen flex-col items-center pt-12">
        <div className='w-full pb-6 flex justify-between items-center z-20 shadow-md'>
          <Navbar />
        </div>

        <ViewChooser projects={projects} />
        
      </main>
    </>

  )
}