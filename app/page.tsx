import { Hero } from "@/components/Home/Hero/Hero";
import { About } from "@/components/Home/About/About";
import { Gallery } from "@/components/Home/Gallery/Gallery";
import { Socials } from "@/components/Home/Socials/Socials";
import { Reserv } from "@/components/Home/Reserv/Reserv";

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
