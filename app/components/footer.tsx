"use client";

import React from "react";
import {
  IconTwitterX,
  IconGitHub,
  IconInstagram,
  IconRss,
  IconLinkedIn,
  IconOrcid,
  IconMail,
} from "./icons";
import { metaData, socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon size={16} />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg mt-2 gap-3.5 float-right transition-opacity duration-300 hover:opacity-90 text-[var(--color-contrast-low)]">
      <SocialLink href={socialLinks.github} icon={IconGitHub} />
      <SocialLink href={socialLinks.linkedin} icon={IconLinkedIn} />
      <SocialLink href={socialLinks.twitter} icon={IconTwitterX} />
      <SocialLink href={socialLinks.instagram} icon={IconInstagram} />
      <SocialLink href={socialLinks.email} icon={IconMail} />
      <SocialLink href={socialLinks.orcid} icon={IconOrcid} />
      <a href="/rss.xml" target="_self">
        <IconRss size={16} />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="block lg:mt-12 mt-8 text-[var(--color-contrast-medium)]">
      <div className="border-b border-[var(--color-border)]" />
      <p className="mt-5 text-xs flex justify-center gap-1 text-[var(--color-contrast-low)]">
        Portfolio inspired by{" "}
        <a
          href="https://stack-dhruv.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-contrast-medium)] hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          Dhruvkumar Patel
        </a>
      </p>
    </footer>
  );
}
