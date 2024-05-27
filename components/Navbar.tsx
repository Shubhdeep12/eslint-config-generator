"use client";
import GitHubButton from "react-github-btn";

export default function Navbar() {
  return (
    <header>
      <nav className="p-4 w-full flex gap-4 items-center flex-col justify-center border-b shadow-sm">
        <h1 className="font-bold text-4xl">ESLint Config Generator</h1>
        <div className="flex gap-2">
          <GitHubButton
            href="https://github.com/Shubhdeep12/eslint-config-generator"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-size="large"
            aria-label="Star Shubhdeep12/eslint-config-generator on GitHub"
          >
            Add a Star
          </GitHubButton>
          <GitHubButton
            href="https://github.com/sponsors/Shubhdeep12"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-icon="octicon-heart"
            data-size="large"
            aria-label="Sponsor @buttons on GitHub"
          >
            Sponsor
          </GitHubButton>
        </div>
      </nav>
    </header>
  );
}
