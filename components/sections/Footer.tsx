import { profile } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full">
      <div className="container-app border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 py-8 font-mono text-xs text-shade-mute sm:flex-row sm:items-center sm:justify-between">
          <span>
            {profile.name} (c) {year}
          </span>
          <span>{profile.handle}</span>
        </div>
      </div>
    </footer>
  );
}
