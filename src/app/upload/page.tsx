"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(",")[1];
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageData: base64Data,
            mimeType: file.type,
          }),
        });

        const { analysis } = await response.json();
        setAnalysis(analysis);
        setLoading(false);
      };
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Analysis with Gemini AI</h1>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {analysis && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2 text-black">Analysis Result:</h2>
          <p className="text-black">{analysis}</p>
        </div>
      )}
    </div>
  );
}