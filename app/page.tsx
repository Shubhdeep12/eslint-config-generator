import FilesAndIgnores from "@/components/FilesAndIgnores";
import Format from "@/components/Format";
import LangOptions from "@/components/LangOptions";
import LinterOptions from "@/components/LinterOptions";
import Name from "@/components/Name";
import RenderJSON from "@/components/RenderJSON";
import Rules from "@/components/Rules";
import { getEslintRules } from "@/lib/eslintrules";

export default async function Home() {
  const rules = await getEslintRules();
  return (
    <div className="flex p-6 w-full">
      <section className="left-section w-1/2 flex-[0.5] flex flex-col divide-y gap-4 max-h-screen overflow-auto">
        <Format />
        <Name />
        <LangOptions />
        <FilesAndIgnores />
        <LinterOptions />
        <Rules rules={JSON.stringify(rules || {})} />
      </section>
      <section className="right-section flex-[0.5] w-1/2">
        <RenderJSON />
      </section>
    </div>
  );
}
