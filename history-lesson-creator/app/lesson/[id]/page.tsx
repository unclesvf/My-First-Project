import { lessons } from "@/data/lessons";
import LessonView from "@/components/LessonView";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    id: lesson.id,
  }));
}

export default async function LessonPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const lesson = lessons.find((l) => l.id === params.id);

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Lesson Not Found
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}
