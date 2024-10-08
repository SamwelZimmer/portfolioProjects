"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { getProject } from "@/lib/firebase";
import BackButton from "@/components/BackButton";
import SimilarProjects from "@/components/SimilarProjects";
import {
  convertTimestampToDate,
  concatenateStringToLength,
  monthNumberToString,
  openInNewTab,
} from "@/lib/helpers";
import { DefaultSpinner, ImagePlaceholder } from "@/components/Loaders";
import { FilterChip } from "@/components/common/Chips";
import HomeButton from "@/components/HomeButton";
import StatusIndicator from "@/components/StatusIndicator";
import { Project } from "@/lib/types";

export default function ProjectPage() {
  const [content, setContent] = useState<Project | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchProject = async () => {
      const contentData = await getProject(pathname);
      setContent(contentData);
    };

    fetchProject();
  }, []);

  let dateObject;
  if (content?.datetime) {
    dateObject = convertTimestampToDate(content?.datetime);
  }

  return (
    <>
      <BackButton />
      <HomeButton />

      {!content ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="w-32">
            <DefaultSpinner />
          </div>
        </div>
      ) : (
        <main className="py-24 px-8 sm:px-0 w-full sm:w-[400px] md:w-[600px] mx-auto flex flex-col gap-12">
          <div className="w-full flex justify-between items-center">
            {dateObject && (
              <span className="font-light opacity-50">
                {concatenateStringToLength(
                  monthNumberToString(dateObject.month),
                  3
                )}{" "}
                {dateObject.year}
              </span>
            )}
            {content?.link && (
              <motion.button
                onClick={() => openInNewTab(content?.link ? content.link : "")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="opacity-50 hover:opacity-20"
              >
                <FiExternalLink size={24} />
              </motion.button>
            )}
          </div>

          <div className="w-full flex flex-col gap-4">
            <h1 className="font-medium text-4xl">{content?.title}</h1>
            <p>{content?.summary}</p>
          </div>

          {content?.status && (
            <div className="my-auto flex gap-2">
              <span className="opacity-50 font-light">status:</span>
              <StatusIndicator status={content?.status} />
            </div>
          )}

          {content?.coverPhoto && (
            <div className="w-full flex relative rounded-md overflow-clip border items-center justify-center">
              <div
                className={`absolute ${
                  imageLoaded ? "hidden" : "block"
                } w-[calc(100%-1rem)] my-auto mx-auto`}
              >
                <ImagePlaceholder />
              </div>
              <Image
                src={content.coverPhoto}
                alt="cover photo"
                width={1000}
                height={700}
                className="w-full"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          )}

          {content.body && (
            <ReactMarkdown className="markdown">{content.body}</ReactMarkdown>
          )}

          <div className="flex flex-col gap-2">
            <span className="opacity-50 font-light">project categories...</span>

            <div className="scrollable-but-hidden-scrollbar flex items-center overflow-scroll">
              {content?.categories?.map((tag, index) => (
                <div key={index} className="">
                  <FilterChip text={tag} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="opacity-50 font-light">
              check out some similar projects...
            </span>
            <div className="scrollable-but-hidden-scrollbar overflow-scroll">
              <SimilarProjects docId={content.id} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
