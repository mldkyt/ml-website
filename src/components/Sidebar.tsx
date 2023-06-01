import { motion } from "framer-motion";
import Link from "next/link";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

const circle: CSSProperties = {
    borderRadius: '50%',
}

export default function Sidebar() {

    const hasRan = useRef(false);
    const [subs, setSubs] = useState(0);

    useEffect(() => {
        if (!hasRan.current) {
            hasRan.current = true;
            fetch('/api/mldkyt/subs').then(res => res.json()).then(data => {
                setSubs(data.subs);
            });
        }
    })

    return (
        <div className="text-center">
            <img src="/pfp.png" style={circle} />
            <span className="text-lg font-bold">mldkyt's website</span>
            <br />
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/">Home</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/meshsave">Meshsave</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/social">Social</Link>
            </motion.div>
            <span className="text-lg font-bold">Projects</span>
            <br />
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/asphaltroads">Asphalt Roads</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/irlsimulator">IRL Simulator</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/kekmetmoregears">Kekmet More Gears</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/kekmetspeedometer">Kekmet Speedo</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/msctweaks">MSC Tweaks</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/oldcarsounds">OldCarSounds</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/oldhayosiko">Old Hayosiko</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/oldhighwaycars">Old Highway Cars</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/oldtrucksounds">Old Truck Sounds</Link>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/project/oldworld">Old World</Link>
            </motion.div>
            <span className="text-lg font-bold">Discord Utilities</span>
            <br />
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Link className="px-2" href="/util/discord/timestamp-generator">Timestamp Gen</Link>
            </motion.div>

        </div>
    )
}