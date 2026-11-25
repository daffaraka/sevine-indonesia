import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { MotionConfig } from "motion/react";
import "../css/app.css";

const appName = "Sevine Indonesia";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    defaults: {
        future: {
            // Wajib untuk membaca <script data-page="app"> dari inertiajs/inertia-laravel v3.x
            useScriptElementForInitialPage: true,
        },
    },
    resolve: (name) => {
        const pages = import.meta.glob<{ default: React.ComponentType }>(
            "./Pages/**/*.tsx",
            { eager: true },
        );
        const page = pages[`./Pages/${name}.tsx`];
        if (!page) {
            throw new Error(
                `Inertia page tidak ditemukan: ./Pages/${name}.tsx`,
            );
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <MotionConfig
                reducedMotion="user"
                transition={{ ease: [0.2, 0.8, 0.2, 1], duration: 0.2 }}
            >
                <App {...props} />
            </MotionConfig>,
        );
    },
    progress: {
        color: "#1B2E4B",
    },
});
