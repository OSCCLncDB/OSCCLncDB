import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Research Team Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About the Research Team</h3>
            <div className="flex flex-col items-center">
              <Image 
                src="/images/shelly.jpg" 
                alt="Dr. Shelly Sehgal" 
                width={80} 
                height={80} 
                className="rounded-full mb-3 shadow-md"
              />
              <p className="font-semibold">Dr. Shelly Sehgal, Associate Professor</p>
              <p>Manish Kumar Mishra, Ph.D. Scholar</p>
            </div>
          </div>
          
          {/* Department Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Department</h3>
            <p>Centre for Molecular Biology</p>
            <p>Central University of Jammu</p>
            <p>Rahya-Suchani (Bagla), Samba, J&K-181143</p>
          </div>

          {/* Acknowledgements Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Acknowledgements</h3>
                        <div className="flex justify-center items-center space-x-6">
              <Image 
                src="/images/vc.jpg" 
                alt="Vice-Chancellor Prof. Sanjeev Jain" 
                width={80} 
                height={80} 
                className="rounded-full shadow-md"
              />
              <Image 
                src="/images/jkstic.jpg" 
                alt="JKSTIC Logo" 
                width={80} 
                height={80} 
                className="rounded-full shadow-md"
              />
              <p className="mb-4">We express our sincere gratitude to the Honorable Vice-Chancellor, Prof. Sanjeev Jain, and JKST&IC, Govt of J&K, for their unwavering support and encouragement.</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-6 text-sm">
          <p>&copy; {new Date().getFullYear()} OSCClncDB. All Rights Reserved.</p>
          <p>Contact: <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline">contact@oscclncdb.in</a></p>
        </div>
      </div>
    </footer>
  );
}

