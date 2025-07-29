import FileUpload from "./components/FileUpload.jsx";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="w-[30vw] min-h-screen">
          <FileUpload />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">2</div>
      </div>
    </div>
  );
}
