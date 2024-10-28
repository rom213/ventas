import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import SectionCards from "@/components/home/SectionCards";
import SectionDocs from "@/components/home/SectionDocs";
import SectionMajor from "@/components/home/SectionMajor";


export default function Home() {
  return (
    <>
      <div className="relative">
        <Navbar />
        <div className="pt-28 w-full h-full  space-y-36">
          <SectionMajor />
          <SectionCards />
          <SectionDocs />

        </div>
        <Footer />

      </div>

    </>

  );
}
