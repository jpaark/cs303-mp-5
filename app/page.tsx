import URLForm from "@/components/URLForm";

export default function Home() {
  return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-fuchsia-300 p-4">
        <h1 className="text-3xl font-bold">URL Shortener</h1>
        <URLForm />
      </div>
  );
}