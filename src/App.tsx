import { useState, useRef } from "react";
import * as React from "react";

const App: React.FC = () => {
    // 狀態管理
    const [chant, setChant] = useState<string>("南無阿彌陀佛"); // 佛號
    const [targetCount, setTargetCount] = useState<number>(10); // 設定遍數
    const [currentCount, setCurrentCount] = useState<number>(0); // 當前遍數
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(-1); // 當前高亮字索引
    const [chanting, setChanting] = useState<boolean>(false); // 是否正在念誦
    const [finished, setFinished] = useState<boolean>(false); // 是否完成念誦
    const [speed, setSpeed] = useState<number>(500); // 預設速度 500ms
    const audio = new Audio("/chant.mp3"); // 載入音效
    const audioSpeedMap = new Map<number, number>([
        [300, 3],
        [500, 2],
        [700, 1],
    ]);

    // 用 useRef 來儲存計時器
    const chantInterval = useRef<NodeJS.Timeout | null>(null);

    // 開始念誦
    const startChanting = () => {
        if (chanting) return;
        setChanting(true);
        setCurrentCount(0);
        setCurrentCharIndex(-1);
        setFinished(false);

        let totalCount = 0;
        let charIndex = 0;

        chantInterval.current = setInterval(() => {
            setCurrentCharIndex(charIndex);
            audio.currentTime = 0;
            audio.playbackRate = audioSpeedMap.get(speed) as number;
            audio.play().catch((err) => console.error("音效播放錯誤:", err));

            if (charIndex === chant.length - 1) {
                charIndex = 0;
                totalCount++;
                setCurrentCount(totalCount);
            } else {
                charIndex++;
            }

            if (totalCount >= targetCount) {
                stopChanting();
                setFinished(true);
            }
        }, speed);
    };

    // 停止念誦
    const stopChanting = () => {
        if (chantInterval.current) {
            clearInterval(chantInterval.current);
        }
        setChanting(false);
        setCurrentCount(0);
        setCurrentCharIndex(-1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {!finished ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                    <h1 className="text-xl font-bold mb-4">念佛計數應用</h1>

                    {/* 佛號輸入 */}
                    <input
                        type="text"
                        value={chant}
                        onChange={(e) => setChant(e.target.value)}
                        className="border p-2 w-full rounded mb-2"
                        disabled={chanting} // 念誦中不能修改
                    />

                    {/* 遍數輸入 */}
                    <input
                        type="number"
                        value={targetCount}
                        onChange={(e) => setTargetCount(parseInt(e.target.value))}
                        className="border p-2 w-full rounded mb-2"
                        disabled={chanting} // 念誦中不能修改
                    />

                    {/* 速度選擇 */}
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value))}
                        className="border p-2 w-full rounded mb-4"
                        disabled={chanting} // 念誦中不能修改
                    >
                        <option value={300}>快 (300ms)</option>
                        <option value={500}>中 (500ms)</option>
                        <option value={700}>慢 (700ms)</option>
                    </select>

                    {/* 按鈕區域 */}
                    {!chanting ? (
                        <button
                            onClick={startChanting}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            開始念誦
                        </button>
                    ) : (
                        <button
                            onClick={stopChanting}
                            className="bg-red-500 text-white px-4 py-2 rounded w-full"
                        >
                            停止念誦
                        </button>
                    )}

                    {/* 遍數顯示 */}
                    <div className="mt-4 text-lg">
                        遍數：{currentCount} / {targetCount}
                    </div>

                    {/* 佛號顯示 */}
                    <div className="text-2xl font-bold flex justify-center mt-4">
                        {chant.split("").map((char, index) => (
                            <span
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
                    </div>
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
};

export default App;
