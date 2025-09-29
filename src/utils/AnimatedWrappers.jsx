import {Outlet, useLocation} from 'react-router-dom'
import {AnimatePresence, motion} from 'motion/react';
import {pageVariants} from './pageVariants.js'

export function AnimatedOutlet({outletsContext}){
    const location = useLocation();
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              exit={"exit"}
              transition={{delay: 1}}
              >
              <Outlet context={{...outletsContext}}/>
            </motion.div>
        </AnimatePresence>
    )
    
}

export function MotionWrapper({children}){
    return(
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              exit={"exit"}
              transition={{delay: 1}}
              >
              {children}
            </motion.div>
        </AnimatePresence>
    )
}