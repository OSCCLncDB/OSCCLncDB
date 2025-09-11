export default function Footer() {
      return (
        <footer className="bg-gray-100 text-gray-700 mt-12 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2">About the Research Team</h3>
                <p>Dr. Shelly Sehgal, Associate Professor</p>
                <p>Manish Kumar Mishra, Ph.D. Scholar</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Our Department</h3>
                <p>Centre for Molecular Biology [10]</p>
                <p>Central University of Jammu [5]</p>
                <p>Rahya-Suchani (Bagla), Samba, J&K-181143 [9]</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Acknowledgements</h3>
                <p>We express our sincere gratitude to the Honorable Vice-Chancellor, Prof. Sanjeev Jain, for his unwavering support and encouragement.</p>
              </div>
            </div>
            <div className="mt-8 border-t pt-4 text-sm">
              <p>&copy; {new Date().getFullYear()} OSCClncDB. All Rights Reserved.</p>
              <p>Contact: <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline">your-email@example.com</a></p>
            </div>
          </div>
        </footer>
      );
    }
