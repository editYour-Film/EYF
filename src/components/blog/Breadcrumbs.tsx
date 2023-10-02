import routes from "@/routes";
import Link from "next/link";
import React from "react";

type BreadcrumbsProps = {
  title: string;
};
const Breadcrumbs = ({ title }: BreadcrumbsProps) => {
  return (
    <div className="max-w-7xl mx-auto mb-8 md:mb-16">
      <ul className="hidden lg:flex gap-x-2 items-start">
        <li className="sm:text-lg text-gray opacity-80 cursor-default uppercase transition-opacity duration-200 hover:opacity-100">
          <Link href={routes.BLOG} scroll={false}>Blog</Link>
        </li>
        <li className="text-gray opacity-80">&gt;</li>

        <li className="sm:text-lg text-gray opacity-80 cursor-default uppercase transition-opacity duration-200 hover:opacity-100">
          <Link href={routes.BLOG}>{title}</Link>
        </li>
      </ul>

      <ul className="flex lg:hidden gap-x-2 items-start">
        <li className="transform rotate-180 text-gray opacity-80">&gt;</li>
        <li className="sm:text-lg text-gray opacity-80 cursor-default uppercase transition-opacity duration-200 hover:opacity-100">
          <Link href={routes.BLOG}>{title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
