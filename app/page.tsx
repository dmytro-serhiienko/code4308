import { Hero } from "@/components/Home/Hero/Hero";
import { Social } from "@/components/Home/Social/Social";
import { About } from "@/components/Home/About/About";
import { Gallery } from "@/components/Home/Gallery/Gallery";

export default function Home() {
  return (
    <div>
      <Hero />
      <Social />
      <About />
      <Gallery />
    </div>
  );
}
