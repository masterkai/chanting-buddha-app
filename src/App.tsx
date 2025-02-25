import { useState } from "react";

function App() {
    const [chant, setChant] = useState("南無阿彌陀佛"); // 佛號
    const [targetCount, setTargetCount] = useState(10); // 設定遍數
    const [currentCount, setCurrentCount] = useState(0); // 當前遍數
    const [currentCharIndex, setCurrentCharIndex] = useState(-1); // 目前高亮的字索引
    const [chanting, setChanting] = useState(false); // 是否正在念誦
    const [finished, setFinished] = useState(false); // 是否完成念誦

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
        }, 500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {!finished ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
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
                    <button
                        onClick={startChanting}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
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
                                style={ index === currentCharIndex ? { backgroundColor: "yellow" } : {} }
                                key={index}
                                className={`border px-2 py-1 mx-1`}
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
