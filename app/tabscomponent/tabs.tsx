import { useState } from "react";

export function Tabs() {
    const tabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' },
    ];
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            {tabs.map((tab, idx) => (
                <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    className={activeTab === idx ? 'active' : ''}
                    style={{ fontWeight: activeTab === idx ? "bold" : "normal" }}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(idx);
                    }}
                >
                    {tab.label}
                </a>
            ))}

            <div className="tabs">
                {activeTab === 0 && <div>Content for Tab 1</div>}
                {activeTab === 1 && <div>Content for Tab 2</div>}
                {activeTab === 2 && <div>Content for Tab 3</div>}
            </div>
        </div>
    );
}