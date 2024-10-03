import { atom } from "recoil";

export const projectCategoriesAtom = atom<string[]>({
    key: "projectCategoriesAtom",
    default: [],
});