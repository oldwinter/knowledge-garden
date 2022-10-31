import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "../config/siteConfig";
import { MobileNavigation } from "./MobileNavigation";
import { NavItem } from "./NavItem";
import { Search } from "./Search";
import { ThemeSelector } from "./ThemeSelector";

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

function DiscordIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}>
      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
    </svg>
  );
}

function NavbarTitle() {
  const chunk = (
    <>
      {siteConfig.navbarTitle?.logo && (
        <img
          src={siteConfig.navbarTitle.logo}
          alt={siteConfig.navbarTitle.text}
          className="w-9 h-9 mr-1 fill-white"
        />
      )}
      {siteConfig.navbarTitle?.text}
      {siteConfig.navbarTitle?.version && (
        <div className="mx-2 rounded-full border border-slate-500 py-1 px-3 text-xs text-slate-500">
          {siteConfig.navbarTitle?.version}
        </div>
      )}
    </>
  );

  return (
    <Link href="/" aria-label="Home page">
      <a className="flex items-center font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
        {siteConfig.navbarTitle && chunk}
        {!siteConfig.navbarTitle && siteConfig.title}
      </a>
    </Link>
  );
}

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8 max-w-full
        ${
          isScrolled
            ? "dark:bg-slate-900/95 backdrop-blur [@supports(backdrop-filter:blur(0))]:dark:bg-slate-900/75"
            : "dark:bg-slate-900"
        }
      `}>
      <div className="mr-2 sm:mr-4 flex lg:hidden">
        <MobileNavigation navigation={siteConfig.navLinks} />
      </div>
      <div className="flex flex-none items-center">
        <NavbarTitle />
        <div className="hidden lg:flex ml-8 mr-6 sm:mr-8 md:mr-0">
          {siteConfig.navLinks.map((item) => (
            <NavItem item={item} key={item.name} />
          ))}
        </div>
      </div>
      <div className="relative flex items-center basis-auto justify-end gap-6 xl:gap-8 md:shrink w-full">
        <Search />
        <ThemeSelector />
        {siteConfig.github && (
          <Link href={siteConfig.github}>
            <a className="group" aria-label="GitHub">
              <GitHubIcon className="h-6 w-6 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
            </a>
          </Link>
        )}
        {siteConfig.discord && (
          <Link href={siteConfig.discord}>
            <a className="group" aria-label="Discord">
              <DiscordIcon className="h-8 w-8 dark:fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
