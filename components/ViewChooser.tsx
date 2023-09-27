"use client";

import { useRecoilState } from "recoil";

import { listViewAtom } from "../atoms/listViewAtom";
import { PROJECTS } from "../helpers/projects";
import ProjectListView from "./ProjectListView";
import ProjectScrollingView from "./ProjectScrollingView";
import { Project } from "@/app/page";

interface ViewChooserProps {
    projects: Project[];
}

export default function ViewChooser({ projects }: ViewChooserProps) {

    const [showListView, _] = useRecoilState(listViewAtom);

    return (
        <>
            {
                showListView ? <ProjectListView projects={projects} /> : <ProjectScrollingView projects={PROJECTS}/>
            }
        </>
    );
}