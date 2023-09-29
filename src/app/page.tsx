import Image from 'next/image'

import Navbar from '../../components/Navbar';
import ViewChooser from '../../components/ViewChooser';

import { getAllProjects } from '../../lib/firebase';
import FilterMenu from '../../components/FilterMenu';

export interface Project {
  id: string;
  datetime: string;
  title?: string;
  body?: string;
  summary?: string;
  coverPhoto?: string;
  tags?: string;
  link?: string;
  categories?: Array<string>;
}

async function getProjects(): Promise<Project[]> {
  const allItems: Project[] = await getAllProjects();

  // Sort the items based on the datetime field
  return allItems.sort((a, b) => {
    // Convert datetime strings to Date objects for comparison
    const dateA = new Date(a.datetime || '');
    const dateB = new Date(b.datetime || '');

    // Sort in descending order (for ascending order, return dateA.getTime() - dateB.getTime())
    return dateB.getTime() - dateA.getTime();
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

      <FilterMenu />
    </>

  )
}