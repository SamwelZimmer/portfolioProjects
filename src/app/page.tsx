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

async function getProjects(): Promise<Project[]> {
  const allItems: Project[] = await getAllProjects();

  // sort the items based on the datetime field
  return allItems.sort((a, b) => {
    // convert datetime to milliseconds for comparison
    const timestampA = (a.datetime?.seconds || 0) * 1000 + (a.datetime?.nanoseconds || 0) / 1_000_000;
    const timestampB = (b.datetime?.seconds || 0) * 1000 + (b.datetime?.nanoseconds || 0) / 1_000_000;

    // sort in descending order
    return timestampB - timestampA;
  });
}


export default async function Home() {

  const projects: Project[] = await getProjects();

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