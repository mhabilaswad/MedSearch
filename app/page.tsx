import Banner from './components/Banner/index';
import Companies from './components/Companies/Companies';
import Courses from './components/Courses/index';
import Mentor from './components/Mentor/index';
import Testimonials from './components/Testimonials/index';
import Newsletter from './components/Newsletter/Newsletter';


export default function Home() {
  return (
    <main>
      <Banner />
      <Companies />
      
      
      <section id="tentang" className="scroll-mt-24">
        <Courses />
      </section>

      <section id="hubungi" className="scroll-mt-24">
        <Mentor />  
      </section>

    </main>
  )
}
