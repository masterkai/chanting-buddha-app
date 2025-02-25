import { useState } from "react";

function App() {
    const [chant, setChant] = useState("南無阿彌陀佛"); // 佛號
    const [targetCount, setTargetCount] = useState(10); // 設定遍數
    const [currentCount, setCurrentCount] = useState(0); // 當前遍數
    const [currentCharIndex, setCurrentCharIndex] = useState(-1); // 目前高亮的字索引
    const [chanting, setChanting] = useState(false); // 是否正在念誦
    const [finished, setFinished] = useState(false); // 是否完成念誦
    const [speed, setSpeed] = useState(500); // 預設速度 500ms

    const audio = new Audio("/chant.mp3"); // 載入音效
    const startChanting = () => {
        if (chanting) return;
        setChanting(true);
        setCurrentCount(0);
        setCurrentCharIndex(-1);
        setFinished(false);

        let totalCount = 0;
        let charIndex = 0;

        const interval = setInterval(() => {
            setCurrentCharIndex(charIndex);
            audio.currentTime = 0; // 從頭播放音效
            audio.play().catch((err) => console.error("音效播放錯誤:", err));
            if (charIndex === chant.length - 1) {
                charIndex = 0;
                totalCount++;
                setCurrentCount(totalCount);
            } else {
                charIndex++;
            }

            if (totalCount >= targetCount) {
                clearInterval(interval);
                setChanting(false);
                setFinished(true);
            }
        }, speed);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4 m-auto">
            {!finished ? (
                <div className="bg-white p-6 rounded-lg shadow-lg will-change-auto text-center m-auto max-w-full">
                    <h1 className="text-xl font-bold mb-4">念佛計數應用</h1>
                    <input
                        type="text"
                        value={chant}
                        onChange={(e) => setChant(e.target.value)}
                        className="border p-2 w-full rounded mb-2"
                    />
                    <input
                        type="number"
                        value={targetCount}
                        onChange={(e) => setTargetCount(parseInt(e.target.value))}
                        className="border p-2 w-full rounded mb-4"
                    />
                    {/* 速度選擇 */}
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="border p-2 w-full rounded mb-4"
                    >
                        <option value={300}>快 (300ms)</option>
                        <option value={500}>中 (500ms)</option>
                        <option value={700}>慢 (700ms)</option>
                    </select>
                    {/* 開始按鈕 */}
                    <button
                        onClick={startChanting}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={chanting}
                    >
                        {chanting ? "念誦中..." : "開始念誦"}
                    </button>
                    <div className="mt-4 text-lg">
                        遍數：{currentCount} / {targetCount}
                    </div>
                    <h1 className="text-2xl font-bold flex justify-center mt-4">
                        {chant.split("").map((char, index) => (
                            <span
                                // style={ index === currentCharIndex ? { backgroundColor: "yellow" } : {} }
                                key={index}
                                className={`border px-2 py-1 mx-1 ${
                                    index === currentCharIndex
                                        ? "bg-yellow-300 text-black"
                                        : "bg-black text-white"
                                }`}
                            >
                {char}
              </span>
                        ))}
                    </h1>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                    <h1 className="text-xl font-bold mb-4">功德回向</h1>
                    <p className="text-lg">願此功德，回向眾生，離苦得樂！</p>
                    <button
                        onClick={() => {
                            setFinished(false);
                            setCurrentCount(0);
                            setCurrentCharIndex(-1);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                    >
                        重新開始
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
