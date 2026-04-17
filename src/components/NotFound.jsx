import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen bg-lelab-yellow text-lelab-charcoal flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center px-4">

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-[30vw] font-extrabold text-transparent leading-none select-none"
          style={{ WebkitTextStroke: '2px #111111' }}
        >
          404
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-lelab-charcoal"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-4 text-lelab-charcoal/60 font-bold uppercase tracking-widest text-sm"
        >
          Looks like you wandered off the map.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          onClick={() => navigate('/')}
          className="mt-10 px-10 py-4 border-2 border-lelab-charcoal text-lelab-charcoal font-bold uppercase tracking-widest text-sm rounded-full hover:bg-lelab-charcoal hover:text-lelab-yellow transition-all duration-300"
        >
          Back to Home
        </motion.button>

      </div>
    </section>
  );
};

export default NotFound;
