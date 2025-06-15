import { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState({
    gradients: [],
    palettes: [],
    glassEffects: [],
  });
  const [activeTab, setActiveTab] = useState("gradients");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = () => {
    try {
      const gradients = JSON.parse(localStorage.getItem("savedGradients") || "[]");
      const palettes = JSON.parse(localStorage.getItem("savedPalettes") || "[]");
      const glassEffects = JSON.parse(localStorage.getItem("savedGlassEffects") || "[]");

      setSavedItems({ gradients, palettes, glassEffects });
    } catch (error) {
      console.error("Error loading saved items:", error);
    }
  };

  const deleteItem = (type, id) => {
    try {
      const items = JSON.parse(localStorage.getItem(`saved${type}`) || "[]");
      const updatedItems = items.filter((item) => item.id !== id);
      localStorage.setItem(`saved${type}`, JSON.stringify(updatedItems));
      loadSavedItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderGradients = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedItems.gradients.map((gradient) => (
        <GlassCard key={gradient.id} className="p-6">
          <div
            className="h-32 rounded-lg mb-4"
            style={{
              background: gradient.cssCode
                .replace(/^background:\s*/, "")
                .replace(/;$/, ""),
            }}
          ></div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Type: {gradient.type}
            </p>
            {gradient.angle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Angle: {gradient.angle}°
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => copyToClipboard(gradient.cssCode)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => deleteItem("Gradients", gradient.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderPalettes = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedItems.palettes.map((palette) => (
        <GlassCard key={palette.id} className="p-6">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Type: {palette.type}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => copyToClipboard(palette.colors.join(", "))}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => deleteItem("Palettes", palette.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderGlassEffects = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedItems.glassEffects.map((effect) => (
        <GlassCard key={effect.id} className="p-6">
          <div
            className="h-32 rounded-lg mb-4"
            style={{
              backdropFilter: `blur(${effect.blur}px)`,
              WebkitBackdropFilter: `blur(${effect.blur}px)`,
              backgroundColor: `rgba(255,255,255,${effect.opacity})`,
              border: `${effect.borderWidth}px solid ${effect.borderColor}`,
              boxShadow: `0 0 ${effect.shadow || 30}px rgba(0, 0, 0, 0.15)`,
            }}
          ></div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Blur: {effect.blur}px
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Opacity: {Math.round(effect.opacity * 100)}%
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => copyToClipboard(effect.cssCode)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={() => deleteItem("GlassEffects", effect.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Saved Items
        </h1>

        <GlassCard className="mb-8">
          <div className="flex flex-wrap gap-4 p-4 sm:p-6 justify-center">
            {["gradients", "palettes", "glassEffects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </GlassCard>

        {activeTab === "gradients" && renderGradients()}
        {activeTab === "palettes" && renderPalettes()}
        {activeTab === "glassEffects" && renderGlassEffects()}

        {savedItems[activeTab].length === 0 && (
          <GlassCard className="p-8 text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              No saved {activeTab} found. Create some to see them here!
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default SavedItems;
