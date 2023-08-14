"use client";

import { useActiveSection } from "@/app/context/active-section-context";
import { projectsData, useInViewSettings } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsCloud, BsGithub, BsYoutube } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import Reveal from "./utils/reveal";
import SectionHeading from "./utils/section-heading";
import { useTheme } from "@/app/context/theme-context";

const Projects = () => {
    const { ref, inView } = useInView(useInViewSettings);
    const { setActiveSection, timeOfLastClick } = useActiveSection();
    
    useEffect(() => {
        return () => {
            if (inView && Date.now() - timeOfLastClick > 1000) {
                setActiveSection("Projects");
            }
        };
    }, [inView, setActiveSection, timeOfLastClick]);
    
    return (
        <section
            id="projects"
            className="scroll-m-28"
            >
            <div
                ref={ref}
                className="mb-4"
            >
                <SectionHeading>MY PROJECTS</SectionHeading>
            </div>
            <div className="w-screen flex justify-center">
                <div className="flex flex-wrap w-screen justify-center max-w-7xl ">
                    {/* projects */}
                    {RenderProjects(projectsData)}
                </div>
            </div>
        </section>
    );
};

export default Projects;

function RenderProjects(projectsData: any) {
    const {theme} = useTheme();
    return projectsData.map((project: any) => {
        return (
            // card
            <Reveal key={project.name + project.description}>
                <div
                    // className=" flex justify-center my-8 sm:px-8"
                    className=" flex justify-center my-8 sm:px-8 px-4 items-baseline"
                >
                    {/* image */}
                    {/* <div className="max-w-lg sm:max-w-xl pb-2 bg-gray-100 rounded-xl border shadow-md shadow-gray-300 flex flex-col justify-between"> */}
                    <div className="max-w-lg sm:max-w-xl pb-2 bg-gray-100 rounded-xl border shadow-md shadow-gray-300 flex flex-col dark:bg-gray-800 dark:border-gray-700 dark:shadow-none ">
                        <div className="">
                            {project?.carouselImage[0]?.image && (
                                <Image
                                    priority={true}
                                    className="rounded-t-xl"
                                    alt={project?.carouselImage[0].alt}
                                    src={project?.carouselImage[0].image}
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ width: "100%", height: "auto" }} // optional
                                ></Image>
                            )}
                            {/* card body */}
                            <div className="sm:max-w-2xl px-5 sm:px-7 mt-6">
                                <h1 className="font-bold text-xl pb-2">{project.title}</h1>
                                {/* tech */}
                                <div className="gap-1.5 flex flex-row flex-wrap justify-center sm:justify-start">
                                    {project.tech.map((technology: any) => {
                                        return (
                                            <div
                                                className=" bg-white p-1 px-1.5  my-1 rounded-full flex select-none
                            justify-center items-center shadow-sm shadow-gray-300 text-sm dark:bg-gray-950 dark:shadow-none dark:border dark:border-gray-700"
                                                key={project.name + technology}
                                            >
                                                {technology}{" "}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="py-4">{project.description}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 h-w-full justify-center mb-4">
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    className={"sm:w-44 " + (theme == "dark" ? "button_accent" : "button_primary")}
                                    target="_blank"
                                    href={project.codeURL}
                                >
                                    GitHub
                                    <BsGithub size={20} />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Link
                                    className={"sm:w-44 " + (theme == "dark" ? "button_primary" : "button_accent")}
                                    target="_blank"
                                    href={project?.liveDemoURL ?? project?.videoDemoURL}
                                >
                                    {project?.liveDemoURL ? "Live Demo" : "Video Demo"}
                                    {project?.liveDemoURL ? (
                                        <BsCloud size={20} />
                                    ) : (
                                        <BsYoutube size={20} />
                                    )}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    });
}
