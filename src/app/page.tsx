import { Journey } from "@/components/journey/Journey";
import { Method } from "@/components/method/Method";
import { About, Cases, Lab, Writing, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Journey />
      <About />
      <Method />
      <Cases />
      <Lab />
      <Writing />
      <Contact />
    </main>
  );
}
