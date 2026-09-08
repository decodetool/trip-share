import { createLink } from '@tanstack/react-router';
import { motion } from 'framer-motion';

// Router-aware anchors preserve native modified clicks and context menus.
export const MotionLink = createLink(motion.a);
