import * as React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface AnimatedHoverButtonProps {
  href: string
  label: string
  icon: React.ReactNode
  color?: string
}

export default function AnimatedHoverButton({ href, label, icon, color = "bg-primary" }: AnimatedHoverButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Link to={href}>
      <motion.div
        initial={{ width: 48, height: 48 }}
        whileHover={{ width: 180 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
        className={`${color} flex items-center justify-center overflow-hidden relative`}
        style={{ borderRadius: 24 }}
      >
        <motion.div
          className="absolute"
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-xl">{icon}</span>
        </motion.div>

        <motion.div
          className="w-full flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
        >
          <span className="text-white text-sm font-bold whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </Link>
  )
}
