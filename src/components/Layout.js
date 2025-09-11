import Header from './Header';
    import Navigation from './Navigation';
    import Footer from './Footer';

    export default function Layout({ children }) {
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      );
    }
