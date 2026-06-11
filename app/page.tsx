import Hero from "@/components/sections/Hero";
import Specialize from "@/components/sections/Specialize";
import Companies from "@/components/sections/Companies";
import Cases from "@/components/sections/Cases";
import ProfileMatrix from "@/components/sections/ProfileMatrix";
import FooterWordmark from "@/components/sections/FooterWordmark";

export default function Home() {
  return (
    <main>
      <Hero />
      <Specialize />
      <Companies />
      <Cases />
      <ProfileMatrix />
      <FooterWordmark />
    </main>
  );
}
