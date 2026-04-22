import { Hero } from "@/components/Home/Hero/Hero";
import { About } from "@/components/Home/About/About";
import { Gallery } from "@/components/Home/Gallery/Gallery";
import { Reserv } from "@/components/Home/Reserv/Reserv";
import { Socials } from "@/components/Home/Socials/Socials";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Gallery />
      <Reserv />
      <Socials />
    </div>
  );
}
