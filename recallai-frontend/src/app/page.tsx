import Layout from "@/components/Layout";
import Notes from "@/components/Notes";
import SummaryDashboard from "@/components/SummaryDashboard";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-24">
        {/* HERO */}
        <section className="pt-10 md:pt-14 text-center md:text-left">
          <div className="max-w-3xl">
            {/* TITLE */}
            <h1
              className="
                text-4xl md:text-6xl
                font-bold tracking-tight leading-tight
                bg-gradient-to-r
                from-amber-500
                via-yellow-500
                to-orange-400
                bg-clip-text text-transparent
              "
            >
              Your AI Productivity Companion
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
              A calm workspace where you capture ideas, organize thoughts, and
              generate intelligent AI insights
            </p>

            {/* TAGS (Notion-style blocks) */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm border border-amber-200">
                Capture thoughts instantly
              </span>

              <span className="px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm border border-yellow-200">
                AI-powered insights
              </span>

              <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm border border-orange-200">
                Fast, minimal workflow
              </span>
            </div>
          </div>
        </section>

        {/* NOTES SECTION (PRIMARY FOCUS) */}
        <section className="space-y-6">
          {/* SECTION HEADER */}
          <div className="flex items-end justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Workspace
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Write → Organize → Evolve your thoughts
              </p>
            </div>

            <div className="text-xs text-gray-400 bg-white/60 px-3 py-1 rounded-full border border-gray-200">
              From scattered thoughts to clarity.{" "}
            </div>
          </div>

          {/* NOTES COMPONENT */}
          <Notes />
        </section>

        {/* AI INSIGHTS SECTION (SECONDARY FOCUS) */}
        <section className="space-y-6">
          {/* SECTION HEADER */}
          <div className="flex items-end justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                AI Intelligence
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Daily understanding of your productivity patterns
              </p>
            </div>

            <div className="text-xs text-gray-400 bg-white/60 px-3 py-1 rounded-full border border-gray-200">
              Turn notes into concise insights
            </div>
          </div>

          {/* AI COMPONENT */}
          <SummaryDashboard />
        </section>
      </div>
    </Layout>
  );
}
