import RegisterPage from "@/app/(routes)/signup/page";
import LoginPage from "@/app/(routes)/login/page";
import SignUpPage from "@/app/(routes)/signup/page";
import BackGroundVideo from "@/app/components/BackGroundVideo";
import Cards from "@/app/components/Cards";
import IntroStats from "./components/IntroStats";
import Image from "next/image";
import MedicationManagement from "./components/MedicationManagement";
import AskedQuestions from "@/components/AskedQuestions";

export default function Home() {
    return (
        <>
            <main className="relative pt-21.5 ">
                <section className="relative min-h-screen  overflow-hidden z-10 text-white px-8 py-6 mx-auto">
                    <BackGroundVideo />
                    <div className="flex flex-col items-center text-center mt-20 ">
                        <h1 className="text-6xl font-semibold mt-4  mb-2.5 leading-tight animate-pulse">
                            Connecting Medical Staff and Patients
                        </h1>
                        <p className=" text-2xl mt-4 w-1/3 mb-7 ">One Powerful App for Every Step of Care</p>
                        <button className="px-14 py-4 border-2 border-white text-white font-semibold bg-transparent rounded-full mb-14">Learn More</button>
                    </div>
                    <div>
                        <Cards />
                    </div>
                </section>

                <IntroStats />
                <section className="mx-auto max-w-screen-xl px-4 py-10">
                    <div className="relative aspect-[21/9] rounded-3xl overflow-hidden ">
                        <Image
                            src="https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?auto=format&fit=crop&w=2000&q=80"
                            alt="a doctor checking a patient's blood pressure"
                            fill
                            priority
                            sizes="(min-width: 1280px) 1152px, 100vw"
                            className="object-cover"
                        />
                    </div>
                </section >
                <MedicationManagement/>
                <section className="py-7">
                    <AskedQuestions/>
                </section>
            </main>

        </>
    );
}


