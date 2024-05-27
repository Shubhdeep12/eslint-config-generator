import FilesAndIgnores from "@/components/FilesAndIgnores";
import Format from "@/components/Format";
import LangOptions from "@/components/LangOptions";
import LinterOptions from "@/components/LinterOptions";
import Name from "@/components/Name";
import Others from "@/components/Others";
import RenderJSON from "@/components/RenderJSON";
import Rules from "@/components/Rules";
import { getEslintRules } from "@/lib/eslintrules";

export default async function Home() {
  const rules = await getEslintRules();
  return (
    <div className="flex w-full h-[calc(100vh-124px)] flex-col md:flex-row">
      <section className="good-scroll left-section w-full md-w-2/3 p-6 flex flex-col gap-6 h-full overflow-auto">
        <Format />
        <Name />
        <LangOptions />
        <FilesAndIgnores />
        <LinterOptions />
        <Rules rules={JSON.stringify(rules || {})} />
        <Others />
      </section>
      <section className="right-section w-full md:w-1/3 h-full">
        <RenderJSON />
      </section>
    </div>
  );
}
