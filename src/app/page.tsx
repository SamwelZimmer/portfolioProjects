import Image from 'next/image';

import Navbar from '../../components/Navbar';
import ViewChooser from '../../components/ViewChooser';

import { getAllProjects } from '../../lib/firebase';
import FilterMenu from '../../components/FilterMenu';

export type StatusType = "completed" | "abandoned" | "postponed" | "ongoing";

export interface Project {
  id: string;
  datetime: string;
  title?: string;
  body?: string;
  status?: StatusType;
  summary?: string;
  coverPhoto?: string;
  tags?: string;
  link?: string;
  categories?: Array<string>;
}

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getProjects(categories: string[]): Promise<Project[]> {

  let allItems: Project[] = await getAllProjects();

  if (categories.length !== 0) {
    allItems = allItems.filter(item => {
        if (item.categories) {
            return item.categories.some(category => 
                categories.includes(category)
            );
        }
        return false;  // If item doesn't have categories, discard it
    });
  }

  // Sort the items based on the datetime field
  return allItems.sort((a, b) => {
    // Convert datetime strings to Date objects for comparison
    const dateA = new Date(a.datetime || '');
    const dateB = new Date(b.datetime || '');

    // Sort in descending order (for ascending order, return dateA.getTime() - dateB.getTime())
    return dateB.getTime() - dateA.getTime();
  });
}

export default async function Home(props: Props) {

  const searchParams = props.searchParams;
  
  let categoriesArray: string[] = [];
  if (typeof searchParams.categories === 'string') {
    categoriesArray = searchParams.categories.split(',');
  };

  const projects: Project[] = await getProjects(categoriesArray);

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