import FilesAndIgnores from "@/src/components/FilesAndIgnores";
import Format from "@/src/components/Format";
import LangOptions from "@/src/components/LangOptions";
import LinterOptions from "@/src/components/LinterOptions";
import Name from "@/src/components/Name";
import RenderJSON from "@/src/components/RenderJSON";
import Rules from "@/src/components/Rules";

export default function Home() {
  return (
    <div className="flex p-6 w-full">
      <section className="left-section w-1/2 flex-[0.5] flex flex-col divide-y gap-4 max-h-screen overflow-auto">
        <Format />
        <Name />
        <LangOptions />
        <FilesAndIgnores />
        <LinterOptions />
        <Rules />
      </section>
      <section className="right-section flex-[0.5] w-1/2">
        <RenderJSON />
      </section>
    </div>
  );
}
