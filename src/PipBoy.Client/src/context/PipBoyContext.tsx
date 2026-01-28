import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const TABS = ['STAT', 'INV', 'DATA', 'MAP', 'RADIO'];

interface PipBoyContextType {
    activeTab: string;
    nextTab: () => void;
    prevTab: () => void;
    goToTab: (tabName: string) => void;

}

const PipBoyContext = createContext<PipBoyContextType | undefined>(undefined);

export const PipBoyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const nextTab = () => setTabIndex((prev) => (prev + 1) % TABS.length);
    const prevTab = () => setTabIndex((prev) => (prev - 1 + TABS.length) % TABS.length);

    const goToTab = (tabName: string) => {
        const index = TABS.indexOf(tabName);
        if (index !== -1) setTabIndex(index);
    }

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/hubs/pipboy")
            .withAutomaticReconnect()
            .build();

        connection.on("OnNavigate", (direction: string) => {
            if (direction === "NEXT") nextTab();
            if (direction === "PREV") prevTab();
        });

        connection.start()
            .catch(err => console.error("SignalR Connection Error: ", err));

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowRight':
                case 'd':
                case 'D':
                    nextTab();
                    break;
                case 'ArrowLeft':
                case 'q':
                case 'Q':
                    prevTab();
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);        
        
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            connection.stop(); 
            };
    }, []); //The empty dependency array ensures this effect runs only once on mount and clenaup once on unmount

    return (
        <PipBoyContext.Provider value={{ activeTab: TABS[tabIndex], nextTab, prevTab, goToTab }}>
            {children}
        </PipBoyContext.Provider>
    );
};

export const usePipBoy = () => {
    const context = useContext(PipBoyContext);
    if (!context) throw new Error("usePipBoy must be used within a PipBoyProvider");
    return context;
};