import Details from "@/components/admin/sale/Details";
import holdUser from "../../images/Recurso 7.png";
import Document from "@/components/admin/sale/Document";
import Image from "next/image"; // Import the Image component

const page = () => {
  return (
    <div className="p-6 xl:p-28">
      <div className="space-y-8">
        <div className="flex w-full gap-7 items-center">
          <div>
            {/* Replace img with Image */}
            <Image
              src={holdUser.src}
              alt="User Holding"
              layout="intrinsic"
              quality={100} 
              className="your-custom-class"
            />
          </div>
          <div className="space-y-1 sm:space-y-4 w-full">
            <div>
              <h2 className="text-2xl sm:text-5xl font-bold">New Sale</h2>
            </div>
            <div className="h-[3px] bg-[#c3d7fc]"></div>
          </div>
        </div>

        <Document />
        <Details />
      </div>
    </div>
  );
};

export default page;
