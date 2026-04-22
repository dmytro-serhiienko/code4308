// "use client";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import css from "./Intro.module.css";
// import Image from "next/image";

// export default function Intro() {
//   const [loading, setLoading] = useState(true);
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     if (loading) {
//       document.documentElement.dataset.intro = "playing";
//       window.dispatchEvent(new Event("intro:start"));
//       window.dispatchEvent(new Event("lenis:stop"));
//       document.body.style.overflow = "hidden";
//     } else {
//       document.documentElement.dataset.intro = "done";
//       window.dispatchEvent(new Event("intro:complete"));
//       window.dispatchEvent(new Event("lenis:start"));
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.documentElement.dataset.intro = "done";
//     };
//   }, [loading]);

//   useEffect(() => {
//     // Швидкість лічильника
//     const interval = setInterval(() => {
//       setCounter((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => setLoading(false), 800);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 15);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <AnimatePresence>
//       {loading && (
//         <motion.div
//           className={css.introWrapper}
//           initial={{ opacity: 1 }}
//           exit={{ y: "-100%" }}
//           transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
//         >
//           <div className={css.content}>
//             <motion.div
//               className={css.textContainer}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className={css.logo}>
//                 <Image
//                   className={css.logoImage}
//                   src="/image/logo/logo.png"
//                   alt="Code 4308"
//                   width={420}
//                   height={120}
//                   priority
//                 />
//               </div>
//               <div className={css.loaderBox}>
//                 <div className={css.counter}>{counter}%</div>
//                 <div className={css.progressBg}>
//                   <motion.div
//                     className={css.progressBar}
//                     initial={{ width: 0 }}
//                     animate={{ width: `${counter}%` }}
//                     transition={{ ease: "linear" }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import css from "./Intro.module.css";
import Image from "next/image";

export default function Intro() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (loading) {
      document.documentElement.dataset.intro = "playing";
      window.dispatchEvent(new Event("intro:start"));
      // Зупиняємо скрол через Lenis та CSS
      window.dispatchEvent(new Event("lenis:stop"));
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // ПЕРЕД тим як увімкнути скрол, примусово повертаємо вгору
      window.scrollTo(0, 0);

      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:complete"));

      // Даємо невелику затримку перед стартом скролу
      setTimeout(() => {
        window.dispatchEvent(new Event("lenis:start"));
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }, 100);
    }

    return () => {
      document.documentElement.dataset.intro = "done";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Збільшив затримку до 1 сек, щоб Safari встиг "прокинутись"
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className={css.introWrapper}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          // Змінюємо ease на більш плавний, щоб не було ривка
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className={css.content}>
            <motion.div
              className={css.textContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={css.logo}>
                <Image
                  className={css.logoImage}
                  src="/image/logo/logo.png"
                  alt="Code 4308"
                  width={420}
                  height={120}
                  priority
                />
              </div>
              <div className={css.loaderBox}>
                <div className={css.counter}>{counter}%</div>
                <div className={css.progressBg}>
                  <motion.div
                    className={css.progressBar}
                    initial={{ width: 0 }}
                    animate={{ width: `${counter}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
