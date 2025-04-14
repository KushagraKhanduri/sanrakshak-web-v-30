
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '../context/ThemeProvider';

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  
  const fadeUpVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
              duration: 1,
              delay: 0.5 + i * 0.2,
              ease: [0.25, 0.4, 0.25, 1],
          },
      }),
  };

  // Check if user is already logged in and update state
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      try {
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
          // Verify that the stored data is valid JSON
          const parsedUser = JSON.parse(authUser);
          if (parsedUser && parsedUser.id) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('authUser');
            setUser(null);
          }
        } else {
          localStorage.removeItem('authUser'); // Ensure it's removed
          setUser(null);
        }
      } catch (e) {
        // Clear invalid data
        console.error("Invalid authUser data:", e);
        localStorage.removeItem('authUser');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    
    // Close any open menus
    setMenuOpen(false);
    
    // Dispatch auth change events
    window.dispatchEvent(new Event('auth-state-changed'));
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to landing page with replace
    navigate('/', { replace: true });
  };

  const handleGetStarted = () => {
    navigate('/signup', { replace: true });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-transparent">
        <div className="w-full px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold text-2xl text-white">Sanrakshak</div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoading ? (
                <div className="w-24 h-8 bg-white/10 animate-pulse rounded-lg"></div>
              ) : user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    Go to Dashboard
                    <ArrowRight size={16} className="ml-1.5" />
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-white"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-white"
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-sm font-medium py-1.5 px-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
              
              <button 
                className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors focus-ring"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 pt-16 bg-black/95 backdrop-blur-md z-40 animate-fade-in md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-8 p-6">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-2xl font-medium text-white" 
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-2xl font-medium text-white" 
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-2xl font-medium text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-4 mt-6">
                <Link 
                  to="/login" 
                  className="text-xl font-medium py-2 px-6 rounded-lg hover:bg-white/5 transition-colors text-white"
                  onClick={toggleMenu}
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="text-xl font-medium py-2 px-6 rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      <main>
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-purple-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-purple-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-sky-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-teal-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-orange-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 md:mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                            <Circle className="h-2 w-2 fill-purple-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">
                                Disaster Relief Platform
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                            <Circle className="h-2 w-2 fill-purple-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">
                                Sanrakshak
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                Connecting Those in Need
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white/90 to-purple-300"
                                )}
                            >
                                When Every Second Counts
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            Coordinating disaster victims with NGOs, volunteers, and government organizations for faster, more effective relief operations.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex justify-center"
                    >
                        {isLoading ? (
                          <div className="h-12 bg-white/10 animate-pulse rounded-lg w-40"></div>
                        ) : user ? (
                          <Link 
                            to="/dashboard" 
                            className="flex items-center gap-2 px-6 py-3 font-medium text-base rounded-full bg-gradient-to-r from-white/90 to-white text-black hover:opacity-90 transition-opacity"
                          >
                            Go to Dashboard
                            <ArrowRight size={16} />
                          </Link>
                        ) : (
                          <Link 
                            to="/signup" 
                            className="flex items-center gap-2 px-6 py-3 font-medium text-base rounded-full bg-gradient-to-r from-white/90 to-white text-black hover:opacity-90 transition-opacity"
                          >
                            Get Started
                            <ArrowRight size={16} />
                          </Link>
                        )}
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
