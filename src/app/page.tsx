import Navbar from "@/components/home/Navbar";
import SectionCards from "@/components/home/SectionCards";
import SectionMajor from "@/components/home/SectionMajor";


export default function Home() {
  return (
    <>
      <div className="h-full">
        <Navbar />
        <div className="pt-28 w-full h-full grid grid-cols-2 space-y-36">
            <SectionMajor />
            <SectionCards />
        </div>
      </div>

    </>

  );
}
