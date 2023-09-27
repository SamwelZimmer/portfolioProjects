"use client";

import { useRecoilState } from "recoil";

import { listViewAtom } from "../atoms/listViewAtom";
import { PROJECTS, project } from "../helpers/projects";
import ProjectListView from "./ProjectListView";
import ProjectScrollingView from "./ProjectScrollingView";


export default function ViewChooser() {

    const [showListView, _] = useRecoilState(listViewAtom);

    return (
        <>
            {
                showListView ? <ProjectListView /> : <ProjectScrollingView projects={PROJECTS}/>
            }
        </>
    );
}